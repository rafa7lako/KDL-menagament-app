"use client";

import { useEffect, useState } from 'react';
import classes from './localisationListItem.module.css';
import SkuListItem from './skuListItem';
import AddSkuBtn from './addSkuBtn';

// Import the server-side action
import { fetchSkusByLocalisation } from '@/lib/actions';  // Update with actual path

export default function LocalisationListItem({ localisation }) {
    const [skus, setSkus] = useState([]);  // State for the SKUs
    const [addSkuFormSubmitted, setAddSkuFormSubmitted] = useState(false);

    function refreshData(isSubmitted) {
        setAddSkuFormSubmitted(isSubmitted);
        console.log('Refresh successful');
    }

    async function loadSkus() {
        try {
            // Call the server-side action to fetch SKUs for the given localisation
            const fetchedSkus = await fetchSkusByLocalisation(localisation.localisation);
            setSkus(fetchedSkus);  // Update the state with fetched SKUs
        } catch (error) {
            console.error('Failed to load SKUs:', error);
        }
    }

    // Use useEffect to fetch SKUs when localisation or form submission changes
    useEffect(() => {
        loadSkus();
    }, [localisation.localisation, addSkuFormSubmitted]);

    return (
        <li className={classes.localisationListItem}>
            <p className={classes.localisationTitle}>{localisation.localisation}</p>
            <ul className={classes.skuList}>
                {skus.map((sku) => (
                    <SkuListItem sku={sku} key={sku} />
                ))}
            </ul>
            <AddSkuBtn
                localisation={localisation.localisation}
                refreshData={refreshData}
            />
        </li>
    );
}
