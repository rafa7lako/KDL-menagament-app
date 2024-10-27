"use client";

import { binIcon, editIcon } from "@/app/icons";
import classes from "./skuListItem.module.css";
import { deleteSkuByValue } from "@/lib/actions"; 
import { useState } from "react";
import AddSkuForm from "../addSkuForm/addSkuForm";

export default function SkuListItem({
	sku,
	setDeleteButtonClicked,
	localisation,
	refreshData,
}) {
	const [editBtnClicked, setEditBtnClicked] = useState(false);

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

	function editBtnHandler() {
		setEditBtnClicked((prevState) => !prevState);
	}

	function editBtnClickedHandler() {
		setEditBtnClicked((prevState) => !prevState);
	}

	return (
		<>
			{!editBtnClicked ? (
				<li className={classes.skuListItem}>
					<p className={classes.paragraph}>{sku}</p>
					<div className={classes.actionButtonContainer}>
						<button
							className={`${classes.actionButton} ${classes.editBtn}`}
							onClick={editBtnHandler}
						>
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
			) : (
				<AddSkuForm
					localisation={localisation}
					placeholderText={sku}
					onEditClick={editBtnClickedHandler}
					currentEditSku={sku}
					editBtnClicked={editBtnClicked}
					refreshData={refreshData}
				/>
			)}
		</>
	);
}
