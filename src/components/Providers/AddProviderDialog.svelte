<script>
	export let closeAddProviderDialog;
	export let addProviderEvent;
</script>

<div>
	<span
		class="close"
		on:click={() => closeAddProviderDialog()}
		on:keydown={(e) => e.key === "Escape" && closeAddProviderDialog()}
		tabindex="0"
		role="button"
		aria-label="Close dialog">&times;</span
	>
	<h1>Agregar Proveedor</h1>
	<small class="required">Campos requeridos</small>
	<form on:submit|preventDefault={addProviderEvent}>
		<!-- Name, Phone, Days -->
		<label for="name">Nombre</label>
		<input type="text" id="name" />

		<label for="phone">Telefono</label>
		<input type="text" id="phone" />

		<fieldset>
			<legend>Dias de entrega</legend>
			<label for="monday">
				<input type="checkbox" id="monday" />
				Lunes
			</label>

			<label for="tuesday">
				<input type="checkbox" id="tuesday" />
				Martes
			</label>

			<label for="wednesday">
				<input type="checkbox" id="wednesday" />
				Miercoles
			</label>

			<label for="thursday">
				<input type="checkbox" id="thursday" />
				Jueves
			</label>

			<label for="friday">
				<input type="checkbox" id="friday" />
				Viernes
			</label>

			<label for="saturday">
				<input type="checkbox" id="saturday" />
				Sabado
			</label>

			<label for="sunday">
				<input type="checkbox" id="sunday" />
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
