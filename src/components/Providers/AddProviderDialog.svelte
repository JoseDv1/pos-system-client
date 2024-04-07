<script>
	import { addProviderService } from "@/services/providers";

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

		// Add provider
		await addProviderService(data);
		document.getElementById("add-provider-dialog").close();
	};
</script>

<div>
	<button popovertarget="add-provider-dialog" popovertargetaction="close"
		>&times;
	</button>
	<h1>Agregar Proveedor</h1>
	<small class="required">Campos requeridos</small>
	<form on:submit|preventDefault={addProviderEvent}>
		<!-- Name, Phone, Days -->
		<label for="name">Nombre</label>
		<input type="text" id="name" autocomplete="off" />

		<label for="phone">Telefono</label>
		<input type="text" id="phone" autocomplete="off" />

		<fieldset>
			<legend>Dias de entrega</legend>
			<label for="monday">
				<input type="checkbox" id="monday" autocomplete="off" />
				Lunes
			</label>

			<label for="tuesday">
				<input type="checkbox" id="tuesday" autocomplete="off" />
				Martes
			</label>

			<label for="wednesday">
				<input type="checkbox" id="wednesday" autocomplete="off" />
				Miercoles
			</label>

			<label for="thursday">
				<input type="checkbox" id="thursday" autocomplete="off" />
				Jueves
			</label>

			<label for="friday">
				<input type="checkbox" id="friday" autocomplete="off" />
				Viernes
			</label>

			<label for="saturday">
				<input type="checkbox" id="saturday" autocomplete="off" />
				Sabado
			</label>

			<label for="sunday">
				<input type="checkbox" id="sunday" autocomplete="off" />
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

	button[popovertargetaction="close"] {
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
