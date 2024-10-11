'use client'

import { createContext, useState } from "react";

export const StorageContext = createContext({
	selectedRegalRow: 'Razem',
	setSelectedRegalRow: () => {},
	searchedSku: '',
	setSearchedSku: () => {},
    handleRegalRowClick: ()=>{},
    searchInput: '',
    setSearchInput: ()=>{},
    handleInputChange: ()=>{}
});

export default function StorageContextProvider({children}) {
	const [selectedRegalRow, setSelectedRegalRow] = useState("Razem");
	const [searchedSku, setSearchedSku] = useState("");

	const handleRegalRowClick = (regalRow) => {
		setSelectedRegalRow(regalRow); // Update the selected regal
        console.log(selectedRegalRow);
	};

    

    //SearchForm State

    const [searchInput, setSearchInput] = useState("");

	function handleInputChange(event) {
	
		const value = event.target.value;
		setSearchInput(value);
	
			setSearchedSku(value);
		
        
        
	}

	const ctxValue = {
		selectedRegalRow: selectedRegalRow,
		setSelectedRegalRow: setSelectedRegalRow,
		searchedSku: searchedSku,
		setSearchedSku: setSearchedSku,
        handleRegalRowClick: handleRegalRowClick,
        searchInput:searchInput,
        setSearchInput: setSearchInput,
        handleInputChange:handleInputChange
	};

    return <StorageContext.Provider value={ctxValue}>
        {children}
    </StorageContext.Provider>
}
