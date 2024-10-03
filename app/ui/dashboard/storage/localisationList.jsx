

import classes from "./localisationList.module.css";
import LocalisationListItem from "./localisationListItem";

export default function LocalisationList({ mergedKeyboardData }) {
	return (
		<div className={classes.localisationListContainer}>
			<ul className={classes.localisationList}>
				{mergedKeyboardData.map((localisation) => (
					<LocalisationListItem localisation={localisation} key={localisation.localisation} />
				))}
			</ul>
		</div>
	);
}
