<script lang="ts">
	import ProductsTable from "@/components/Products/ProductsTable.svelte";
	import AddProductForm from "./AddProductForm.svelte";
	import EditProductForm from "./EditProductForm.svelte";
	import { parseId } from "@/lib/parseId";
	import { createToast } from "@/lib/showToast";
	import type { Product } from "@/types";
	import { onMount } from "svelte";

	// States
	let products: any[] = [];
	let loading = true;
	let filterOrderDesc = true;
	let filterkey = "Nombre";
	let search = "";

	// Computed
	$: filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(search.toLowerCase()) ||
			product.category.name.toLowerCase().includes(search.toLowerCase()) ||
			product.id.toLowerCase().includes(search.toLowerCase())
	);

	// State Events
	onMount(async () => {
		// Get the products from the server
		const response = await fetch(
			"http://localhost:3000/api/products?category=true"
		);
		const data = await response.json();

		// Set the products to the state
		products = data;
		loading = false;
	});

	const deleteProduct = async (id: string) => {
		// Eliminar del servidor
		try {
			const res = await fetch(`http://localhost:3000/api/products/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				throw new Error("No se pudo eliminar el producto");
			}
		} catch (e: any) {
			createToast(e.message, "error");
			return;
		}

		// Eliminar del estado
		products = products.filter((product) => product.id !== id);

		createToast(`Producto ${parseId(id)} Eliminado Correctamente`, "error");
	};

	const addProduct = async (e: SubmitEvent) => {
		// Get the form data
		const $form: HTMLFormElement = e.target as HTMLFormElement;
		const formData = new FormData($form);

		const data = {
			name: formData.get("add-product-name") as string,
			price: Number(formData.get("add-product-price") as string),
			categoryId: formData.get("add-product-category") as string,
		};

		// Send the form data to the server
		const response = await fetch("http://localhost:3000/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		// If the response is not ok, show an error
		if (!response.ok) {
			const message = await response.json();
			createToast(message.error, "error");
			return;
		}

		// If the response is ok, add the product to the state
		const product = await response.json();
		products = [product, ...products];

		// Reset the form
		$form.reset();

		// Close the dialog
		closeCreateDialog();
	};

	const editProduct = (data: any) => {
		try {
			// Edit the product in the server
			const res = fetch(`http://localhost:3000/api/products/${data.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// Edit the product in the state
			products = products.map((p) => {
				if (p.id === data.id) {
					return {
						...p,
						...data,
					};
				}
				return p;
			});
		} catch (e: any) {
			createToast(e.message, "error");
			return;
		}
	};

	const editProductForm = (e: SubmitEvent) => {
		// Get the form data
		const $form: HTMLFormElement = e.target as HTMLFormElement;
		const $id = document.getElementById("edit-product-id");
		const formData = new FormData($form);

		const data = {
			name: formData.get("edit-product-name") as string,
			price: Number(formData.get("edit-product-price") as string),
			categoryId: formData.get("edit-product-category") as string,
			stock: Number(formData.get("edit-product-stock") as string),
			id: $id?.textContent,
		};

		editProduct(data);
		closeEditDialog();
	};

	// Dialog Events
	const openCreateDialog = () => {
		const $dialog: HTMLDialogElement = document.getElementById(
			"add-product-dialog"
		) as HTMLDialogElement;
		$dialog!.showModal();
	};

	const closeCreateDialog = () => {
		const $dialog: HTMLDialogElement = document.getElementById(
			"add-product-dialog"
		) as HTMLDialogElement;

		$dialog.close();
	};

	const openEditDialog = (product: Product) => {
		const $dialog: HTMLDialogElement = document.getElementById(
			"edit-product-dialog"
		) as HTMLDialogElement;
		$dialog!.showModal();

		// Set the product to edit in the form
		const $form: HTMLFormElement = $dialog.querySelector(
			"form"
		) as HTMLFormElement;
		const $id = $dialog.querySelector("#edit-product-id") as HTMLSpanElement;

		$form["edit-product-name"].value = product.name;
		$form["edit-product-price"].value = product.price;
		$form["edit-product-category"].value = product.category.id;
		$form["edit-product-stock"].value = product.stock;
		$id.textContent = product.id;
	};

	const closeEditDialog = () => {
		const $dialog: HTMLDialogElement = document.getElementById(
			"edit-product-dialog"
		) as HTMLDialogElement;

		$dialog.close();
	};

	// Filter Events
	const filterClickEvent = (e: PointerEvent) => {
		const $target = e.target as Element;
		if ($target.classList.contains("active")) {
			filterOrderDesc = !filterOrderDesc;
		}
		filterkey = $target.textContent!;

		$target?.classList.add("active");
		[...$target?.parentElement!.children].forEach((el) => {
			if (el !== $target) {
				el.classList.remove("active");
			}
		});

		filterByKey(filterkey);
	};

	const filterByKey = (filterkey: string) => {
		if (filterOrderDesc) {
			switch (filterkey) {
				case "Nombre":
					filteredProducts = products.sort((a, b) =>
						a.name.localeCompare(b.name)
					);
					break;
				case "Precio":
					filteredProducts = products.sort((a, b) => a.price - b.price);
					break;
				case "Stock":
					filteredProducts = products.sort((a, b) => a.stock - b.stock);
					break;
				case "Categoria":
					filteredProducts = products.sort((a, b) =>
						a.category.name.localeCompare(b.category.name)
					);
					break;
				case "Id":
					filteredProducts = products.sort((a, b) => a.id.localeCompare(b.id));
					break;
			}
		} else {
			switch (filterkey) {
				case "Nombre":
					filteredProducts = products.sort((a, b) =>
						b.name.localeCompare(a.name)
					);
					break;
				case "Precio":
					filteredProducts = products.sort((a, b) => b.price - a.price);
					break;
				case "Stock":
					filteredProducts = products.sort((a, b) => b.stock - a.stock);
					break;
				case "Categoria":
					filteredProducts = products.sort((a, b) =>
						b.category.name.localeCompare(a.category.name)
					);
					break;
				case "Id":
					filteredProducts = products.sort((a, b) => b.id.localeCompare(a.id));
					break;
			}
		}
	};

	// Generate Report - Make a printable version of the table
	const generateReport = () => {
		// Get the table
		const $table = document.getElementById(
			"products-table"
		) as HTMLTableElement;

		const $printable = $table.cloneNode(true) as HTMLTableElement;

		// Remove the unnecessary columns
		$printable
			.querySelectorAll(
				"td:last-child, th:last-child, td:nth-child(2), th:nth-child(2)"
			)
			.forEach((td) => td.remove());

		// Create a new window and print the table
		const $window = window.open("", "_blank");
		$window!.document.head.innerHTML = `<title>Reporte de Productos</title>`;
		$window!.document.head.innerHTML += `
		<style>
			body {
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			}

			table {
				width: 100%;
				table-layout: auto;
				padding: 1rem;
				border-spacing: 0;
			}
		
			th,
			td {
				padding: 0 1rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: left;
				border-bottom: 1px dashed #00000088;
			}
		
		
			th {
				font-size: 1.2rem;
				user-select: none;
			}
		</style>`;
		$window!.document.body.appendChild($printable);
		$window!.print();

		// Remove the table from the window
		$window!.document.body.removeChild($printable);
		$window!.close();
	};
</script>

<div class="page">
	<header>
		<h1>Lista de productos</h1>

		<search>
			<input
				type="text"
				bind:value={search}
				placeholder="Buscar productos..."
			/>
		</search>

		<div>
			<button on:click={() => generateReport()}>
				<box-icon name="file" color="currentColor"></box-icon> Generar Reporte
			</button>

			<button
				on:click={() => {
					filterOrderDesc = !filterOrderDesc;
					filterByKey(filterkey);
				}}
			>
				{#if filterOrderDesc}
					<box-icon name="sort-down" type="solid" color="currentColor"
					></box-icon>
					Orden Descendente
				{:else}
					<box-icon name="sort-up" type="solid" color="currentColor"></box-icon>
					Orden Ascendente
				{/if}
			</button>

			<button on:click={openCreateDialog}>
				<box-icon name="plus" color="currentColor"></box-icon> Añadir Producto
			</button>
		</div>
	</header>

	<dialog id="edit-product-dialog">
		<EditProductForm {closeEditDialog} {editProductForm} />
	</dialog>

	<dialog id="add-product-dialog">
		<AddProductForm {closeCreateDialog} {addProduct} />
	</dialog>

	<ProductsTable
		{deleteProduct}
		{loading}
		products={filteredProducts}
		{openEditDialog}
		{filterClickEvent}
	/>
</div>

<style>
	div.page {
		padding: 1rem;
	}

	dialog {
		width: 100%;
		max-width: 500px;
		border: 2px solid black;
		border-radius: var(--radius);
		padding: 1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}

	header div {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: white;
		border-radius: var(--radius);
		gap: 1rem;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1rem;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	search {
		flex: 1;
	}

	search input {
		width: 100%;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: var(--radius);
		background-color: var(--light);
		font-size: 1.2rem;
	}

	search input:focus {
		outline: none;
	}
</style>
