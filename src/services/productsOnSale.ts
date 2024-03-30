
import type { Sale, SaleProduct } from "@/types";
import { writable } from "svelte/store";
import { API_URL } from "./constants";
import { createToast } from "./utils";
import { loading } from "./stores";

export const productsOnSale = writable<Sale>();

export const fetchProductsOnSale = async (id: string) => {
	try {
		loading.set(true);
		const res = await fetch(`${API_URL}/sales/${id}/products`);
		const products = await res.json();
		productsOnSale.set(products)
		return products;
	} catch (error) {
		createToast("Error al consultar los productos de la venta", "error");
	} finally {
		loading.set(false);
	}
};

export const addProductOnSaleService = async (saleId: string, productId: string, data: Pick<Partial<SaleProduct>, "quantity">) => {
	try {
		const quantity = Number(data.quantity)
		const response = await fetch(`${API_URL}/sales/${saleId}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ productId, quantity }),
		});
		const createdProduct = await response.json();

		// Update the products on sale
		productsOnSale.update((prevSale) => {
			return {
				...prevSale,
				saleProducts: [...prevSale.saleProducts!, createdProduct]
			};
		});
		return createdProduct;
	} catch (error) {
		createToast("Fallo al agregar el producto a la venta", "error");
	} finally {
		fetchProductsOnSale(saleId);
	}
}

export const updateProductOnSaleService = async (saleId: string, productId: string, data: Pick<Partial<SaleProduct>, "unitCost" | "quantity">) => {
	try {
		const quantity = Number(data.quantity);
		const unitCost = Number(data.unitCost);

		const response = await fetch(`${API_URL}/sales/${saleId}/products/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ quantity, unitCost }),
		});
		const updatedProduct: SaleProduct = await response.json();

		// Update the products on sale
		productsOnSale.update((prevSale) => {
			return {
				...prevSale,
				saleProducts: prevSale.saleProducts!.map((product) => {
					if (product.productId === updatedProduct.productId) {
						return updatedProduct;
					}
					return product;
				}),
			}
		});

		return updatedProduct;
	} catch (error) {
		createToast("Fallo al actualizar el producto de la venta", "error");
	} finally {
		// Update the products on sale
		fetchProductsOnSale(saleId);
	}


}

export const deleteProductOnSaleService = async (saleId: string, productId: string) => {
	try {
		const response = await fetch(`${API_URL}/sales/${saleId}/products/${productId}`, {
			method: "DELETE",
		});
		const deletedProduct = await response.json();

		// Update the products on sale
		productsOnSale.update((prevSale) => {
			return {
				...prevSale,
				saleProducts: prevSale.saleProducts!.filter((product) => product.productId !== deletedProduct.productId)
			};
		});
		return deletedProduct;
	} catch (error) {
		createToast("Fallo al eliminar el producto de la venta", "error");
	} finally {
		fetchProductsOnSale(saleId);
	}
}


// ---- Not CRUD 
export const printSale = (data: Sale) => {
	const date = new Date(data.createdAt);
	const formatDate = new Intl.DateTimeFormat("es-CO", {
		timeStyle: "short",
		dateStyle: "medium",
	}).format(date);

	const printWindow = window.open("", "_blank");
	const html = `<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title>Reporte</title>
		<style>
	* {
		margin: 0;
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
		<h1>Reporte de venta</h1>
		<small>Id: ${data.id}</small>
		<p>Mesero/a: ${data.client.name}</p>
		<p>Fecha: ${formatDate}</p>
		<p>Metodo de pago: ${data.paymentMethod}</p>
		<h2>Productos</h2>
		<table>
			<thead>
				<tr>
					<th>Producto</th>
					<th>Cantidad</th>
					<th>Precio</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				${data.saleProducts!.map((product: any) => (
		`<tr>
							<td>${product?.product?.name}</td>
							<td>${product?.quantity}</td>
							<td>$${product?.unitCost}</td>
							<td>$${product?.quantity * product?.unitCost}</td>
						</tr>`
	)).join("")
		}
			</tbody>
		</table>
		<hr />
		<footer>
			<p>Total: $${data.totalCost}</p>
			<p>
				Propina: $${data.totalCost * 0.1}
			</p>
			<p>
				Total con propina: $${data.totalCost + data.totalCost * 0.1}
			</p>
		</footer>
	</body>
</html>
`
	printWindow?.document.write(html);
	printWindow?.document.close();
	printWindow?.print();

}
