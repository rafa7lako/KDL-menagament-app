"use client";

import { useState, useEffect } from "react";
import SkuListItem from "./skuListItem";
import AddSkuBtn from "./addSkuBtn";
import classes from "./localisationList.module.css";

export default function LocalisationList({mergedKeyboardData}) {

    const [mergedData, setMergedData] = useState(mergedKeyboardData);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const data = await mergedKeyboardData;
            setMergedData(data);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    // Function to refresh the data after form submission
    const refreshData = async () => {
        const updatedData = await mergedKeyboardData; // Fetch updated data
        setMergedData(updatedData); // Update state with the latest data
    };

    return (
        <div className={classes.localisationListContainer}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
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
                            {/* Pass the refreshData function as a prop */}
                            <AddSkuBtn localisation={localisation.localisation} refreshData={refreshData} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
