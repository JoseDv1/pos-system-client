<script lang="ts">
	import { updateProductOnSaleService } from "@/services/productsOnSale";

	const closeEditProductOnSaleDialog = () => {
		const dialog = document.getElementById(
			"edit-product-on-sale-dialog"
		) as HTMLDialogElement;
		dialog!.close();
	};

	const editProductOnSaleEvent = async (e: SubmitEvent) => {
		// Get the form data
		const $form = e.target as HTMLFormElement;
		const productId = $form.dataset.productId;
		const saleId = $form.dataset.saleId;
		const quantity = $form["edit-product-on-sale-quantity"].value;
		const unitCost = $form["edit-product-on-sale-unit-cost"].value;

		const data = {
			productId,
			saleId,
			quantity,
			unitCost,
		};

		// Send the data to the server
		await updateProductOnSaleService(saleId!, productId!, data);

		// Close the dialog
		const dialog = document.getElementById(
			"edit-product-on-sale-dialog"
		) as HTMLDialogElement;
		dialog!.close();
	};
</script>

<div>
	<h1>Edita El producto</h1>
	<h2>Producto: <span id="edit-product-on-sale-name"></span></h2>
	<button
		class="close"
		on:click={() => closeEditProductOnSaleDialog()}
		aria-label="Close dialog">&times;</button
	>
	<form
		on:submit|preventDefault={editProductOnSaleEvent}
		id="edit-product-on-sale-form"
	>
		<label for="edit-product-on-sale-quantity"
			>Cantidad
			<input
				type="number"
				id="edit-product-on-sale-quantity"
				name="edit-product-on-sale-quantity"
				autocomplete="off"
			/>
		</label>

		<label for="edit-product-on-sale-unit-cost"
			>Precio Unitario
			<input
				type="number"
				id="edit-product-on-sale-unit-cost"
				name="edit-product-on-sale-unit-cost"
				autocomplete="off"
			/>
		</label>
		<button class="btn-edit">Editar</button>
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
		gap: 1rem;
	}

	input {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
	}

	label::before {
		display: inline-block;
		content: "*";
		color: red;
		margin-right: 0.255rem;
	}

	label input {
		margin-top: 0.5rem;
		display: block;
		width: 100%;
	}

	button.close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		cursor: pointer;
		z-index: 5;
		font-size: 1.5rem;
		background-color: transparent;
	}

	span:hover {
		color: red;
	}

	form > button {
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>
