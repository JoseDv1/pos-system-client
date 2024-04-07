<script lang="ts">
	import { categories } from "@/services/categories";
	import { addProductService } from "@/services/products";

	const addProductEvent = async (e: SubmitEvent) => {
		// Get the form data
		const $form: HTMLFormElement = e.target as HTMLFormElement;
		const formData = new FormData($form);

		const data = {
			name: formData.get("add-product-name") as string,
			price: Number(formData.get("add-product-price") as string),
			categoryId: formData.get("add-product-category") as string,
		};

		addProductService(data);
		$form.reset();

		// Close the dialog
		(
			document.getElementById("add-product-dialog") as HTMLDialogElement
		).close();
	};
</script>

<div>
	<h1>Añade un producto</h1>
	<small>Son campos requeridos</small>
	<button popovertargetaction="hide" popovertarget="add-product-dialog"
		>&times;</button
	>

	<form on:submit|preventDefault={addProductEvent}>
		<label for="add-product-name">Nombre</label>
		<input
			type="text"
			id="add-product-name"
			name="add-product-name"
			required
			autocomplete="off"
		/>

		<label for="add-product-price">Precio (Venta)</label>
		<input
			type="number"
			id="add-product-price"
			min="1000"
			step="100"
			required
			name="add-product-price"
			autocomplete="off"
		/>

		<label for="add-product-category">Categoria</label>
		<select name="add-product-category" id="add-product-category" required>
			<option disabled selected value="">Selecciona una categoria</option>
			{#each $categories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>

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
	select {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
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
