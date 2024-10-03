"use client";

import { binIcon, editIcon } from "@/app/icons";
import classes from "./skuListItem.module.css";
import { deleteSkuByValue } from "@/lib/actions"; // Import the delete action

export default function SkuListItem({ sku, setDeleteButtonClicked }) {
	async function handleDelete() {
		if (confirm(`Are you sure you want to delete SKU: ${sku}?`)) {
			try {
				// Call the server-side delete function
				await deleteSkuByValue(sku);
				console.log(`Deleted SKU: ${sku}`);
			} catch (error) {
				console.error("Failed to delete SKU:", error.message);
			}
		}

		setDeleteButtonClicked(true);
	}

	return (
		<li className={classes.skuListItem}>
			<p className={classes.paragraph}>{sku}</p>
			<div className={classes.actionButtonContainer}>
				<button className={`${classes.actionButton} ${classes.editBtn}`}>
					<i>{editIcon}</i>
				</button>
				<button
					className={`${classes.actionButton} ${classes.deleteBtn}`}
					onClick={handleDelete} // Call handleDelete when the delete button is clicked
				>
					<i>{binIcon}</i>
				</button>
			</div>
		</li>
	);
}
