<script lang>
	import { updateProductOnSupply } from "@/services/productsOnSupply";

	export let productOnSupply;
	let quantity = productOnSupply.quantity;
	let unitCost = productOnSupply.unitCost;
	let total = productOnSupply.quantity * productOnSupply.unitCost;

	let unitCost$;
	let total$;

	async function handleSubmit() {
		const { productId, supplyId } = productOnSupply;
		await updateProductOnSupply(supplyId, productId, {
			quantity,
			unitCost,
		});
	}
</script>

<dialog
	popover
	id={`edit-product-on-supply-dialog-${productOnSupply.productId}`}
>
	<button
		popovertarget={`edit-product-on-supply-dialog-${productOnSupply.productId}`}
		popovertargetaction="hide">&times;</button
	>

	<form on:submit|preventDefault={handleSubmit}>
		<h2>Editar producto en la compra</h2>

		<label>
			Cantidad
			<input type="number" required bind:value={quantity} />
		</label>

		<label>
			Precio Unitario
			<input
				type="number"
				required
				bind:this={unitCost$}
				bind:value={unitCost}
				on:input={() => {
					if (quantity && total !== unitCost * quantity) {
						total = unitCost * quantity;
						total$.disabled = true;
						if (unitCost === null || unitCost === undefined) {
							total$.disabled = false;
							total = null;
						}
					}
				}}
			/>
		</label>

		<label>
			Costo total
			<input
				type="number"
				bind:value={total}
				bind:this={total$}
				on:input={() => {
					if (quantity && unitCost !== total / quantity) {
						unitCost = total / quantity;
						unitCost$.disabled = true;
						if (total === null || total === undefined) {
							unitCost$.disabled = false;
							unitCost = null;
						}
					}
				}}
			/>
		</label>

		<button type="submit">Guardar</button>
	</form>
</dialog>

<style>
	dialog {
		width: 100%;
		max-width: 400px;
		max-height: 400px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 1rem;
		border-radius: var(--radius);
	}

	h2 {
		text-align: center;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	input {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
	}

	input[type="number"] {
		padding: 0.5rem;
		border-radius: var(--radius);
		border: none;
	}

	label {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 0.5rem 0.25rem;
		padding: 0.5rem;
		flex-wrap: wrap;

		&:has(input[required])::before {
			content: "*";
			color: red;
		}

		&:has(input[type="radio"]) {
			justify-content: space-between;
		}

		& input[type="number"] {
			flex: 1 1 100%;
		}
	}
</style>
