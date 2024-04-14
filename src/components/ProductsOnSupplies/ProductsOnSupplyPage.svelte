<script>
	import { onMount } from "svelte";
	import ProductsOnSupplyTable from "./ProductsOnSupplyTable.svelte";
	import ProductsOnSupplyHeader from "./PŕoductsOnSupplyHeader.svelte";
	import ProductOnSupplyDialogs from "./ProductOnSupplyDialogs.svelte";
	import { fetchProductsOnSupply } from "@/services/productsOnSupply";
	export let supplyId;

	onMount(async () => {
		await fetchProductsOnSupply(supplyId);
	});
</script>

<main>
	<ProductsOnSupplyHeader {supplyId} />
	<ProductsOnSupplyTable />
	<ProductOnSupplyDialogs {supplyId} />
</main>

<style>
	main {
		padding: 1rem 2rem;
	}
</style>
