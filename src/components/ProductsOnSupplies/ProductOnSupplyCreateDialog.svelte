<script>
	import { rawMaterials, products } from "@/services/products";
	import { addProductToSupply } from "@/services/productsOnSupply";
	export let supplyId;
	let search = "";
	let quantity;
	let total;
	let unitCost;

	const addProductOnSupplyEvent = async (e) => {
		const $form = e.target;
		const productId = $form.querySelector("input[type=radio]:checked")?.value;

		// Call the service to add the product on supply
		await addProductToSupply(supplyId, {
			productId,
			quantity,
			unitCost,
		});

		// Reset the form
		$form.reset();
	};

	$: filteredProducts = $products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);
	$: filteredRawMaterials = $rawMaterials.filter((rawMaterial) =>
		rawMaterial.name.toLowerCase().includes(search.toLowerCase())
	);
</script>

<dialog popover id="create-product-on-supply-dialog">
	<form on:submit|preventDefault={addProductOnSupplyEvent}>
		<h2>Agregar producto a la compra</h2>

		<search>
			<input type="text" placeholder="Busca un producto" bind:value={search} />
		</search>

		{#if filteredProducts.length > 0}
			<fieldset>
				<legend>Productos</legend>
				{#each filteredProducts as product}
					<label>
						{product?.name}
						<input
							type="radio"
							name="productToAdd"
							value={product?.id}
							autocomplete="off"
						/>
					</label>
				{/each}
			</fieldset>
		{/if}
		{#if filteredRawMaterials.length > 0}
			<fieldset>
				<legend>Materia Prima</legend>
				{#each filteredRawMaterials as rawMaterial}
					<label>
						{rawMaterial?.name}
						<input
							type="radio"
							name="productToAdd"
							value={rawMaterial?.id}
							autocomplete="off"
						/>
					</label>
				{/each}
			</fieldset>
		{/if}

		{#if filteredProducts.length === 0 && filteredRawMaterials.length === 0}
			<p>No se encontraron productos o materia prima</p>
		{/if}

		<label>
			Cantidad
			<input
				type="number"
				bind:value={quantity}
				required
				min="0"
				step="1"
				name="productOnSupplyquantity"
			/>
		</label>

		<fieldset>
			<legend
				>Precio
				<small
					>Si se llena el precio total, se calculará el precio unitario y
					viceversa</small
				>
			</legend>
			<label>
				Precio unitario
				<input
					type="number"
					id="productOnSupplyUnitCost"
					placeholder="Precio por unidad... "
					required
					min="0"
					step="any"
					name="productOnSupplyUnitCost"
					bind:value={unitCost}
					on:input={() => {
						if (quantity && total !== unitCost * quantity) {
							total = unitCost * quantity;
							document.getElementById("productOnSupplyTotalPrice").disabled =
								true;
							if (unitCost === null || unitCost === undefined) {
								document.getElementById("productOnSupplyTotalPrice").disabled =
									false;
								total = null;
							}
						}
					}}
				/>
			</label>
			<label>
				Precio total
				<input
					type="number"
					bind:value={total}
					step="any"
					min="0"
					id="productOnSupplyTotalPrice"
					name="productOnSupplyTotalPrice"
					placeholder="Precio del paquete o caja..."
					on:input={() => {
						if (quantity && unitCost !== total / quantity) {
							unitCost = total / quantity;
							document.getElementById("productOnSupplyUnitCost").disabled =
								true;
							if (total === null || total === undefined) {
								document.getElementById("productOnSupplyUnitCost").disabled =
									false;
								unitCost = null;
							}
						}
					}}
				/>
			</label>
		</fieldset>

		<button type="submit">Agregar</button>
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

	form {
		display: grid;
		gap: 1rem;
	}

	search {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	input {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: var(--radius);
	}

	input[type="text"],
	input[type="number"] {
		padding: 0.5rem;
		border-radius: var(--radius);
		border: none;
	}

	fieldset {
		border-radius: var(--radius);

		& > legend {
			margin-left: 1rem;
			padding-inline: 0.5rem;
		}

		& > legend > small {
			position: absolute;
			width: 200px;
			bottom: 100%;
			left: 100%;
			display: none;
			transition: display 0.5s;
			background-color: var(--color);
			z-index: 10;
			padding: 0.5rem;
		}

		&:hover > legend > small {
			display: block;
		}

		&:has(input[type="number"]) {
			display: flex;
			gap: 1rem;
		}
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

	input[type="radio"] {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
	}
</style>
