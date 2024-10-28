"use client";

import { plusIcon } from "@/app/icons";
import { useState } from "react";
import AddSkuForm from "../addSkuForm/addSkuForm";

import classes from "./addSkuBtn.module.css";

export default function AddSkuBtn({ localisation, refreshData }) {
	const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

	// function clickHandler() {
	// 	setIsAddBtnClicked(true);
	// }

	function closeFormHandler() {
		setIsAddBtnClicked((prevState) => !prevState);
	}

	return (
		<li>
			{isAddBtnClicked ? (
				<AddSkuForm
					localisation={localisation}
					refreshData={refreshData}
					isAddBtnClicked={isAddBtnClicked}
					closeFormHandler={closeFormHandler}
				/>
			) : (
				<button
					className={classes.addBtn}
					onClick={closeFormHandler}
					aria-label="Add SKU"
				>
					{plusIcon}
					<p className={classes.addSkuParagraph}>Dodaj SKU</p>
				</button>
			)}
		</li>
	);
}
