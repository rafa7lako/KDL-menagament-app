import LocalisationListRow from "../localisationListItem/localisationListRow";
import { useContext } from "react";
import { StorageContext } from "@/app/store/context";

import classes from "./localisationList.module.css";


export default function LocalisationList({ filteredData }) {
	const { searchedSku } = useContext(StorageContext);
	// filteredData is a list of objects. Each object holds a localisation and a list of skus.

	return (
		<>
			<div className={classes.localisationListContainer}>
				<div className={classes.listLabels}>
					<p>Lokalizacja</p>
					<p>Lista dostępnych SKU</p>
				</div>

				<ul className={classes.localisationList}>
					{filteredData.map((localisation) => (
							<LocalisationListRow
								localisation={localisation}
								key={localisation.localisation}
								searchedSku={searchedSku}
							/>
					))}
				</ul>
			</div>
		</>
	);
}
