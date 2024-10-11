import { useState, useContext } from "react";
import classes from "./searchForm.module.css";
import { StorageContext } from "@/app/store/context";

export default function SearchForm({ setSearchTerm }) {
	// const [searchInput, setSearchInput] = useState("");

	// function handleInputChange(event) {
	
	// 	const value = event.target.value;
	// 	setSearchInput(value);
	// 	if (setSearchTerm) {
	// 		setSearchTerm(value);
	// 	}
        
        
	// }

	const {searchInput, handleInputChange} = useContext(StorageContext)

	return (
		<form className={classes.searchForm} onSubmit={e=>{e.preventDefault()}}>
			<input
				className={classes.searchInput}
				type="text"
				name="sku-search"
				id="sku-search"
				placeholder="Szukaj"
                value={searchInput}
                onChange={handleInputChange}
				required
			></input>
		</form>
	);
}
