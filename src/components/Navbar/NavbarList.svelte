<script>
	import { onMount } from "svelte";
	import NavbarIcon from "./NavbarIcon.svelte";

	let currentUrl = "";
	onMount(() => {
		currentUrl = window.location.pathname;
	});
</script>

<ul>
	<NavbarIcon
		href="/dashboard"
		bx_name="home"
		label="Dashboard"
		className={currentUrl === "/dashboard" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/products"
		bx_name="drink"
		label="Products"
		className={currentUrl === "/dashboard/products" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/categories"
		bx_name="purchase-tag"
		label="Categories"
		className={currentUrl === "/dashboard/categories" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/sales"
		bx_name="receipt"
		label="Sales"
		className={currentUrl === "/dashboard/sales" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/supplies"
		bx_name="package"
		label="Supplies"
		className={currentUrl === "/dashboard/supplies" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/providers"
		bx_name="car"
		label="Providers"
		className={currentUrl === "/dashboard/providers" ? "current-page" : ""}
	/>
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
