import { getMergedLocalisationSkuData } from "@/lib/keyboards";
import { Suspense } from "react";
import LocalisationOverview from "@/app/ui/dashboard/storage/localisationOverview/localisationOverview";
import StorageContextProvider from "@/app/store/context";

import classes from "./page.module.css";

async function Keyboards() {
	try {
		const mergedData = await getMergedLocalisationSkuData();
		return (
			<StorageContextProvider>
				<LocalisationOverview mergedKeyboardData={mergedData} />
			</StorageContextProvider>
		);
	} catch (error) {
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
