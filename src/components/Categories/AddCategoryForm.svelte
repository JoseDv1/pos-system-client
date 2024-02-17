<script>
	export let closeCreateCategoryDialog;
	export let createCategoryEvent;
</script>

<div>
	<h1>Crea una Categoria nueva</h1>
	<small>Son campos requeridos</small>
	<span
		on:click={() => closeCreateCategoryDialog()}
		on:keydown={(e) => e.key === "Escape" && closeCreateCategoryDialog()}
		tabindex="0"
		role="button"
		aria-label="Close dialog">&times;</span
	>
	<form on:submit|preventDefault={createCategoryEvent}>
		<label for="add-category-name">Nombre</label>
		<input
			type="text"
			id="add-category-name"
			name="add-category-name"
			required
			placeholder="Escribe el nombre de la categoria..."
		/>

		<label for="add-category-description">Descripción</label>
		<textarea
			name="add-category-description"
			id="add-category-description"
			cols="30"
			rows="10"
			placeholder="Escribe una descripción de la categoria..."
		></textarea>

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

	input,
	textarea {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
	}

	textarea {
		padding: 1rem;
		resize: none;
		font-family: inherit;
		font-size: 1rem;
	}

	span {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		cursor: pointer;
		z-index: 5;
		font-size: 1.5rem;
	}

	span:hover {
		color: red;
	}

	small::before,
	label::before {
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
</style>
