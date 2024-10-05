"use server";

import { addSku } from "./keyboards";

// Import SQLite and connect to the database
const sql = require("better-sqlite3");
const db = sql("storage.db");

export async function createSkuItem({sku}, localisation) {
	const item = {
		localisation: localisation,
		sku: sku,
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

export async function deleteSkuByValue(sku) {
  
	try {
		console.log(`Attempting to delete SKU and its associations: ${sku}`);  // Log the SKU
	
		// Start a transaction to ensure atomic deletion
		db.transaction(() => {
		  // Delete the SKU from the 'storage_skus' table (the relationship)
		  const deleteFromStorageSkus = db.prepare(`
			DELETE FROM storage_skus WHERE sku_id = (SELECT id FROM skus WHERE sku = ?)
		  `);
		  deleteFromStorageSkus.run(sku);
	
		  // Now delete the SKU from the 'skus' table
		  const deleteFromSkus = db.prepare(`
			DELETE FROM skus WHERE sku = ?
		  `);
		  const result = deleteFromSkus.run(sku);
	
		  // Check if any rows were affected (i.e., SKU was deleted)
		  if (result.changes === 0) {
			console.error(`No SKU found with value: ${sku}`);
			throw new Error(`No SKU found with value: ${sku}`);
		  }
		})();  // Run the transaction
	
		console.log(`SKU and its associations deleted successfully: ${sku}`);
		return { success: true };
	  } catch (error) {
		console.error('Failed to delete SKU and its associations:', error);  // Log the full error
		throw new Error('Could not delete SKU');
	  }
  }

  export async function editSkuItem(newSkuValue, oldSkuValue, localisation) {
	try {
		console.log(`Attempting to update SKU from ${oldSkuValue} to ${newSkuValue} for localisation: ${localisation}`);

		// Prepare the SQL statement to update the SKU value
		const updateSku = db.prepare(`
			UPDATE skus
			SET sku = ?
			WHERE id = (
				SELECT sku_id FROM storage_skus 
				JOIN storage_locations ON storage_skus.storage_id = storage_locations.id
				WHERE skus.sku = ? AND storage_locations.localisation = ?
			)
		`);

		// Execute the update query
		const result = updateSku.run(newSkuValue, oldSkuValue, localisation);

		// Check if any rows were affected (i.e., SKU was updated)
		if (result.changes === 0) {
			console.error(`No SKU found with value: ${oldSkuValue} for localisation: ${localisation}`);
			throw new Error(`No SKU found with value: ${oldSkuValue} for localisation: ${localisation}`);
		}

		console.log(`SKU updated successfully from ${oldSkuValue} to ${newSkuValue}`);
		return { success: true };
	} catch (error) {
		console.error('Failed to update SKU:', error);
		throw new Error('Could not update SKU');
	}
}