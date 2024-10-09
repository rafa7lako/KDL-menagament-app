const sql = require("better-sqlite3");
const db = sql("storage.db");

// New data to add to the database
const newStorageData = [
    { localisation: "B1", sku: ["li284-us", "tax01-gr"] },
    { localisation: "C1", sku: ["li284-us", "tax01-gr"] },
    { localisation: "D1", sku: ["li284-us", "tax01-gr"] },
    { localisation: "E1", sku: ["li284-us", "tax01-gr"] },
];

async function addNewData() {
    // Prepare insert statements for storage_locations, skus, and storage_skus
    const storageStmt = db.prepare(`
        INSERT INTO storage_locations (localisation) VALUES (@localisation)
        ON CONFLICT(localisation) DO NOTHING
    `);

    const skuStmt = db.prepare(`
        INSERT INTO skus (sku) VALUES (@sku)
        ON CONFLICT(sku) DO NOTHING
    `);

    const storageSkuStmt = db.prepare(`
        INSERT INTO storage_skus (storage_id, sku_id) VALUES (@storage_id, @sku_id)
    `);

    for (const storage of newStorageData) {
        // Insert the new storage location
        storageStmt.run({ localisation: storage.localisation });

        // Get the storage ID of the inserted or existing localization
        const storageRow = db
            .prepare(`SELECT id FROM storage_locations WHERE localisation = ?`)
            .get(storage.localisation);

        for (const sku of storage.sku) {
            // Insert the SKU into the skus table
            skuStmt.run({ sku });

            // Get the SKU ID of the inserted or existing SKU
            const skuRow = db
                .prepare(`SELECT id FROM skus WHERE sku = ?`)
                .get(sku);

            // Insert the relation between the storage location and the SKU
            storageSkuStmt.run({
                storage_id: storageRow.id,
                sku_id: skuRow.id,
            });
        }
    }

    console.log("New data successfully added to the database.");
}

addNewData();
