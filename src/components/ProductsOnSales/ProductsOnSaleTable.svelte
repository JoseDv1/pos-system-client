<script lang="ts">
	import {
		deleteProductOnSaleService,
		productsOnSale,
	} from "@/services/productsOnSale";
	import { loading } from "@/services/stores";
	import type { SaleProduct } from "@/types";

	const openEditProductOnSaleDialog = (productsOnSale: SaleProduct) => {
		// Get the dialog element
		const $dialog = document.getElementById(
			"edit-product-on-sale-dialog"
		) as HTMLDialogElement;
		$dialog!.showModal();
		const $form = document.getElementById(
			"edit-product-on-sale-form"
		) as HTMLFormElement;
		// Set the data in the form
		$form!["edit-product-on-sale-quantity"].value = productsOnSale.quantity;
		$form!["edit-product-on-sale-unit-cost"].value = productsOnSale.unitCost;
		// Set the product name in the dialog
		document.getElementById("edit-product-on-sale-name")!.textContent =
			productsOnSale.product.name;
		// Set the product id in the form
		$form!.dataset.productId = productsOnSale.productId;
		$form!.dataset.saleId = productsOnSale.saleId;
	};
</script>

<table id="sale-table">
	<tr>
		<th>Producto</th>
		<th>Cantidad</th>
		<th>Precio Unitario</th>
		<th>Subtotal</th>
		<th>Acciones</th>
	</tr>

	{#if $loading}
		<tr>
			<td colspan="5">Cargando...</td>
		</tr>
	{:else if $productsOnSale?.saleProducts?.length === 0}
		<tr>
			<td colspan="5">No hay productos en la venta</td>
		</tr>
	{:else}
		{#each $productsOnSale?.saleProducts ?? [] as saleProduct}
			<tr>
				<td>{saleProduct?.product?.name}</td>
				<td>{saleProduct?.quantity}</td>
				<td
					>{new Intl.NumberFormat("es-CO", {
						style: "currency",
						currency: "COP",
					}).format(saleProduct?.unitCost)}</td
				>
				<td
					>{new Intl.NumberFormat("es-CO", {
						style: "currency",
						currency: "COP",
					}).format(saleProduct?.quantity * saleProduct?.unitCost)}</td
				>
				<td>
					<button
						class="btn-edit"
						on:click={() => {
							openEditProductOnSaleDialog(saleProduct);
						}}
					>
						<box-icon name="edit" color="currentColor"></box-icon>
					</button>
					<button
						class="btn-delete"
						on:click={() => {
							if (
								confirm("¿Estás seguro de eliminar este producto de la venta?")
							) {
								deleteProductOnSaleService(
									saleProduct.saleId,
									saleProduct.productId
								);
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

	td,
	th {
		&:first-child {
			border-radius: 1rem 0 0 1rem;
		}

		&:last-child {
			text-align: end;
			border-radius: 0 1rem 1rem 0;
		}

		&:nth-child(4) {
			text-align: right;
		}
	}

	td:nth-child(3) {
		text-transform: capitalize;
	}

	tr:nth-child(odd) {
		background-color: var(--light);
		border-radius: 1rem;
	}

	th {
		font-size: 1.2rem;
		user-select: none;
	}

	td[colspan="5"] {
		text-align: center;
	}
</style>
