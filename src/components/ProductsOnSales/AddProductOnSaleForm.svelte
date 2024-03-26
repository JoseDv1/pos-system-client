<script>
	import { products } from "@/services/products";
	import {
		addProductOnSaleService,
		productsOnSale,
	} from "@/services/productsOnSale";

	let search = "";
	$: filteredProducts = $products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);

	function closeAddProductOnSaleDialog() {
		const dialog = document.getElementById("add-product-on-sale-dialog");
		dialog.close();
	}

	async function addProductOnSaleEvent(e) {
		const $form = e.target;
		const formData = new FormData($form);
		// Product ID
		const productId = $form.querySelector("input[type=radio]:checked")?.value;
		const quantity = formData.get("add-product-quantity");
		const saleId = $productsOnSale.id;
		await addProductOnSaleService(saleId, productId, { quantity });

		// Focus Again on the search input
		$form.querySelector("input[type=text]").focus();
	}
</script>

<div>
	<h1>Añade un producto</h1>
	<span
		on:click={() => closeAddProductOnSaleDialog()}
		on:keydown={(e) => e.key === "Escape" && closeAddProductOnSaleDialog()}
		tabindex="0"
		role="button"
		aria-label="Close dialog">&times;</span
	>
	<form on:submit|preventDefault={addProductOnSaleEvent}>
		<search>
			<input
				type="text"
				placeholder="Buscar Productos..."
				bind:value={search}
				autocomplete="off"
			/>

			<article>
				<ul>
					{#each filteredProducts as product}
						<li>
							<h2>{product?.name}</h2>
							<p>${product?.price}</p>
							<input
								type="radio"
								name={product.name}
								value={product?.id}
								autocomplete="off"
							/>
						</li>
					{/each}
				</ul>
			</article>
		</search>

		<label for="add-product-quantity"
			>Cantidad
			<input
				type="number"
				id="add-product-quantity"
				min="1"
				step="1"
				name="add-product-quantity"
				value="1"
				autocomplete="off"
			/>
		</label>

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
		gap: 1rem;
	}

	search {
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: var(--radius);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	search input {
		width: 100%;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: start;
		list-style: none;
		gap: 1rem;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	li h2 {
		flex: 1;
		font-size: 1.1rem;
	}

	input[type="radio"] {
		width: 1.5rem;
		height: 1.5rem;
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
