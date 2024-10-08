"use client";

import { useState } from "react";
import RegalRowBtns from "../regalRowBtns/regalRowBtns";
import LocalisationList from "../localisationList/localisationList";
import SearchForm from "../searchForm/searchForm";

export default function LocalisationOverview({ mergedKeyboardData }) {
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
        <div className='flex'>
            <SearchForm />
			<RegalRowBtns handleRegalRowClick={handleRegalRowClick} />
        </div>
            
			<LocalisationList filteredData={filteredData} />
		</>
	);
}
