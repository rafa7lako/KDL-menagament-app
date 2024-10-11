import classes from "./localisationList.module.css";
import LocalisationListItem from "../localisationListItem/localisationListItem";
import { useContext } from "react";
import { StorageContext } from "@/app/store/context";


export default function LocalisationList({ filteredData }) {

	const {searchedSku} = useContext(StorageContext)

	return (
		<>
			<div className={classes.localisationListContainer}>
				<ul className={classes.localisationList}>
					{filteredData.map((localisation) => (
						<LocalisationListItem
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
