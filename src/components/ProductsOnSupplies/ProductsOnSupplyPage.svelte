<script>
	import { onMount } from "svelte";
	import ProductsOnSupplyTable from "./ProductsOnSupplyTable.svelte";
	import ProductsOnSupplyHeader from "./PŕoductsOnSupplyHeader.svelte";
	import ProductOnSupplyCreateDialog from "./ProductOnSupplyCreateDialog.svelte";
	import { fetchProductsOnSupply } from "@/services/productsOnSupply";
	export let supplyId;

	onMount(async () => {
		await fetchProductsOnSupply(supplyId);
	});
</script>

<main>
	<ProductsOnSupplyHeader {supplyId} />
	<ProductsOnSupplyTable />
	<ProductOnSupplyCreateDialog {supplyId} />
</main>

<style>
	main {
		padding: 1rem 2rem;
	}
</style>
