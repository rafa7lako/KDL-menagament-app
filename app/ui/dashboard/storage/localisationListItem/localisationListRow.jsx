"use client";

import { useEffect, useState} from "react";
import SkuListItem from "../skuListItem/skuListItem";
import AddSkuBtn from "../addSkuBtn/addSkuBtn";

import classes from "./localisationListRow.module.css";
// Import the server-side action
import { fetchSkusByLocalisation } from "@/lib/actions";

export default function LocalisationListRow({ localisation, searchedSku }) {
	
	const [skus, setSkus] = useState([]); // State for the SKUs
	const [addSkuFormSubmitted, setAddSkuFormSubmitted] = useState(false);
	const [deleteBtnClicked, setDeleteButtonClicked] = useState(false);
	const [filteredSkus, setFilteredSkus] = useState([]); // State for filtered SKUs

	// Function to trigger a rerender after form submission, so that our new added or edited item shows up without having to manualy refresh the site
	function refreshData() {
		setAddSkuFormSubmitted((prevState) => !prevState);
	}

	// Function to load SKUs for the current localisation and updating the "skus" state. I used a try catch block because of the asynchronous nature of the data fetch, especially if we later move to a different database.
	async function loadSkus() {
		try {
			// We fetch the needed data through the fetchSkuByLocalisation function from action.js
			const fetchedSkus = await fetchSkusByLocalisation(localisation.localisation);

			// We insert the fetched data into the skus state
			setSkus(fetchedSkus);
		} catch (error) {
			console.error("Failed to load SKUs:", error);
		}
	}

	// Effect to load SKUs when the localisation or form submission changes
	useEffect(() => {
		// Fetch skus data and update the"skus" state.
 		loadSkus();
		// Reseting the state for the button clicked listener.
		setDeleteButtonClicked(false);
	}, [localisation.localisation, addSkuFormSubmitted, deleteBtnClicked]);

	// Effect to filter SKUs based on searchedSku
	useEffect(() => {
		// If searchedSku is empty or null, show all SKUs
		if (!searchedSku) {
			setFilteredSkus(skus);
		} else {
			// Filter SKUs that include the searchedSku string (case-insensitive)
			const filtered = skus.filter((sku) =>
				sku.toLowerCase().includes(searchedSku.toLowerCase())
			);
			setFilteredSkus(filtered);
		}
	}, [searchedSku, skus]);

	return (
		<li className={classes.localisationListItem}>
			<p className={classes.localisationTitle}>{localisation.localisation}</p>
			<ul className={classes.skuList}>
				{filteredSkus.length === 0 ? (
					<p className={classes.noSkus}>No SKUs found</p>
				) : (
					filteredSkus.map((sku) => (
						<SkuListItem
							sku={sku}
							key={sku}
							refreshData={refreshData}
							setDeleteButtonClicked={setDeleteButtonClicked}
							localisation={localisation.localisation}
						/>
					))
				)}
			<AddSkuBtn localisation={localisation.localisation} refreshData={refreshData} />
			</ul>
		</li>
	);
}
