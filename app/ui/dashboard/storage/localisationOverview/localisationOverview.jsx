"use client";

import { useState } from "react";
import RegalRowBtns from "../regalRowBtns/regalRowBtns";
import LocalisationList from "../localisationList/localisationList";
import SearchForm from "../searchForm/searchForm";

export default function LocalisationOverview({ mergedKeyboardData }) {
	const [selectedRegalRow, setSelectedRegalRow] = useState("Razem");
	const [searchedSku, setSearchedSku] = useState("");

	const handleRegalRowClick = (regalRow) => {
		setSelectedRegalRow(regalRow); // Update the selected regal
	};



	let filteredData =
		selectedRegalRow === "Razem"
			? mergedKeyboardData // Show all if "Razem" is selected
			: mergedKeyboardData.filter(
					(localisation) =>
						localisation.localisation.startsWith(selectedRegalRow) // Filter by starting letter
			  );

	if (searchedSku) {
		filteredData = filteredData
			.map((localisation) => {
				// Filter SKUs inside each localisation based on the search term
				const matchingSkus = localisation.skus.filter((sku) =>
					sku.toLowerCase().includes(searchedSku.toLowerCase())
				);

				// Return a new object with the same localisation but only the matching SKUs
				return { ...localisation, skus: matchingSkus };
			})
			.filter((localisation) => localisation.skus.length > 0); // Only keep localisations that have matching SKUs
	}



	return (
		<>
			<div className="flex">
				<SearchForm setSearchTerm={setSearchedSku} />
				<RegalRowBtns handleRegalRowClick={handleRegalRowClick} />
			</div>

			<LocalisationList filteredData={filteredData} searchedSku={searchedSku} />
		</>
	);
}
