import { getMergedLocalisationSkuData } from "@/lib/keyboards";
import classes from "./page.module.css";
import SkuListItem from "../../ui/dashboard/storage/skuListItem/skuListItem";
import AddSkuBtn from "@/app/ui/dashboard/storage/addSkuBtn/addSkuBtn";
import LocalisationList from "@/app/ui/dashboard/storage/localisationList/localisationList";
import { Suspense } from "react";
import { useState } from "react";

async function Keyboards({selectedRegalRow}) {
	try {
		// Fetch the merged data
		const mergedData = await getMergedLocalisationSkuData();

		const filteredData = selectedRegalRow === "Razem"
            ? mergedData // If "Razem" is selected, show all
            : mergedData.filter(item => item.localisation.includes(selectedRegalRow));

		// Return the LocalisationList with the fetched data
		return <LocalisationList mergedKeyboardData={mergedData} />;
	} catch (error) {
		// Handle error fetching data
		console.error("Failed to fetch merged localisation SKU data:", error);
		return <p className={classes.loading}>Error loading data.</p>;
	}
}

export default function Page() {


	const [selectedRegalRow, setSelectedRegalRow] = useState("Razem");

	const handleRegalRowClick = (regalRow) => {
        setSelectedRegalRow(regalRow); // Update the selected regal
    };

	return (
		<main>
			<h1 className={classes.warehouseTitle}>Magazyn</h1>
			<form className={classes.searchForm}>
				<input
					className={classes.searchInput}
					type="text"
					name="sku-search"
					id="sku-search"
					placeholder="Szukaj"
					required
				></input>
				<button className={classes.searchButton}>Icon</button>
			</form>
			<div>
			<button onClick={() => handleRegalRowClick("Razem")}>Razem</button>
                <button onClick={() => handleRegalRowClick("A")}>A</button>
                <button onClick={() => handleRegalRowClick("B")}>B</button>
                <button onClick={() => handleRegalRowClick("C")}>C</button>
                <button onClick={() => handleRegalRowClick("D")}>D</button>
                <button onClick={() => handleRegalRowClick("E")}>E</button>
			</div>
			<Suspense fallback={<p className={classes.loading}>Loading...</p>}>
				<Keyboards selectedRegalRow={selectedRegalRow} />
			</Suspense>
		</main>
	);
}
