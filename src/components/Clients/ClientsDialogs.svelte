<script lang="ts">
	import { createClientService, updateClientService } from "@/services/clients";
	import type { Client } from "@/types";

	const createClientEvent = async (e: SubmitEvent) => {
		const $form = e.target as HTMLFormElement;
		const formData = new FormData($form);

		const data: Partial<Omit<Client, "id">> = {
			name: formData.get("add-client-name") as string,
			email: formData.get("add-client-email") as string,
			address: formData.get("add-client-address") as string,
		};

		if (data.email === "") delete data.email;
		if (data.address === "") delete data.address;

		await createClientService(data as Omit<Client, "id">);
		$form.reset();
		(document.getElementById("add-client-dialog") as HTMLDialogElement).close();
	};

	const editClientEvent = async (e: SubmitEvent) => {
		const $form = e.target as HTMLFormElement;
		const formData = new FormData($form);
		const id = $form.dataset.id as string;

		const data: Partial<Client> = {
			name: formData.get("edit-client-name") as string,
			email: formData.get("edit-client-email") as string,
			address: formData.get("edit-client-address") as string,
		};

		if (data.email === "") data.email = null;
		if (data.address === "") data.address = null;

		await updateClientService(id, data);
		$form.reset();
		(
			document.getElementById("edit-client-dialog") as HTMLDialogElement
		).close();
	};
</script>

<dialog id="add-client-dialog" popover="auto">
	<div>
		<button popovertarget="add-client-dialog" popovertargetaction="hide"
			>&times;</button
		>
		<h1>Agregar un mesero</h1>
		<small class="required">Son campos requeridos</small>
		<form on:submit|preventDefault={createClientEvent}>
			<label for="add-client-name">Nombre</label>
			<input
				type="text"
				id="add-client-name"
				name="add-client-name"
				required
				autocomplete="off"
			/>

			<label for="add-client-email">Email</label>
			<input
				type="email"
				id="add-client-email"
				name="add-client-email"
				autocomplete="off"
			/>

			<label for="add-client-address">Direccion</label>
			<input
				type="text"
				id="add-client-address"
				name="add-client-address"
				autocomplete="off"
			/>

			<button>Agregar</button>
		</form>
	</div>
</dialog>

<dialog id="edit-client-dialog">
	<div>
		<span
			class="close"
			on:click={() =>
				// @ts-ignore
				document.getElementById("edit-client-dialog").close()}
			on:keydown={(e) =>
				e.key === "Escape" &&
				// @ts-ignore
				document.getElementById("edit-client-dialog").close()}
			tabindex="0"
			role="button"
			aria-label="Close dialog">&times;</span
		>
		<h1>Editar mesero</h1>
		<form on:submit|preventDefault={editClientEvent}>
			<label for="edit-client-name">Nombre</label>
			<input
				type="text"
				id="edit-client-name"
				name="edit-client-name"
				required
			/>

			<label for="edit-client-email">Email</label>
			<input
				type="email"
				id="edit-client-email"
				name="edit-client-email"
				autocomplete="off"
			/>

			<label for="edit-client-address">Direccion</label>
			<input
				type="text"
				id="edit-client-address"
				name="edit-client-address"
				autocomplete="off"
			/>

			<button>Editar</button>
		</form>
	</div>
</dialog>

<style>
	dialog {
		width: 100%;
		max-width: 500px;
		border: 2px solid black;
		border-radius: var(--radius);
		padding: 1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}

	dialog div {
		padding: 1rem;
	}

	dialog h1 {
		margin-bottom: 1rem;
	}

	dialog form {
		display: flex;
		flex-direction: column;
	}

	dialog label {
		font-size: 1.2rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	dialog input {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
	}

	dialog span.close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		cursor: pointer;
		z-index: 5;
		font-size: 1.5rem;
	}

	dialog span.close:hover {
		color: red;
	}

	dialog small.required::before,
	dialog label:nth-child(1):before {
		content: "* ";
		color: red;
	}

	dialog button {
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1.2rem;
		margin-top: 1rem;
	}

	button[popovertargetaction="hide"] {
		position: absolute;
		top: 0;
		right: 0;
		background-color: transparent;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		z-index: 5;

		&:hover {
			color: red;
		}
	}
</style>
