import { getMergedLocalisationSkuData } from "@/lib/keyboards";
import classes from "./page.module.css";
import SkuListItem from "../../ui/dashboard/storage/skuListItem";
import AddSkuBtn from "@/app/ui/dashboard/storage/addSkuBtn";
import LocalisationList from "@/app/ui/dashboard/storage/localisationList";

export default function Page() {
	let mergedData = getMergedLocalisationSkuData();

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
			<LocalisationList mergedKeyboardData={mergedData}/>
		</main>
	);
}
