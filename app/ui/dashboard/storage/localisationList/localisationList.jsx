"use client";

import { useState } from "react";

import classes from "./localisationList.module.css";
import LocalisationListItem from "../localisationListItem/localisationListItem";


export default function LocalisationList({ filteredData }) {

	return (
		<>
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
