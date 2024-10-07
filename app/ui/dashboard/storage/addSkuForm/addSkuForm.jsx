"use client";

import { useState } from "react";
import { createSkuItem, editSkuItem } from "@/lib/actions";
import classes from "./addSkuForm.module.css";

export default function AddSkuForm({
	localisation,
	placeholderText = "Wpisz sku",
	refreshData,
	closeFormHandler,
	currentEditSku,
	editBtnClicked,
	onEditClick,
}) {
	const [skuValue, setSkuValue] = useState(
		editBtnClicked ? currentEditSku : ""
	);

	// Function to handle form submission for adding a new item
	async function handleSubmit(event) {
		event.preventDefault();

		// Call the server function to create the SKU item
		await createSkuItem({ sku: skuValue }, localisation);

		// After form submission, refresh the parent component data
		if (refreshData) {
			refreshData(); // Trigger parent component to re-render with updated data
		}

		// Reset the SKU input field
		setSkuValue("");

		// Close the form after successful submission
		onClose();
	}

	async function handleEditSubmit(event) {
		event.preventDefault();

		// Call the server function to update the SKU in the database
		await editSkuItem({ sku: skuValue }, currentEditSku, localisation);

		// After form submission, refresh the parent component data
		if (refreshData) {
			refreshData(); // Trigger parent component to re-render with updated data
		}

		// Reset the SKU input field
		setSkuValue("");

		// Close the form after successful submission
		onClose();
		// onEditClick(false); // Reset edit state only after editing
	}

	// Function to handle closing the form when "x" is clicked
	function onClose() {
		// setIsClicked(true);
		if (closeFormHandler) {
			closeFormHandler();
		}

		if (onEditClick) {
			// I got a bug here telling me the function doesn't exist. That's why i wrote it like this.
			onEditClick();
		}
		// Close the form when cancel is clicked
	}

	return (
		<form
			className={classes.addSkuForm}
			onSubmit={!editBtnClicked ? handleSubmit : handleEditSubmit}
		>
			<input
				className={classes.skuInput}
				type="text"
				placeholder={placeholderText}
				id="skuInput"
				name="skuInput"
				value={skuValue} // Controlled input
				onChange={(e) => setSkuValue(e.target.value)} // Update state on input change
				required
			/>
			<div className={classes.skuFormBtns}>
				<button
					type="submit"
					className={`${classes.skuFormBtn} ${classes.okBtn}`}
				>
					ok
				</button>
				<button
					type="button"
					className={`${classes.skuFormBtn} ${classes.xBtn}`}
					onClick={onClose} // Handle cancel (close form)
				>
					x
				</button>
			</div>
		</form>
	);
}
