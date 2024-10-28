"use server";

import { addSku } from "./keyboards";

const sql = require("better-sqlite3");
const db = sql("storage.db");

export async function createSkuItem({ sku }, localisation) {
	try {
		// Fetch existing SKUs for the given localisation
		const skusQuery = db.prepare(`
			SELECT skus.sku FROM skus
			JOIN storage_skus ON skus.id = storage_skus.sku_id
			JOIN storage_locations ON storage_skus.storage_id = storage_locations.id
			WHERE storage_locations.localisation = ?
		`);
		
		const result = skusQuery.all(localisation);
		const skus = result.map(row => row.sku);

		console.log("Existing SKUs for localisation", localisation, ":", skus);

		// Check if the new SKU already exists for the given localisation
		if (skus.includes(sku)) {
			console.error(`SKU ${sku} already exists for localisation ${localisation}`);
			return {
				success: false,
				message: `SKU ${sku} already exists for localisation ${localisation}. Please choose a different SKU.`,
			};
		}

		// Define the new item
		const item = {
			localisation: localisation,
			sku: sku,
		};

		// Add the new SKU to the database (assuming addSku is async)
		addSku(item);
		
		// Return success response
		return {
			success: true,
			message: `SKU ${sku} has been successfully added to localisation ${localisation}.`,
		};
	} catch (error) {
		console.error("Failed to fetch SKUs:", error);
		return {
			success: false,
			message: "An error occurred while trying to add the SKU.",
		};
	}
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
		const skus = result.map((row) => row.sku);
		return skus;
	} catch (error) {
		console.error("Failed to fetch SKUs:", error);
		throw new Error("Could not fetch SKUs");
	}
}

export async function deleteSkuByValue(sku) {
	try {
		console.log(`Attempting to delete SKU and its associations: ${sku}`); // Log the SKU

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
		})(); // Run the transaction

		console.log(`SKU and its associations deleted successfully: ${sku}`);
		return { success: true };
	} catch (error) {
		console.error("Failed to delete SKU and its associations:", error); // Log the full error
		throw new Error("Could not delete SKU");
	}
}

export async function editSkuItem({ sku }, oldSkuValue, localisation) {
	try {
		console.log(
			`Attempting to update SKU from ${oldSkuValue} to ${sku} for localisation: ${localisation}`
		);

		// Check if the new SKU already exists
		const checkSkuExists = db.prepare(`
			SELECT COUNT(*) as count 
			FROM skus 
			WHERE sku = ?
		 `);
		const skuExistsResult = checkSkuExists.get(sku);

		if (skuExistsResult.count > 0) {
			// The new SKU already exists, so throw an error
			console.error(`SKU ${sku} already exists`);
			return {
				success: false,
				message: `SKU ${sku} already exists. Please choose a different SKU.`,
			};
		}

		// Prepare the SQL statement to update the SKU value
		const updateSku = db.prepare(`
			UPDATE skus
			SET sku = ?
			WHERE id = (
				SELECT skus.id 
				FROM skus
				JOIN storage_skus ON skus.id = storage_skus.sku_id
				JOIN storage_locations ON storage_skus.storage_id = storage_locations.id
				WHERE skus.sku = ? AND storage_locations.localisation = ?
			)
		`);

		// Execute the update query
		const result = updateSku.run(sku, oldSkuValue, localisation);

		// Check if any rows were affected (i.e., SKU was updated)
		if (result.changes === 0) {
			console.error(
				`No SKU found with value: ${oldSkuValue} for localisation: ${localisation}`
			);
			throw new Error(
				`No SKU found with value: ${oldSkuValue} for localisation: ${localisation}`
			);
		}

		console.log(`SKU updated successfully from ${oldSkuValue} to ${sku}`);
		return { success: true };
	} catch (error) {
		console.error("Failed to update SKU:", error);
		throw new Error(`Could not update SKU: ${error.message}`);
	}
}
