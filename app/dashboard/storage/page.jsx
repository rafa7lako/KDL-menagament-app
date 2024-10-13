import { getMergedLocalisationSkuData } from "@/lib/keyboards";
import classes from "./page.module.css";
import { Suspense } from "react";
import LocalisationOverviewWrapper from "@/app/ui/dashboard/storage/localisationOverviewWrapper/localisationOverviewWrapper";

async function Keyboards() {
	try {
		// Fetch the merged data
		const mergedData = await getMergedLocalisationSkuData();
		// Return the LocalisationList with the fetched data
		return <LocalisationOverviewWrapper mergedKeyboardData={mergedData} />;
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

			<Suspense fallback={<p className={classes.loading}>Loading...</p>}>
				<Keyboards />
			</Suspense>
		</main>
	);
}
