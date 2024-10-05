"use client";

import { plusIcon } from "@/app/icons";
import { useState } from "react";
import classes from "./addSkuBtn.module.css";
import { createSkuItem } from "@/lib/actions";
import AddSkuForm from "./addSkuForm/addSkuForm";

export default function AddSkuBtn({ localisation, refreshData }) {
	// Accept refreshData as a prop
	const [isClicked, setIsClicked] = useState(false);

	function clickHandler() {
		setIsClicked((prevState) => !prevState);
	}

	return (
		<>
			{isClicked && (
				<AddSkuForm
					localisation={localisation}
					isCloseBtnClicked={clickHandler}
					refreshData={refreshData}
				/>
			)}
			<button onClick={clickHandler}>{plusIcon}</button>
		</>
	);
}
