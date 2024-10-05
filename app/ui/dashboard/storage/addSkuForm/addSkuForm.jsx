"use client";

import { useState } from "react";
import { createSkuItem, editSkuItem } from "@/lib/actions";
import classes from "./addSkuForm.module.css";

export default function AddSkuForm({
	localisation,
	placeholderText = "Wpisz sku",
	refreshData,

	currentEditSku,
	editBtnClicked,
	setEditBtnClicked,
}) {
	const [skuValue, setSkuValue] = useState(""); // State to hold the SKU input value
	const [isClicked, setIsClicked] = useState(false);

	// Function to handle form submission
	async function handleSubmit(event) {
		event.preventDefault(); // Prevent the default form submission

		// Create a FormData object from the form
		const formData = new FormData(event.target);

		// Call the server function to create the SKU item
		await createSkuItem(formData, localisation); // Ensure you import createSkuItem correctly

		// After form submission, refresh the parent component data
		refreshData(); // Trigger parent component to re-render with updated data

		// Reset the SKU input field
		setSkuValue("");

		// Close the form after successful submission
		onCloseForm();
	}

	async function handleEditSubmit(event) {
		event.preventDefault(); // Prevent the default form submission

		// Create a FormData object from the form
		const formData = new FormData(event.target);

		// Assuming the form contains a field for the new SKU value
		const newSkuValue = formData.get("skuInput");

		// Call the server function to update the SKU in the database
		await editSkuItem(newSkuValue, currentEditSku, localisation); // Assuming `editSkuItem` updates the SKU in the database

		// After form submission, refresh the parent component data
		refreshData(); // Trigger parent component to re-render with updated data

		// Reset the SKU input field
		setSkuValue("");

		// Close the form after successful submission
		onCloseForm();
	}

	// Function to handle closing the form when "x" is clicked
	function clickHandler() {
		setIsClicked(true); // Close the form when cancel is clicked
	}

	function onCloseForm() {
		setEditBtnClicked(false);
	}

	return (
		<>
			{isClicked && (
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
							onClick={clickHandler} // Handle cancel (close form)
						>
							x
						</button>
					</div>
				</form>
			)}
		</>
	);
}
