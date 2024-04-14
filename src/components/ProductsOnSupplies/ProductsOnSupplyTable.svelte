<script>
	import { loading } from "@/services/stores";
	import {
		deleteProductOnSupply,
		productsOnSupply,
	} from "@/services/productsOnSupply";
	import { moneyFormater } from "@/services/utils";
	import ProductOnSupplyEditDialog from "./ProductOnSupplyEditDialog.svelte";
	import EditIcon from "@/assets/svgs/bx-edit.svg?raw";
	import TrashIcon from "@/assets/svgs/bx-trash.svg?raw";
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
	{:else if $productsOnSupply?.length === 0}
		<tr>
			<td colspan="5">No hay productos en la venta</td>
		</tr>
	{:else}
		{#each $productsOnSupply as productOnSupply}
			<tr>
				<td>{productOnSupply?.product?.name}</td>
				<td>{productOnSupply?.quantity}</td>
				<td>{moneyFormater.format(productOnSupply?.unitCost)}</td>
				<td
					>{moneyFormater.format(
						productOnSupply?.quantity * productOnSupply?.unitCost
					)}</td
				>
				<td>
					<button
						class="btn-edit"
						popovertarget={`edit-product-on-supply-dialog-${productOnSupply.productId}`}
						popovertargetaction="show"
					>
						{@html EditIcon}
					</button>

					<ProductOnSupplyEditDialog {productOnSupply} />

					<button
						class="btn-delete"
						on:click={async () => {
							if (confirm("¿Estás seguro de eliminar este producto?")) {
								await deleteProductOnSupply(
									productOnSupply.supplyId,
									productOnSupply.productId
								);
							}
						}}
					>
						{@html TrashIcon}
					</button>
				</td>
			</tr>
		{/each}
	{/if}
</table>

<style>
	table {
		width: 100%;

		background-color: var(--color);
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
		&:first-of-type {
			border-radius: 1rem 0 0 1rem;
		}

		&:last-of-type {
			text-align: end;
			border-radius: 0 1rem 1rem 0;
		}

		&:nth-child(4) {
			text-align: right;
		}
	}

	td:nth-of-type(3) {
		text-transform: capitalize;
	}

	tr:nth-of-type(even) {
		background-color: var(--accent);
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
