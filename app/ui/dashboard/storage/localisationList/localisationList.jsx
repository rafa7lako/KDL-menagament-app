


import classes from "./localisationList.module.css";
import LocalisationListItem from "../localisationListItem/localisationListItem";


export default function LocalisationList({ filteredData, searchedSku }) {

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
