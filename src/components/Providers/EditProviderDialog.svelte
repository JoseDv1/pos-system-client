<script>
	import { updateProviderService } from "@/services/providers";

	const closeEditProviderDialog = () => {
		document.getElementById("edit-provider-dialog").close();
	};

	const editProviderEvent = (e) => {
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

		// Update provider from the server
		updateProviderService($id.textContent, data);

		// Close dialog
		closeEditProviderDialog();
	};
</script>

<div>
	<h1>Edita un producto</h1>
	<small class="required">Son campos requeridos</small>
	<span>
		PId:
		<small id="edit-provider-id"></small>
	</span>
	<span
		class="close"
		on:click={() => closeEditProviderDialog()}
		on:keydown={(e) => e.key === "Escape" && closeEditProviderDialog()}
		tabindex="0"
		role="button"
		aria-label="Close dialog">&times;</span
	>
	<form on:submit|preventDefault={editProviderEvent}>
		<label for="edit-name">Nombre</label>
		<input type="text" id="edit-name" name="edit_name" autocomplete="off" />

		<label for="edit-phone">Telefono</label>
		<input type="text" id="edit-phone" name="edit_phone" autocomplete="off" />

		<fieldset>
			<legend>Dias de entrega</legend>
			<label for="edit-lunes">
				<input
					type="checkbox"
					id="edit-lunes"
					name="edit_lunes"
					autocomplete="off"
				/>
				Lunes
			</label>

			<label for="edit-martes">
				<input type="checkbox" id="edit-martes" autocomplete="off" />
				Martes
			</label>

			<label for="edit-miercoles">
				<input type="checkbox" id="edit-miercoles" autocomplete="off" />
				Miercoles
			</label>

			<label for="edit-jueves">
				<input type="checkbox" id="edit-jueves" autocomplete="off" />
				Jueves
			</label>

			<label for="edit-viernes">
				<input type="checkbox" id="edit-viernes" autocomplete="off" />
				Viernes
			</label>

			<label for="edit-sabado">
				<input type="checkbox" id="edit-sabado" autocomplete="off" />
				Sabado
			</label>

			<label for="edit-domingo">
				<input type="checkbox" id="edit-domingo" autocomplete="off" />
				Domingo
			</label>
		</fieldset>

		<button>Añadir</button>
	</form>
</div>

<style>
	div {
		padding: 1rem;
	}

	h1 {
		margin-bottom: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		font-size: 1.2rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	input {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
	}

	span.close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		cursor: pointer;
		z-index: 5;
		font-size: 1.5rem;
	}

	span.close:hover {
		color: red;
	}

	small.required::before,
	form > label::before,
	legend::before {
		content: "* ";
		color: red;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1.2rem;
		margin-top: 1rem;
	}

	fieldset {
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
		margin-top: 1rem;
	}
</style>
