"use server";

import { addSku } from "./keyboards";

// Import SQLite and connect to the database
const sql = require("better-sqlite3");
const db = sql("storage.db");

export async function createSkuItem(formData, localisation) {
	const item = {
		localisation: localisation,
		sku: formData.get("skuInput"),
	};

    addSku(item)
}


export async function fetchSkusByLocalisation(localisation) {
  try {
    // Fetch SKUs for the given localisation from the database
    const skusQuery = db.prepare(`
      SELECT skus.sku FROM skus
      JOIN storage_skus ON skus.id = storage_skus.sku_id
      JOIN storage_locations ON storage_skus.storage_id = storage_locations.id
      WHERE storage_locations.localisation = ?
    `);
    
    // Execute the query and return the results
    const result = skusQuery.all(localisation);
    const skus = result.map(row => row.sku);
    return skus;
  } catch (error) {
    console.error('Failed to fetch SKUs:', error);
    throw new Error('Could not fetch SKUs');
  }
}
