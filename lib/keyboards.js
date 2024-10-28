import sql from "better-sqlite3";

const db = sql("storage.db");

export async function getSkuData() {
	// await new Promise((resolve) => setTimeout(resolve, 2000))
	return new Promise((resolve, reject) => {
		try {
			const data = db.prepare("SELECT * FROM skus").all();
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
}

export async function getSkuLocalisationData() {
	return new Promise((resolve, reject) => {
		try {
			const data = db.prepare("SELECT * FROM storage_locations").all();
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
}

export async function getRelationTableData() {
	return new Promise((resolve, reject) => {
		try {
			const data = db.prepare("SELECT * FROM storage_skus").all();
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
}

// New async function to merge the data
export async function getMergedLocalisationSkuData() {

	// await new Promise((resolve) => setTimeout(resolve, 500))
	// Get data from the database tables asynchronously
	const [localisations, skus, storageSkus] = await Promise.all([
		getSkuLocalisationData(),
		getSkuData(),
		getRelationTableData(),
	]);

	// Merge data to create the desired structure
	const mergedData = localisations.map(localisation => {
		// Filter the relationships for the current localisation
		const relatedSkus = storageSkus
			.filter(rel => rel.storage_id === localisation.id)
			// Map the related SKU IDs to the actual SKU data
			.map(rel => skus.find(sku => sku.id === rel.sku_id)?.sku); // Use optional chaining (?.) to avoid errors if not found

		// Return the localisation with its related SKUs
		return {
			localisation: localisation.localisation,
			skus: relatedSkus,
		};
	});

	return mergedData; // Return the final merged array
}


export function addSku({ localisation, sku }) {
    // 1. Check if SKU exists in `skus` table
    let skuId;
    const existingSku = db.prepare("SELECT id FROM skus WHERE sku = ?").get(sku);
    
    if (existingSku) {
        skuId = existingSku.id;  // Use the existing SKU's ID
    } else {
        // Insert new SKU if it does not exist
        const insertSku = db.prepare("INSERT INTO skus (sku) VALUES (?)");
        const resultSku = insertSku.run(sku);
        skuId = resultSku.lastInsertRowid;  // ID of the newly inserted SKU
    }
    
    // 2. Check if localisation exists, insert if not
    let localisationId;
    const existingLocalisation = db.prepare("SELECT id FROM storage_locations WHERE localisation = ?").get(localisation);
    
    if (existingLocalisation) {
        localisationId = existingLocalisation.id;
    } else {
        const insertLocalisation = db.prepare("INSERT INTO storage_locations (localisation) VALUES (?)");
        const resultLocalisation = insertLocalisation.run(localisation);
        localisationId = resultLocalisation.lastInsertRowid;  // ID of the newly inserted localisation
    }
    
    // 3. Insert relation in `storage_skus` table if not already linked
    const existingRelation = db.prepare("SELECT 1 FROM storage_skus WHERE sku_id = ? AND storage_id = ?").get(skuId, localisationId);
    
    if (!existingRelation) {
        const insertRelation = db.prepare("INSERT INTO storage_skus (sku_id, storage_id) VALUES (?, ?)");
        insertRelation.run(skuId, localisationId);
        console.log(`SKU ${sku} has been linked to localisation ${localisation}.`);
    } else {
        console.log(`SKU ${sku} is already linked to localisation ${localisation}.`);
    }
}
