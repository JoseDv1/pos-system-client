<script>
	export let providers;
	export let loading;
	export let deleteProvider;
	export let openEditProviderDialog;

	const parseDays = (days) => {
		const daysArray = days.split(" ");
		return daysArray.join(" - ");
	};
</script>

<table>
	<tr>
		<th>Nombre</th>
		<th>Telefono</th>
		<th>Dias de Pedido</th>
		<th>Acciones</th>
	</tr>

	{#if loading}
		<tr>
			<td colspan="4" class="load"></td>
		</tr>
	{:else}
		{#each providers as prov}
			<tr>
				<td>{prov.name}</td>
				<td>{prov.phone}</td>
				<td>{parseDays(prov.supplyDays)}</td>
				<td>
					<button class="btn-edit" on:click={() => openEditProviderDialog(prov)}
						>Editar</button
					>
					<button
						class="btn-delete"
						on:click={async () => {
							if (confirm("¿Estas seguro de eliminar este proveedor?")) {
								await deleteProvider(prov.id);
							}
						}}>Eliminar</button
					>
				</td>
			</tr>
		{/each}
	{/if}
</table>

<style>
	table {
		width: 100%;
		table-layout: fixed;
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
		&:nth-child(odd) {
			border-radius: 1rem 0 0 1rem;
		}
	}

	td:last-child,
	th:last-child {
		text-align: end;
		border-radius: 0 1rem 1rem 0;
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
</style>
