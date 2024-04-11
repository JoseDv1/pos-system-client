<script lang="ts">
	import ProductsTable from "@/components/Products/ProductsTable.svelte";
	import { products, search, rawMaterials } from "@/services/products";
	import type { Product } from "@/types";
	import ProductsDialogs from "./ProductsDialogs.svelte";
	import ProductsHeader from "./ProductsHeader.svelte";

	// States
	let filterOrderDesc = true;
	let filterkey = "Nombre";

	const toggleOrder = () => {
		filterOrderDesc = !filterOrderDesc;
	};

	$: filteredProducts = $products.filter(
		(product) =>
			product.name.toLowerCase().includes($search.toLowerCase()) ||
			product.category.name.toLowerCase().includes($search.toLowerCase()) ||
			product.id.toLowerCase().includes($search.toLowerCase())
	);

	$: filteredRaw = $rawMaterials.filter(
		(product) =>
			product.name.toLowerCase().includes($search.toLowerCase()) ||
			product.category.name.toLowerCase().includes($search.toLowerCase()) ||
			product.id.toLowerCase().includes($search.toLowerCase())
	);

	$: filterByKey = (filterkey: string) => {
		// Sort the products by the filter key

		const sortFunctions = {
			Nombre: (a: Product, b: Product) => a.name.localeCompare(b.name),
			Precio: (a: Product, b: Product) => a.price - b.price,
			Stock: (a: Product, b: Product) => a.stock - b.stock,
			Categoria: (a: Product, b: Product) => {
				if (a.category && b.category) {
					return a.category.name.localeCompare(b.category.name);
				}
				return 0;
			},
			Id: (a: Product, b: Product) => a.id.localeCompare(b.id),
		};

		if (filterOrderDesc) {
			filteredProducts = $products.sort(
				sortFunctions[filterkey as keyof typeof sortFunctions]
			);
		} else {
			filteredProducts = $products.sort((a, b) =>
				sortFunctions[filterkey as keyof typeof sortFunctions](b, a)
			);
		}
	};

	// Filter Events
	const filterClickEvent = (e: MouseEvent) => {
		const $target = e.target as Element;
		if ($target.classList.contains("active")) {
			toggleOrder();
		}

		filterkey = $target.textContent!;

		$target?.classList.add("active");
		[...$target?.parentElement!.children].forEach((el) => {
			if (el !== $target) {
				el.classList.remove("active");
			}
		});

		filterByKey(filterkey);
	};
</script>

<div class="page">
	<ProductsHeader {filterOrderDesc} {filterByKey} {filterkey} {toggleOrder} />
	<ProductsDialogs />
	<section>
		<ProductsTable products={filteredProducts} {filterClickEvent} />
		<div id="rawMaterials">
			<header>
				<h2>Materias Primas</h2>
			</header>
			<ProductsTable products={filteredRaw} {filterClickEvent} />
		</div>
	</section>
</div>

<style>
	div.page {
		padding: 1rem 2rem;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	header {
		padding: 1rem;
		background-color: var(--color);
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}
</style>
