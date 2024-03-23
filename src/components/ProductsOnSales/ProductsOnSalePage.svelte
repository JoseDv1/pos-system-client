<script>
	import ProductsOnSaleTable from "./ProductsOnSaleTable.svelte";
	import ProductsOnSaleDialogs from "./ProductsOnSaleDialogs.svelte";
	import { fetchProductsOnSale } from "@/services/productsOnSale";
	import { onMount } from "svelte";
	import ProductsOnSalesHeader from "./ProductsOnSalesHeader.svelte";

	export let saleId;

	onMount(async () => {
		await fetchProductsOnSale(saleId);
	});
</script>

<main>
	<ProductsOnSalesHeader />
	<ProductsOnSaleDialogs />
	<ProductsOnSaleTable />
</main>

<style>
	main {
		padding: 1rem 2rem;
	}
</style>
