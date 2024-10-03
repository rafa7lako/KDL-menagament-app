const Database = require('better-sqlite3');
const db = new Database('storage.db');

export default function handler(req, res) {
  const { localisation } = req.query; // Get the localisation from URL params

  if (!localisation) {
    return res.status(400).json({ error: 'Localisation is required' });
  }

  try {
    // Query to get all SKUs associated with a particular localisation
    const skus = db.prepare(`
      SELECT sku.sku 
      FROM skus sku
      JOIN storage_skus ss ON sku.id = ss.sku_id
      JOIN storage_locations sl ON ss.storage_id = sl.id
      WHERE sl.localisation = ?
    `).all(localisation);

    // Check if no SKUs are found
    if (skus.length === 0) {
      return res.status(404).json({ message: 'No SKUs found for this localisation' });
    }

    // Return the SKUs as a JSON response
    res.status(200).json({ localisation, skus: skus.map(sku => sku.sku) });
  } catch (error) {
    console.error('Error fetching SKUs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
