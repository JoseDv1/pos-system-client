<script lang="ts">
	import { parseId } from "@/services/utils";
	import { loading } from "@/services/stores";
	import { deleteProductService } from "@/services/products";
	import type { Product } from "@/types";

	export let products: Product[] = [];
	export let filterClickEvent: (e: MouseEvent) => void;
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
</script>

<table id="products-table">
	<tr>
		<th on:click={filterClickEvent}>Nombre</th>
		<th on:click={filterClickEvent}>Precio</th>
		<th on:click={filterClickEvent}>Stock</th>
		<th on:click={filterClickEvent}>Categoria</th>
		<th on:click={filterClickEvent}>Id</th>
		<th>Acciones</th>
	</tr>

	{#if $loading}
		<tr>
			<td colspan="5"> Cargando...</td>
		</tr>
	{:else if products.length === 0}
		<tr>
			<td colspan="5">No hay productos</td>
		</tr>
	{:else}
		{#each products as product}
			<tr>
				<td>{product.name}</td>
				<td>${product.price}</td>
				<td>{product.stock}</td>
				<td>{product.category.name}</td>
				<td>#{parseId(product.id)}</td>
				<td>
					<button class="btn-edit" on:click={() => openEditDialog(product)}>
						<box-icon name="edit" color="currentColor"></box-icon>
					</button>

					<button
						class="btn-delete"
						on:click={() => {
							if (confirm("¿Estás seguro de eliminar este producto?")) {
								deleteProductService(product.id);
							}
						}}
					>
						<box-icon name="trash" color="currentColor"></box-icon>
					</button>
				</td>
			</tr>
		{/each}
	{/if}
</table>

<style>
	table {
		width: 100%;
		background-color: white;
		border-radius: var(--radius);
		padding: 1rem;
		border-spacing: 0;
	}

	th,
	td {
		padding: 0.5rem 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}

	td:first-child,
	th:first-child {
		border-radius: 1rem 0 0 1rem;
	}

	td:last-child,
	th:last-child {
		border-radius: 0 1rem 1rem 0;
	}

	tr:nth-child(odd) {
		background-color: var(--light);
		border-radius: 1rem;
	}

	td:nth-child(2),
	td:nth-child(3),
	td:nth-child(5),
	th:nth-child(2),
	th:nth-child(3),
	th:nth-child(5),
	th:nth-child(6),
	td:nth-child(6) {
		text-align: right;
	}

	th {
		font-size: 1.2rem;
		user-select: none;
	}

	/* Botones */
	.btn-edit,
	.btn-delete {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		transition: all 0.3s ease-in-out;
	}

	.btn-edit {
		background-color: var(--primary75);
		color: white;
		margin-right: 0.5rem;
	}

	.btn-delete {
		background-color: var(--danger75);
		color: white;
	}

	/* Laoder */

	.load {
		text-align: center;
		font-style: italic;
		font-weight: bold;
	}

	.load::after {
		content: "Cargando...";
		animation: ellipsis 2s infinite;
		transition: all 0.3s ease-in-out;
	}

	@keyframes ellipsis {
		0% {
			content: "Cargando";
		}
		33% {
			content: "Cargando.";
		}
		66% {
			content: "Cargando..";
		}
		100% {
			content: "Cargando...";
		}
	}

	:global(th.active) {
		background-color: var(--primary);
		color: white;
		transition: all 0.3s ease-in-out;
	}

	td[colspan="5"] {
		text-align: center;
	}
</style>
