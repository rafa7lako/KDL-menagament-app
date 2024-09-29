"use server";

export async function createSkuItem(formData, localisation) {
	const item = {
		localisation: localisation,
		sku: formData.get("skuInput"),
	};

    console.log(item);
}
