<script>
	import { parseId, parseIsoDate } from "@/services/utils";
	import {
		deleteSaleService,
		filteredSales,
		markSaleAsPaidService,
		markSaleAsPendingService,
	} from "@/services/sales";
	import { loading } from "@/services/stores";
	import { fetchProductsOnSale, printSale } from "@/services/productsOnSale";

	import TrashIcon from "@/assets/svgs/bx-trash.svg?raw";
	import PrinterIcon from "@/assets/svgs/bx-printer.svg?raw";
	import MoneyWithdrawIcon from "@/assets/svgs/bx-money-withdraw.svg?raw";
	import RightArrowAltIcon from "@/assets/svgs/bx-right-arrow-alt.svg?raw";
</script>

<table>
	<tr>
		<th>Venta ID</th>
		<th>Fecha</th>
		<th>Mesero</th>
		<th>Estado</th>
		<th>Total</th>
		<th>Acciones</th>
	</tr>
	{#if $loading}
		<tr>
			<td colspan="6">Cargando...</td>
		</tr>
	{:else if $filteredSales.length === 0}
		<tr>
			<td colspan="6">No hay ventas</td>
		</tr>
	{:else}
		{#each $filteredSales.sort((a, b) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);
			return dateB - dateA;
		}) as sale}
			<tr>
				<td>#{parseId(sale?.id)}</td>
				<td>{parseIsoDate(sale?.createdAt)}</td>
				<td>{sale?.client?.name}</td>
				<td>
					<span class={sale?.status == "PENDING" ? "pending" : "pay"}
						>{sale?.status == "PENDING" ? "Pendiente" : "Pagado"}</span
					>
				</td>
				<td
					>{new Intl.NumberFormat("es-CO", {
						style: "currency",
						currency: "COP",
					}).format(sale?.totalCost)}</td
				>
				<td>
					<button
						class="btn-delete"
						on:click={() => {
							if (
								confirm(
									"Elimiar la venta hara que se borre del historial y no se pueda recuperar nunca si tiene elemento adentro no se eliminara aun asi"
								)
							) {
								deleteSaleService(sale.id);
							}
						}}
					>
						{@html TrashIcon}
					</button>
					<button
						class="btn-edit"
						on:click={() => {
							if (confirm("¿Deseas imprimir el recibo?")) {
								fetchProductsOnSale(sale.id).then(printSale);
							}
						}}
					>
						{@html PrinterIcon}
					</button>
					<button
						class={sale?.status == "PENDING" ? "btn-success" : "btn-delete"}
						on:click={() => {
							if (sale?.status == "PENDING") {
								markSaleAsPaidService(sale.id);
							} else {
								markSaleAsPendingService(sale.id);
							}
						}}
					>
						{@html MoneyWithdrawIcon}
					</button>

					<a class="btn-edit" href={`/dashboard/sales/${sale?.id}`}>
						{@html RightArrowAltIcon}
					</a>
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
		width: fit-content;
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

	a {
		display: inline-block;
		padding: 0.5rem;
		border-radius: var(--radius);
		color: white;
	}

	td[colspan="6"] {
		text-align: center;
	}

	button {
		transition: all 0.3s;
	}
</style>
