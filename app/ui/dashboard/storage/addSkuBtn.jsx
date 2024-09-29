"use client";

import { plusIcon } from "@/app/icons";
import { useState } from "react";

import classes from "./addSkuBtn.module.css";

export default function AddSkuBtn() {
	const [isClicked, setIsClicked] = useState(false);

	function clickHandler() {
		setIsClicked((prevState) => !prevState);
	}

	return (
		<>
			{isClicked && (
				<form className={classes.addSkuForm}>
					<input
						className={classes.skuInput}
						type="text"
						placeholder="Wpisz sku"
					></input>
					<div className={classes.skuFormBtns}>
						<button className={`${classes.skuFormBtn} ${classes.okBtn}`}>
							ok
						</button>
						<button className={`${classes.skuFormBtn} ${classes.xBtn}`} onClick={clickHandler}>
							x
						</button>
					</div>
				</form>
			)}
			<button onClick={clickHandler}>{plusIcon}</button>
		</>
	);
}
