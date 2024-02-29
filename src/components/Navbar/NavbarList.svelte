<script>
	import { onMount } from "svelte";
	import NavbarIcon from "./NavbarIcon.svelte";

	let currentUrl = "";
	onMount(() => {
		currentUrl = window.location.pathname;
	});
</script>

<ul>
	<button
		on:click={() => {
			window.history.back();
		}}
	>
		<box-icon name="left-arrow-alt" color="currentColor"></box-icon>
		<p>Atras</p>
	</button>
	<NavbarIcon
		href="/dashboard"
		bx_name="home"
		label="Inicio"
		className={currentUrl === "/dashboard" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/products"
		bx_name="drink"
		label="Productos"
		className={currentUrl === "/dashboard/products" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/categories"
		bx_name="purchase-tag"
		label="Categorias"
		className={currentUrl === "/dashboard/categories" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/sales"
		bx_name="receipt"
		label="Ventas"
		className={currentUrl === "/dashboard/sales" ? "current-page" : ""}
	/>
	<!-- <NavbarIcon
		href="/dashboard/supplies"
		bx_name="package"
		label="Provisiones"
		className={currentUrl === "/dashboard/supplies" ? "current-page" : ""}
	/> -->
	<NavbarIcon
		href="/dashboard/providers"
		bx_name="car"
		label="Proveedores"
		className={currentUrl === "/dashboard/providers" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/waiters"
		bx_name="group"
		label="Meseros"
		className={currentUrl === "/dashboard/waiters" ? "current-page" : ""}
	/>
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
