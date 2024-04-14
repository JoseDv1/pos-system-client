import type { Product } from "@/types";
import { API_URL } from "@/services/constants";
import { writable } from "svelte/store";
import { loading } from "@/services/stores";
import { createToast } from "./utils";

type CreateProductData = {
	name: string;
	price: number;
	categoryId: string;
}

export const products = writable<Product[]>([]);
export const rawMaterials = writable<Product[]>([]);
export let search = writable('');


export const fetchProductsService = (async () => {
	try {
		loading.set(true);
		const res = await fetch(`${API_URL}/products`);
		const data: Product[] = await res.json();

		const prod = data.filter((product) => !product.isRawMaterial);
		const rawMats = data.filter((product) => product.isRawMaterial);
		products.set(prod);
		rawMaterials.set(rawMats);
		return [prod, rawMats];
	} catch (error) {
		createToast("Error al consultar los productos", "error");
	} finally {
		loading.set(false);
	}
})();

export const addProductService = async (productData: CreateProductData) => {
	const response = await fetch(`${API_URL}/products`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(productData),
	});

	const addedProduct = await response.json();
	const isRawMaterial = addedProduct.isRawMaterial;


	if (!isRawMaterial) {
		// Add to products store
		products.update((items) => [...items, addedProduct]);
	} else {
		// Add to rawMaterials store
		rawMaterials.update((items) => [...items, addedProduct]);
	}
}

export const updateProductService = async (productId: string, productData: any) => {
	try {
		const response = await fetch(`${API_URL}/products/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(productData),
		});
		const updatedProduct = await response.json();
		if (updatedProduct.isRawMaterial) {
			rawMaterials.update((prevRawMaterials) => {
				const updatedRawMaterials = prevRawMaterials.map((product) => {
					if (product.id === updatedProduct.id) {
						return updatedProduct;
					}
					return product;
				});
				return updatedRawMaterials;
			});
		} else {
			products.update((prevProducts) => {
				const updatedProducts = prevProducts.map((product) => {
					if (product.id === updatedProduct.id) {
						return updatedProduct;
					}
					return product;
				});
				return updatedProducts;
			});
		}



	} catch (error) {
		createToast("Error al actualizar el producto", "error");
	}
}

export const deleteProductService = async (productId: string) => {
	try {
		const response = await fetch(`${API_URL}/products/${productId}`, {
			method: "DELETE",
		});
		const deletedProduct = await response.json();
		products.update((prevProducts) => prevProducts.filter((product) => product.id !== deletedProduct.id));
	} catch (error) {
		createToast("Error al eliminar el producto", "error");
	}
}

// Generate Report - Make a printable version of the table
export const generateReport = (products: Product[]) => {
	const formatDate = new Intl.DateTimeFormat("es-CO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date());

	const data = products.toSorted((a, b) => a.category.name.localeCompare(b.category.name))
	const sortedByStock = data.sort((a, b) => b.stock - a.stock);

	const printWindow = window.open("", "_blank");
	const html = `
	<html lang="es">
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width" />
			<title>Reporte Inventario</title>
			<style>
				* {
					margin: 0;
				}

				header {
					margin-bottom: 2mm;
				}
			
				h1,
				h2 {
					text-align: center;
				}
			
				h1 {
					font-size: 1.5em;
				}
				h2 {
					font-size: 1.2em;
				}
			
				body {
					font-family: Arial, sans-serif;
					padding: 2mm;
					font-size: 12px;
					max-width: 72.1mm;
				}
			
				table {
					border-collapse: collapse;
					margin: 0;
					padding: 0;
				}
			
				td,
				th {
					padding: 0 1mm;
				}
			
				footer {
					margin-top: 2mm;
					text-align: right;
				}
			</style>
		</head>
		<body>
			<header>
				<h1>Reporte Inventario</h1>
				<p>Fecha: ${formatDate}</p>
			</header>

			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Stock</th>
						<th>Categoria</th>
					</tr>
				</thead>
				<tbody>
			${sortedByStock.map((item) => (
		`<tr>
							<td>${item?.name}</td>
							<td>${item?.stock}</td>
							<td>${item?.category?.name}</td>
						</tr>`
	)).join('')}
				</tbody>
			</table>
		</body>
	</html>
`

	printWindow?.document.write(html);
	printWindow?.print();
	printWindow?.document.close();
}
