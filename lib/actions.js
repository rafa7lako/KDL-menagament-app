"use server";

import { addSku } from "./keyboards";

export async function createSkuItem(formData, localisation) {
	const item = {
		localisation: localisation,
		sku: formData.get("skuInput"),
	};

    addSku(item)
}
