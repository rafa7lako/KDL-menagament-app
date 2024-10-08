import { getMergedLocalisationSkuData } from "@/lib/keyboards";
import classes from "./page.module.css";
import { Suspense } from "react";
import LocalisationList from "@/app/ui/dashboard/storage/localisationList/localisationList";


async function Keyboards() {
	try {
		// Fetch the merged data
		const mergedData = await getMergedLocalisationSkuData();
		// Return the LocalisationList with the fetched data
		return <LocalisationList mergedKeyboardData={mergedData} />;
	} catch (error) {
		// Handle error fetching data
		console.error("Failed to fetch merged localisation SKU data:", error);
		return <p className={classes.loading}>Error loading data.</p>;
	}
}

export default function Page() {
	

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
			
			<Suspense fallback={<p className={classes.loading}>Loading...</p>}>
				<Keyboards />
			</Suspense>
		</main>
	);
}
