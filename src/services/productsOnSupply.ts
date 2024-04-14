import type { ProductsOnSupply } from "@/types";
import { loading } from "./stores";
import { createToast } from "./utils";
import { API_URL } from "./constants";
import { writable } from "svelte/store";

export const productsOnSupply = writable<ProductsOnSupply[]>([]);

export async function fetchProductsOnSupply(supplyId: string) {
	try {
		loading.set(true);
		const res = await fetch(`${API_URL}/supplies/${supplyId}/products`);
		const products = await res.json();
		productsOnSupply.set(products);
		return products;
	} catch (error) {
		createToast("Error al consultar los productos de la venta", "error");
	} finally {
		loading.set(false);
	}

}

export async function addProductToSupply(supplyId: string, product: Pick<ProductsOnSupply, "productId" | "quantity" | "unitCost">) {
	try {
		const res = await fetch(`${API_URL}/supplies/${supplyId}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
		});
		const data = await res.json();
		productsOnSupply.update((products) => [...products, data]);
	} catch (error) {
		createToast("Error al agregar el producto a la venta", "error");
	}
}

export async function updateProductOnSupply(supplyId: string, productId: string, product: Partial<ProductsOnSupply>) {
	try {
		const res = await fetch(`${API_URL}/supplies/${supplyId}/products/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
		});
		const data = await res.json();
		productsOnSupply.update((products) => products.map((p) => (p.productId === data.productId ? data : p)));

	} catch (error) {
		createToast("Error al actualizar el producto de la venta", "error");
	}
}

export async function deleteProductOnSupply(supplyId: string, productId: string) {
	try {
		const res = await fetch(`${API_URL}/supplies/${supplyId}/products/${productId}`, {
			method: "DELETE",
		});
		const data = await res.json();
		productsOnSupply.update((products) => products.filter((p) => p.productId !== data.productId));
	} catch (error) {
		createToast("Error al eliminar el producto de la venta", "error");
	}
}