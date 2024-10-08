"use client";

import { useState } from "react";

import classes from "./localisationList.module.css";
import LocalisationListItem from "../localisationListItem/localisationListItem";
import RegalRowBtns from "../regalRowBtns/regalRowBtns";

export default function LocalisationList({ mergedKeyboardData }) {
	const [selectedRegalRow, setSelectedRegalRow] = useState("Razem");

	const handleRegalRowClick = (regalRow) => {
		setSelectedRegalRow(regalRow); // Update the selected regal
	};

	const filteredData =
		selectedRegalRow === "Razem"
			? mergedKeyboardData // Show all if "Razem" is selected
			: mergedKeyboardData.filter(
					(localisation) =>
						localisation.localisation.startsWith(selectedRegalRow) // Filter by starting letter
			  );

	return (
		<>
			<RegalRowBtns handleRegalRowClick={handleRegalRowClick} />

			<div className={classes.localisationListContainer}>
				<ul className={classes.localisationList}>
					{filteredData.map((localisation) => (
						<LocalisationListItem
							localisation={localisation}
							key={localisation.localisation}
						/>
					))}
				</ul>
			</div>
		</>
	);
}
