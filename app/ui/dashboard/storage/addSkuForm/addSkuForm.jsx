'use client'

import { createSkuItem } from "@/lib/actions";

import classes from './addSkuForm.module.css'

export default function AddSkuForm({localisation, skuValue, setSkuValue, placeholderText = 'Wpisz sku', isCloseBtnClicked, refreshData, setIsClicked}) {

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission

        // Create a FormData object from the form
        const formData = new FormData(event.target);

        // Call the server function to create the SKU item
        await createSkuItem(formData, localisation); // Ensure you import createSkuItem correctly

        // After form submission, refresh the parent component data
        refreshData(isCloseBtnClicked); // This will trigger the parent component to re-render with updated data

        // Reset the SKU input field and close the form
        setSkuValue("");
        setIsClicked(false);
    }

	return (
		<form className={classes.addSkuForm} onSubmit={handleSubmit}>
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
					onClick={isCloseBtnClicked}
				>
					x
				</button>
			</div>
		</form>
	);
}
