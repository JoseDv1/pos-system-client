<script>
	import { deleteProviderService, providers } from "@/services/providers";
	import { loading } from "@/services/stores";

	import EditIcon from "@/assets/svgs/bx-edit.svg?raw";
	import TrashIcon from "@/assets/svgs/bx-trash.svg?raw";

	const openEditProviderDialog = (provider) => {
		const $dialog = document.getElementById("edit-provider-dialog");
		$dialog.showModal();

		const $id = $dialog.querySelector("#edit-provider-id");
		$id.textContent = provider.id;

		// Set provider data to the form
		const $form = $dialog.querySelector("form");
		const $name = $form.querySelector("#edit-name");
		const $phone = $form.querySelector("#edit-phone");
		const $days = $form.querySelectorAll("input[type=checkbox]");

		$name.value = provider.name;
		$phone.value = provider.phone;
		$days.forEach((day) => {
			day.checked = provider.supplyDays.includes(day.id.split("-")[1]);
		});
	};
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

	{#if $loading}
		<tr>
			<td colspan="4" class="load"></td>
		</tr>
	{:else if $providers.length === 0}
		<tr>
			<td colspan="4">No hay proveedores</td>
		</tr>
	{:else}
		{#each $providers as prov}
			<tr>
				<td>{prov.name}</td>
				<td>{prov.phone}</td>
				<td>{parseDays(prov.supplyDays)}</td>
				<td>
					<button
						class="btn-edit"
						on:click={() => openEditProviderDialog(prov)}
					>
						{@html EditIcon}
					</button>
					<button
						class="btn-delete"
						on:click={async () => {
							if (confirm("¿Estas seguro de eliminar este proveedor?")) {
								await deleteProviderService(prov.id);
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
		background-color: var(--accent);
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

	td[colspan="4"] {
		text-align: center;
	}
</style>
