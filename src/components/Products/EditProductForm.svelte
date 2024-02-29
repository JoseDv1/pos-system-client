<script lang="ts">
	import { categories } from "@/services/categories";
	import { updateProductService } from "@/services/products";

	const closeEditDialog = () => {
		const $dialog: HTMLDialogElement = document.getElementById(
			"edit-product-dialog"
		) as HTMLDialogElement;

		$dialog.close();
	};

	const editProductForm = (e: SubmitEvent) => {
		// Get the form data
		const $form: HTMLFormElement = e.target as HTMLFormElement;
		const _id = document.getElementById("edit-product-id");
		const formData = new FormData($form);

		const data = {
			name: formData.get("edit-product-name") as string,
			price: Number(formData.get("edit-product-price") as string),
			categoryId: formData.get("edit-product-category") as string,
			stock: Number(formData.get("edit-product-stock") as string),
		};
		const id = _id!.textContent!;

		// Update the product
		updateProductService(id, data);

		// Close the dialog
		const $dialog: HTMLDialogElement = document.getElementById(
			"edit-product-dialog"
		) as HTMLDialogElement;
		$dialog.close();
	};
</script>

<div>
	<h1>Edita un producto</h1>
	<small class="required">Son campos requeridos</small>
	<span>
		PId:
		<small id="edit-product-id"></small>
	</span>
	<span
		class="close"
		on:click={() => closeEditDialog()}
		on:keydown={(e) => e.key === "Escape" && closeEditDialog()}
		tabindex="0"
		role="button"
		aria-label="Close dialog">&times;</span
	>
	<form on:submit|preventDefault={editProductForm}>
		<label for="edit-product-name">Nombre</label>
		<input
			type="text"
			id="edit-product-name"
			name="edit-product-name"
			required
			autocomplete="off"
		/>

		<label for="edit-product-price">Precio (Venta)</label>
		<input
			type="number"
			id="edit-product-price"
			min="1000"
			step="100"
			required
			name="edit-product-price"
			autocomplete="off"
		/>

		<label for="edit-product-stock">Stock</label>
		<input
			type="number"
			id="edit-product-stock"
			min="0"
			step="1"
			required
			name="edit-product-stock"
			autocomplete="off"
		/>

		<label for="edit-product-category">Categoria</label>
		<select name="edit-product-category" id="edit-product-category" required>
			{#each $categories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>

		<button>Editar</button>
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
