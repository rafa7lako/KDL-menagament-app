"use client";

import { plusIcon } from "@/app/icons";
import { useState } from "react";

import classes from "./addSkuBtn.module.css";
import { createSkuItem } from "@/lib/actions";

export default function AddSkuBtn({ localisation }) {
	const [isClicked, setIsClicked] = useState(false);
	const [skuValue, setSkuValue] = useState(""); // State to hold the SKU input value

	function clickHandler() {
		setIsClicked((prevState) => !prevState);
	}

	async function handleSubmit(event) {
		event.preventDefault(); // Prevent the default form submission

		// Create a FormData object from the form
		const formData = new FormData(event.target);

		// Call the server function to create the SKU item
		await createSkuItem(formData, localisation); // Ensure you import createSkuItem correctly

		// Reset the SKU input field and close the form
		setSkuValue("");
		setIsClicked(false);
	}

	return (
		<>
			{isClicked && (
				<form className={classes.addSkuForm} onSubmit={handleSubmit}>
					<input
						className={classes.skuInput}
						type="text"
						placeholder="Wpisz sku"
						id="skuInput"
						name="skuInput"
						value={skuValue} // Controlled input
						onChange={(e) => setSkuValue(e.target.value)} // Update state on input change
						required
					/>
					<div className={classes.skuFormBtns}>
						<button type="submit" className={`${classes.skuFormBtn} ${classes.okBtn}`}>
							ok
						</button>
						<button type="button" className={`${classes.skuFormBtn} ${classes.xBtn}`} onClick={clickHandler}>
							x
						</button>
					</div>
				</form>
			)}
			<button onClick={clickHandler}>{plusIcon}</button>
		</>
	);
}
