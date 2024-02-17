<script>
	import { createToast } from "@/lib/showToast";
	import { onMount } from "svelte";
	import ProvidersTable from "./ProvidersTable.svelte";
	import AddProviderDialog from "./AddProviderDialog.svelte";
	import EditProviderDialog from "./EditProviderDialog.svelte";
	import { fetchProviders } from "@/lib/providers";

	// States
	let providers = [];
	let loading = true;

	// State functions
	// Get providers
	onMount(async () => {
		try {
			const data = await fetchProviders();
			providers = data;
		} catch (error) {
			createToast("Error al obtener los proveedores", "error");
		} finally {
			loading = false;
		}
	});

	// Add provider
	const addProvider = async (data) => {
		// Add provider to the server
		try {
			const response = await fetch("http://localhost:3000/api/providers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const res = await response.json();
			// Add provider to the state
			providers = [...providers, res];
		} catch (error) {
			createToast("Error al agregar el proveedor", "error");
		}
	};

	// Delete provider
	const deleteProvider = async (id) => {
		try {
			// Delete provider from the server
			const response = await fetch(
				`http://localhost:3000/api/providers/${id}`,
				{
					method: "DELETE",
				}
			);
			const data = await response.json();
			// Delete provider from the state
			providers = providers.filter((provider) => provider.id !== data.id);
		} catch (error) {
			createToast("Error al eliminar el proveedor", "error");
		}
	};

	// Update provider
	const updateProvider = async (id, data) => {
		try {
			// Update provider in the server
			const response = await fetch(
				`http://localhost:3000/api/providers/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			const res = await response.json();
			// Update provider in the state
			providers = providers.map((provider) =>
				provider.id === res.id ? res : provider
			);
		} catch (error) {
			createToast("Error al actualizar el proveedor", "error");
		}
	};

	const editProviderEvent = (e) => {
		try {
			const $form = e.target;
			const $id = document.getElementById("edit-provider-id");
			const $name = $form.querySelector("#edit-name");
			const $phone = $form.querySelector("#edit-phone");
			const $days = $form.querySelectorAll("input[type=checkbox]");
			const data = {
				name: $name.value,
				phone: $phone.value,
				supplyDays: {
					lunes: $days[0].checked,
					martes: $days[1].checked,
					miercoles: $days[2].checked,
					jueves: $days[3].checked,
					viernes: $days[4].checked,
					sabado: $days[5].checked,
					domingo: $days[6].checked,
				},
			};

			// Set deliverDays to a space separated string of the selected days
			data.supplyDays = Object.entries(data.supplyDays)
				.filter(([, value]) => value)
				.map(([key]) => key)
				.join(" ");

			// Update provider
			updateProvider($id.textContent, data);
		} catch (error) {
			console.error(error);
			createToast("Error al actualizar el proveedor", "error");
		} finally {
			closeEditProviderDialog();
		}
	};

	// ---- Events Functions ----
	const addProviderEvent = async (e) => {
		const $form = e.target;
		const data = {
			name: $form.name.value,
			phone: $form.phone.value,
			supplyDays: {
				lunes: $form.monday.checked,
				martes: $form.tuesday.checked,
				miercoles: $form.wednesday.checked,
				jueves: $form.thursday.checked,
				viernes: $form.friday.checked,
				sabado: $form.saturday.checked,
				domingo: $form.sunday.checked,
			},
		};

		// Set deliverDays to a space separated string of the selected days
		data.supplyDays = Object.entries(data.supplyDays)
			.filter(([, value]) => value)
			.map(([key]) => key)
			.join(" ");

		console.log(data);

		// Add provider
		await addProvider(data);

		// Close dialog
		closeAddProviderDialog();
	};

	// ---- Dialogs ----
	const closeAddProviderDialog = () => {
		document.getElementById("add-provider-dialog").close();
	};

	const openAddProviderDialog = () => {
		document.getElementById("add-provider-dialog").showModal();
	};

	const closeEditProviderDialog = () => {
		document.getElementById("edit-provider-dialog").close();
	};

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
</script>

<main>
	<header>
		<h1>Proveedores</h1>
		<search></search>
		<!-- Actions -->
		<div>
			<button class="btn-edit" on:click={() => openAddProviderDialog()}>
				<box-icon name="plus" color="currentColor"></box-icon>
				Agregar</button
			>
		</div>
	</header>

	<!-- Table -->
	<ProvidersTable
		{providers}
		{loading}
		{deleteProvider}
		{openEditProviderDialog}
	/>
	<!-- Dialogs -->
	<dialog id="add-provider-dialog">
		<AddProviderDialog {closeAddProviderDialog} {addProviderEvent} />
	</dialog>
	<dialog id="edit-provider-dialog">
		<EditProviderDialog {closeEditProviderDialog} {editProviderEvent} />
	</dialog>
</main>

<style>
	main {
		padding: 1rem;
	}

	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	main header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: white;
		border-radius: var(--radius);
	}

	main header h1 {
		font-size: 2rem;
	}

	main header button {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 0.5rem;
	}
</style>
