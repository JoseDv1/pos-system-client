<script>
	import { parseId, parseIsoDate } from "@/services/utils";
	import {
		changeClientService,
		deleteSaleService,
		fetchByidSaleService,
		filteredSales,
		markSaleAsPaidService,
		markSaleAsPendingService,
		updateSaleNote,
	} from "@/services/sales";
	import { loading } from "@/services/stores";
	import { fetchProductsOnSale, printSale } from "@/services/productsOnSale";

	import TrashIcon from "@/assets/svgs/bx-trash.svg?raw";
	import PrinterIcon from "@/assets/svgs/bx-printer.svg?raw";
	import MoneyWithdrawIcon from "@/assets/svgs/bx-money-withdraw.svg?raw";
	import RightArrowAltIcon from "@/assets/svgs/bx-right-arrow-alt.svg?raw";
	import DashIcon from "@/assets/svgs/bx-dashboard.svg?raw";
	import { clients } from "@/services/clients";

	async function handleTogglePopover(e) {
		const $textarea = e.target.querySelector("textarea");
		const saleId = e.target.getAttribute("x-id");

		// If just opened
		if (e.newState == "open") {
			// Focus on textarea
			$textarea.focus();

			// Get the sale note
			const data = await fetchByidSaleService(saleId);
			if (data.note == null) {
				data.note = "";
			}
			$textarea.value = data.note;
		}

		// If just closed
		if (e.newState == "closed") {
			if (
				$textarea.value.trim() === "" ||
				$textarea.value === null ||
				$textarea.value === undefined
			) {
				return;
			}
			await updateSaleNote(saleId, $textarea.value);
		}
	}
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
				<td>
					{new Intl.NumberFormat("es-CO", {
						style: "currency",
						currency: "COP",
					}).format(sale?.totalCost)}
				</td>
				<td>
					<button popovertarget={`actions-${sale.id}`}>
						{@html DashIcon}
					</button>

					<a class="btn-edit" href={`/dashboard/sales/${sale?.id}`}>
						{@html RightArrowAltIcon}
					</a>
				</td>
			</tr>

			<!-- MARK: Actions -->
			<div popover id={`actions-${sale.id}`}>
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
					Eliminar
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
					Imprimir
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
					Marcar como {sale?.status == "PENDING" ? "Pagado" : "Pendiente"}
					{@html MoneyWithdrawIcon}
				</button>
				<button popovertarget={`change-client-${sale.id}`}>
					Cambiar Mesero
				</button>
				<button popovertarget={`dialog-note-${sale.id}`}>Nota</button>
				<a class="btn-edit" href={`/dashboard/sales/${sale?.id}`}>
					Ir a la venta
					{@html RightArrowAltIcon}
				</a>
			</div>

			<!-- MARK: Note -->
			<dialog
				popover
				id={`dialog-note-${sale.id}`}
				on:toggle={handleTogglePopover}
				x-id={sale.id}
			>
				<div>
					<h1>Nota</h1>
					<textarea id={`dialog-note-${sale.id}-text`}></textarea>
				</div>
			</dialog>

			<dialog
				popover="auto"
				id={`change-client-${sale.id}`}
				class="change-client"
			>
				<form>
					<button
						type="button"
						popovertargetaction="hide"
						popovertarget={`change-client-${sale.id}`}>&times;</button
					>
					<h1>Cambiar cliente</h1>
					<div>
						<input type="text" disabled value={sale?.client?.name} />
						<select
							name="select-new-client"
							id={`select-new-client-${sale.id}`}
						>
							{#each $clients as client}
								<option value={client.id}>{client.name}</option>
							{/each}
						</select>
					</div>
					<button
						popovertarget="change-client-${sale.id}"
						on:click|preventDefault={async () => {
							await changeClientService(
								sale.id,
								document.getElementById(`select-new-client-${sale.id}`).value
							);
						}}
					>
						Cambiar mesero
					</button>
				</form>
			</dialog>
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

		&:nth-child(3) {
			text-transform: capitalize;
		}
	}

	tr:nth-of-type(odd) {
		background-color: var(--accent);
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

	div[popover]:popover-open {
		position: fixed;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
		background-color: var(--color);
		border-radius: var(--radius);
		padding: 0.5rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
		border: 1px solid var(--accent);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 1rem;
		min-width: 500px;
	}

	div[popover] button,
	div[popover] a {
		padding: 0.5rem;
		border-radius: var(--radius);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		gap: 0.5rem;
	}

	dialog[popover] {
		position: fixed;
		background-color: var(--color);
		border-radius: var(--radius);
		padding: 0.5rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
		border: 1px solid var(--accent);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 1rem;
		min-width: 500px;

		& h1 {
			margin-bottom: 1rem;
		}
	}

	dialog[popover] textarea {
		width: 100%;
		min-height: 100px;
		max-height: 500px;
		max-width: 700px;
		font-size: 1rem;
		padding: 1rem;
	}

	.change-client {
		& form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		& div {
			display: flex;
			gap: 1rem;
		}

		& input,
		select {
			width: 100%;
			padding: 0.5rem;
			border-radius: var(--radius);
			border: 1px solid var(--accent);
			flex: 1;
		}

		& button:last-of-type {
			padding: 0.5rem;
			border-radius: var(--radius);
			background-color: var(--accent);
			color: white;
			border: none;
			cursor: pointer;
			background: var(--primary);
			font-size: 1rem;
		}
	}
</style>
