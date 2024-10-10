import { useState } from "react";
import classes from "./searchForm.module.css";

export default function SearchForm({ setSearchTerm }) {
	const [searchInput, setSearchInput] = useState("");

	function handleInputChange(event) {
	
		const value = event.target.value;
		setSearchInput(value);
		if (setSearchTerm) {
			setSearchTerm(value);
		}
        
        
	}

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
