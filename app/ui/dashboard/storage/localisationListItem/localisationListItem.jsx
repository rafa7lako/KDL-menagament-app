"use client";

import { useEffect, useState } from "react";
import classes from "./localisationListItem.module.css";
import SkuListItem from "../skuListItem/skuListItem";
import AddSkuBtn from "../addSkuBtn/addSkuBtn";

// Import the server-side action
import { fetchSkusByLocalisation } from "@/lib/actions"; // Update with actual path

export default function LocalisationListItem({ localisation, searchedSku }) {
	const [skus, setSkus] = useState([]); // State for the SKUs
	const [addSkuFormSubmitted, setAddSkuFormSubmitted] = useState(false);
	const [deleteBtnClicked, setDeleteButtonClicked] = useState(false);
	const [filteredSkus, setFilteredSkus] = useState([]); // State for filtered SKUs

	// Function to refresh data after form submission
	function refreshData() {
		setAddSkuFormSubmitted((prevState) => !prevState);
	}

	// Function to load SKUs for the current localisation
	async function loadSkus() {
		try {
			const fetchedSkus = await fetchSkusByLocalisation(localisation.localisation);
			setSkus(fetchedSkus);
		} catch (error) {
			console.error("Failed to load SKUs:", error);
		}
	}

	// Effect to load SKUs when the localisation or form submission changes
	useEffect(() => {
		loadSkus();
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
				{/* Show filtered SKUs */}
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
			</ul>
			<AddSkuBtn localisation={localisation.localisation} refreshData={refreshData} />
		</li>
	);
}
