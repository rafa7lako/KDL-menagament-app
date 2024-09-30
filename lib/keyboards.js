import sql from "better-sqlite3";

const db = sql("storage.db");

export function getSkuData() {
	return db.prepare("SELECT * FROM skus").all();
}

export function getSkuLocalisationData() {
	return db.prepare("SELECT * FROM storage_locations").all();
}

export function getRelationTableData() {
	return db.prepare("SELECT * FROM storage_skus").all();
}

// New function to merge the data
export function getMergedLocalisationSkuData() {
	// Get data from the database tables
	const localisations = getSkuLocalisationData();
	const skus = getSkuData();
	const storageSkus = getRelationTableData();
  
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
		skus: relatedSkus
	  };
	});
  
	return mergedData; // Return the final merged array
  }


export function addSku({localisation, sku}){
	// 1. SKU in die `skus`-Tabelle einfügen
    const insertSku = db.prepare("INSERT INTO skus (sku) VALUES (?)");
    const resultSku = insertSku.run(sku);
    
    const skuId = resultSku.lastInsertRowid; // ID der neu eingefügten SKU
    
    // 2. Prüfen, ob die Localisation existiert, ansonsten hinzufügen
    let localisationId;
    const existingLocalisation = db.prepare("SELECT id FROM storage_locations WHERE localisation = ?").get(localisation);
    
    if (existingLocalisation) {
        localisationId = existingLocalisation.id;
    } else {
        const insertLocalisation = db.prepare("INSERT INTO storage_locations (localisation) VALUES (?)");
        const resultLocalisation = insertLocalisation.run(localisation);
        localisationId = resultLocalisation.lastInsertRowid; // ID der neu eingefügten Localisation
    }
    
    // 3. Verknüpfung in die `storage_skus`-Tabelle einfügen
    const insertRelation = db.prepare("INSERT INTO storage_skus (sku_id, storage_id) VALUES (?, ?)");
    insertRelation.run(skuId, localisationId);
    
    console.log(`SKU ${sku} wurde mit der Localisation ${localisation} verknüpft.`);

}