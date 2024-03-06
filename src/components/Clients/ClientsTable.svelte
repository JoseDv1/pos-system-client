<script lang="ts">
	import { parseId } from "@/services/utils";
	import { deleteClientService, clients } from "@/services/clients";
	import type { Client } from "@/types";
	import { loading } from "@/services/stores";

	import EditIcon from "@/assets/svgs/bx-edit.svg?raw";
	import TrashIcon from "@/assets/svgs/bx-trash.svg?raw";

	const openEditDialog = (client: Client) => {
		const dialog = document.getElementById(
			"edit-client-dialog"
		) as HTMLDialogElement;
		dialog.showModal();

		const $form = dialog.querySelector("form") as HTMLFormElement;

		$form.dataset.id = client.id;
		($form.querySelector("#edit-client-name") as HTMLInputElement).value =
			client.name;
		($form.querySelector("#edit-client-email") as HTMLInputElement).value =
			client.email ?? "";
		($form.querySelector("#edit-client-address") as HTMLInputElement).value =
			client.address ?? "";
	};
</script>

<table>
	<tr>
		<th>Id</th>
		<th>Nombre</th>
		<th>Email</th>
		<th>Direccion</th>
		<th>Acciones</th>
	</tr>
	{#if $loading}
		<tr>
			<td colspan="5">Cargando...</td>
		</tr>
	{:else if $clients.length === 0}
		<tr>
			<td colspan="5">No hay clientes</td>
		</tr>
	{:else}
		{#each $clients as client}
			<tr>
				<td>#{parseId(client.id)}</td>
				<td>{client.name}</td>
				<td>{client.email == null ? "Sin Email" : client.email}</td>
				<td>{client.address == null ? "Sin Direccion" : client.address}</td>
				<td>
					<button class="btn-edit" on:click={() => openEditDialog(client)}>
						{@html EditIcon}
					</button>
					<button
						class="btn-delete"
						on:click={() => {
							if (confirm("¿Estas seguro de eliminar este mesero?")) {
								deleteClientService(client.id);
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
		text-align: end;
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
