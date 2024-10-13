"use client";

import { useContext } from "react";
import RegalRowBtns from "../regalRowBtns/regalRowBtns";
import LocalisationList from "../localisationList/localisationList";
import SearchForm from "../searchForm/searchForm";

import { StorageContext } from "@/app/store/context";

export default function LocalisationOverview({ mergedKeyboardData }) {
	const storageCtx = useContext(StorageContext);

	let filteredData =
		storageCtx.selectedRegalRow === "Razem"
			? mergedKeyboardData // Show all if "Razem" is selected
			: mergedKeyboardData.filter(
					(localisation) =>
						localisation.localisation.startsWith(storageCtx.selectedRegalRow) // Filter by starting letter
			  );

	if (storageCtx.searchedSku) {
		filteredData = filteredData
			.map((localisation) => {
				// Filter SKUs inside each localisation based on the search term
				const matchingSkus = localisation.skus.filter((sku) =>
					sku.toLowerCase().includes(storageCtx.searchedSku.toLowerCase())
				);

				// Return a new object with the same localisation but only the matching SKUs
				return { ...localisation, skus: matchingSkus };
			})
			.filter((localisation) => localisation.skus.length > 0); // Only keep localisations that have matching SKUs
	}


	return (
		<>
			<div className="flex">
				<SearchForm />
				<RegalRowBtns />
			</div>

			<LocalisationList filteredData={filteredData} />
		</>
	);
}
