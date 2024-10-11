"use client";

import { useContext } from "react";

import { StorageContext } from "@/app/store/context";

import classes from "./regalRowBtn.module.css";

export default function RegalRowBtn({ text }) {
	const { handleRegalRowClick } = useContext(StorageContext);

	return (
		<button className={classes.btn} onClick={() => handleRegalRowClick(text)}>
			{text}
		</button>
	);
}
