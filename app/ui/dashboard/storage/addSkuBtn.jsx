"use client";

import { plusIcon } from "@/app/icons";
import { useState } from "react";
import classes from "./addSkuBtn.module.css";
import { createSkuItem } from "@/lib/actions";
import AddSkuForm from "./addSkuForm/addSkuForm";

export default function AddSkuBtn({ localisation, refreshData }) { // Accept refreshData as a prop
    const [isClicked, setIsClicked] = useState(false);
    const [skuValue, setSkuValue] = useState(""); // State to hold the SKU input value

    function clickHandler() {
        setIsClicked((prevState) => !prevState);
    }


    return (
        <>
            {isClicked && (
                <AddSkuForm localisation={localisation} skuValue={skuValue} setSkuValue={setSkuValue}  isCloseBtnClicked={clickHandler} refreshData={refreshData} setIsClicked={setIsClicked} />
                // <form className={classes.addSkuForm} onSubmit={handleSubmit}>
                //     <input
                //         className={classes.skuInput}
                //         type="text"
                //         placeholder="Wpisz sku"
                //         id="skuInput"
                //         name="skuInput"
                //         value={skuValue} // Controlled input
                //         onChange={(e) => setSkuValue(e.target.value)} // Update state on input change
                //         required
                //     />
                //     <div className={classes.skuFormBtns}>
                //         <button type="submit" className={`${classes.skuFormBtn} ${classes.okBtn}`}>
                //             ok
                //         </button>
                //         <button type="button" className={`${classes.skuFormBtn} ${classes.xBtn}`} onClick={clickHandler}>
                //             x
                //         </button>
                //     </div>
                // </form>
            )}
            <button onClick={clickHandler}>{plusIcon}</button>
        </>
    );
}
