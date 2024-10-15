"use client";

import { plusIcon } from "@/app/icons";
import { useState } from "react";
import AddSkuForm from "../addSkuForm/addSkuForm";

import classes from "./addSkuBtn.module.css";

export default function AddSkuBtn({ localisation, refreshData }) {
	// Accept refreshData as a prop
	const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

	function clickHandler() {
		setIsAddBtnClicked(true);
	}

	function closeFormHandler() {
		setIsAddBtnClicked((prevState) => !prevState);
	}

	return (
		<>
			{isAddBtnClicked && (
				<AddSkuForm
					localisation={localisation}
					refreshData={refreshData}
					isAddBtnClicked={isAddBtnClicked}
					closeFormHandler={closeFormHandler}
				/>
			)}
			<button className={classes.addBtn} onClick={clickHandler} aria-label="Add SKU">
				{plusIcon}<p className={classes.addSkuParagraph}>Dodaj SKU</p>
			</button>
		</>
	);
}
