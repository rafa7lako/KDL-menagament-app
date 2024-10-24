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
	const [errorMessage, setErrorMessage] = useState("");

	// Function to handle form submission for adding a new item
	async function handleSubmit(event) {
		event.preventDefault();

		let result;

		try {
			// call the server function to create the SKU item
			result = await createSkuItem({ sku: skuValue }, localisation);

			// check if the operation was successful
			// if (!result.success) {
			// 	setErrorMessage(result.message);
			// 	return;
			// }

			setErrorMessage(""); // clear previous error message

			// Reset SKU input field
			setSkuValue("");

			onClose();
			if (refreshData) {
				refreshData();
			}
		} catch (error) {
			console.error("Unexpected error occurred:", error);
			setErrorMessage("An unexpected error occurred. Please try again."); // Set a generic error message
		}
	}

	// Function to handle form submission for editing an item
	async function handleEditSubmit(event) {
		event.preventDefault();

		try {
			// Call the server function to update the SKU in the database
			const result = await editSkuItem(
				{ sku: skuValue },
				currentEditSku,
				localisation
			);

			// Check if the operation was successful
			if (!result.success) {
				// Set the error message state
				setErrorMessage(result.message);
				return; // Exit the function early to prevent further actions
			}

			// If successful, reset the error message and proceed
			setErrorMessage(""); // Clear any previous error message
			// Refresh the data and reset the form
			if (refreshData) {
				refreshData();
			}
			setSkuValue(""); // Reset the SKU input field
			onClose(); // Close the form after successful submission
		} catch (error) {
			console.error("Unexpected error occurred:", error);
			setErrorMessage("An unexpected error occurred. Please try again."); // Set a generic error message
		}
	}

	// when close form
	function onClose() {
		console.log("onclose triggered");

		if (closeFormHandler) {
			closeFormHandler();
		}

		if (onEditClick) {
			// I got a bug here telling me the function doesn't exist. That's why i wrote it like this.
			onEditClick();
		}
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
			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
		</form>
	);
}
