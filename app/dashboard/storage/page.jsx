import { getMergedLocalisationSkuData } from "@/lib/keyboards";
import classes from "./page.module.css";
import SkuListItem from "../../ui/dashboard/storage/skuListItem";
import AddSkuBtn from "@/app/ui/dashboard/storage/addSkuBtn";

export default function Page() {
	const mergedData = getMergedLocalisationSkuData();

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
			<div className={classes.localisationListContainer}>
				<ul className={classes.localisationList}>
					{mergedData.map((localisation) => (
						<li
							className={classes.localisationListItem}
							key={localisation.localisation}
						>
							<p className={classes.localisationTitle}>
								{localisation.localisation}
							</p>
							<ul className={classes.skuList}>
								{localisation.skus.map((sku) => (
									<SkuListItem sku={sku} key={sku} />
								))}
							</ul>
							<AddSkuBtn />
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
