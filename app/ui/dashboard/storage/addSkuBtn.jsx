"use client";

import { plusIcon } from "@/app/icons";
import { useState } from "react";
import classes from "./addSkuBtn.module.css";
import { createSkuItem } from "@/lib/actions";
import AddSkuForm from "./addSkuForm/addSkuForm";

export default function AddSkuBtn({ localisation, refreshData }) {
	// Accept refreshData as a prop
	const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

	function clickHandler() {
		setIsAddBtnClicked(true);
	}

	function closeFormHandler(isClicked) {
		setIsAddBtnClicked(isClicked)
	}

	return (
		<>
			{isAddBtnClicked && (
				<AddSkuForm
					localisation={localisation}
					// isCloseBtnClicked={clickHandler}
					refreshData={refreshData}
					isAddBtnClicked={isAddBtnClicked}
					closeFormHandler={closeFormHandler}
				/>
			)}
			<button onClick={clickHandler} aria-label="Add SKU">
				{plusIcon}
			</button>
		</>
	);
}
