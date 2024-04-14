<script>
	import { loading } from "@/services/stores";
	import { filteredSupplies, deleteSupply } from "@/services/supplies";
	import { parseId, parseIsoDate, moneyFormater } from "@/services/utils";
	import TrashIcon from "@/assets/svgs/bx-trash.svg?raw";
	import ArrowIcon from "@/assets/svgs/bx-right-arrow-alt.svg?raw";
</script>

<table>
	<tr>
		<th>Provision ID</th>
		<th>Fecha</th>
		<th>Proveedor</th>
		<th>Total</th>
		<th>Acciones</th>
	</tr>
	{#if $loading}
		<tr>
			<td colspan="5"> Cargando... </td>
		</tr>
	{:else if $filteredSupplies.length === 0}
		<tr>
			<td colspan="5"> No hay provisiones </td>
		</tr>
	{:else}
		{#each $filteredSupplies as supply}
			<tr>
				<td>{parseId(supply.id)}</td>
				<td>{parseIsoDate(supply.date)}</td>
				<td>{supply.provider?.name}</td>
				<td>{moneyFormater.format(supply.totalCost)}</td>
				<td class="actions">
					<button
						class="btn-delete"
						on:click={async () => {
							if (
								confirm(
									"¿Estás seguro de eliminar la factura. Si la factura tiene items adentro, no se eliminará?"
								)
							) {
								await deleteSupply(supply.id);
							}
						}}
					>
						{@html TrashIcon}
					</button>
					<a class="btn-edit" href={`/dashboard/supplies/${supply.id}`}>
						{@html ArrowIcon}
					</a>
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

	td[colspan="5"] {
		text-align: center;
	}

	button {
		transition: all 0.3s;
	}
</style>
