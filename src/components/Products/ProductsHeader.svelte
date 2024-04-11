<script lang="ts">
	import { search } from "@/services/products";
	import { generateReport, products } from "@/services/products";

	import FileIcon from "@/assets/svgs/bx-file.svg?raw";
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";
	import SortDownIcon from "@/assets/svgs/bx-sort-down.svg?raw";
	import SortUpIcon from "@/assets/svgs/bx-sort-up.svg?raw";

	export let filterOrderDesc: boolean;
	export let filterByKey: (key: string) => void;
	export let filterkey: string;
	export let toggleOrder: () => void;
</script>

<header>
	<h1>Lista de productos</h1>

	<!-- svelte-ignore component-name-lowercase -->
	<search>
		<input
			type="text"
			bind:value={$search}
			placeholder="Buscar productos..."
			autocomplete="off"
		/>
	</search>

	<div>
		<button on:click={() => generateReport($products)}>
			{@html FileIcon}
			Generar Reporte
		</button>

		<button
			on:click={() => {
				toggleOrder();
				filterByKey(filterkey);
			}}
		>
			{#if filterOrderDesc}
				{@html SortDownIcon}
				Orden Descendente
			{:else}
				{@html SortUpIcon}
				Orden Ascendente
			{/if}
		</button>

		<button popovertarget="add-product-dialog" popovertargetaction="show">
			{@html PlusIcon}
			Añadir Producto
		</button>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: var(--color);
		border-radius: var(--radius);
		gap: 1rem;
		width: 100%;
	}

	header div {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1rem;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	search {
		flex: 1;
	}

	search input {
		width: 100%;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: var(--radius);
		background-color: var(--accent);
		font-size: 1.2rem;
	}

	search input:focus {
		outline: none;
	}
</style>
