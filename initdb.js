const sql = require('better-sqlite3');
const db = sql('storage.db');

const dummyStorageData = [
    {localisation: 'A1', sku: ['li233-gr', 'li233-us', 'li130-nor']},
    {localisation: 'A2', sku: ['li230-us', 'li133-fr']},
    {localisation: 'A3', sku: ['li465-us-kp']},
    {localisation: 'A4', sku: ['li284-mix', 'li378-mix']},
    {localisation: 'A5', sku: ['li233-gr-kl.4-pc', 'li354-us-kl.5-pc', 'hp293-us-kl.3-pr']},
];

// Create tables
db.prepare(`
    CREATE TABLE IF NOT EXISTS storage_locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        localisation TEXT NOT NULL UNIQUE
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS skus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT NOT NULL UNIQUE
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS storage_skus (
        storage_id INTEGER NOT NULL,
        sku_id INTEGER NOT NULL,
        FOREIGN KEY (storage_id) REFERENCES storage_locations(id),
        FOREIGN KEY (sku_id) REFERENCES skus(id),
        PRIMARY KEY (storage_id, sku_id)
    )
`).run();

async function initData() {
    // Prepare statements for insertion
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

    for (const storage of dummyStorageData) {
        // Insert storage location
        storageStmt.run({
            localisation: storage.localisation
        });

        // Get the storage ID
        const storageRow = db.prepare(`
            SELECT id FROM storage_locations WHERE localisation = ?
        `).get(storage.localisation);

        for (const sku of storage.sku) {
            // Insert SKU
            skuStmt.run({ sku });

            // Get the SKU ID
            const skuRow = db.prepare(`
                SELECT id FROM skus WHERE sku = ?
            `).get(sku);

            // Insert into relationship table
            storageSkuStmt.run({
                storage_id: storageRow.id,
                sku_id: skuRow.id
            });
        }
    }
}

initData();
