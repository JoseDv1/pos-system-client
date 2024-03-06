<script>
	import { onMount } from "svelte";
	import NavbarIcon from "./NavbarIcon.svelte";

	import LeftArrowAlt from "@/assets/svgs/bx-left-arrow-alt.svg?raw";
	import Home from "@/assets/svgs/bx-home.svg?raw";
	import Drink from "@/assets/svgs/bx-drink.svg?raw";
	import PurchaseTag from "@/assets/svgs/bx-purchase-tag.svg?raw";
	import Receipt from "@/assets/svgs/bx-receipt.svg?raw";
	import Package from "@/assets/svgs/bx-package.svg?raw";
	import Car from "@/assets/svgs/bx-car.svg?raw";
	import Group from "@/assets/svgs/bx-group.svg?raw";

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
		{@html LeftArrowAlt}
		<p>Atras</p>
	</button>

	<NavbarIcon
		href="/dashboard"
		icon={Home}
		label="Inicio"
		className={currentUrl === "/dashboard" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/products"
		icon={Drink}
		label="Productos"
		className={currentUrl === "/dashboard/products" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/categories"
		icon={PurchaseTag}
		label="Categorias"
		className={currentUrl === "/dashboard/categories" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/sales"
		icon={Receipt}
		label="Ventas"
		className={currentUrl === "/dashboard/sales" ? "current-page" : ""}
	/>
	<!-- <NavbarIcon
		href="/dashboard/supplies"
		icon={Package}
		label="Provisiones"
		className={currentUrl === "/dashboard/supplies" ? "current-page" : ""}
	/> -->
	<NavbarIcon
		href="/dashboard/providers"
		icon={Car}
		label="Proveedores"
		className={currentUrl === "/dashboard/providers" ? "current-page" : ""}
	/>
	<NavbarIcon
		href="/dashboard/waiters"
		icon={Group}
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
