<script lang="ts">
	import { search } from "@/services/products";
	import { generateReport, products } from "@/services/products";

	export let filterOrderDesc: boolean;
	export let filterByKey: (key: string) => void;
	export let filterkey: string;
	export let toggleOrder: () => void;
	// Dialogs
	const openCreateDialog = () => {
		const $dialog: HTMLDialogElement = document.getElementById(
			"add-product-dialog"
		) as HTMLDialogElement;
		$dialog!.showModal();
	};
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
			<box-icon name="file" color="currentColor"></box-icon> Generar Reporte
		</button>

		<button
			on:click={() => {
				toggleOrder();
				filterByKey(filterkey);
			}}
		>
			{#if filterOrderDesc}
				<box-icon name="sort-down" type="solid" color="currentColor"></box-icon>
				Orden Descendente
			{:else}
				<box-icon name="sort-up" type="solid" color="currentColor"></box-icon>
				Orden Ascendente
			{/if}
		</button>

		<button on:click={openCreateDialog}>
			<box-icon name="plus" color="currentColor"></box-icon> Añadir Producto
		</button>
	</div>
</header>

<style>
	header div {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: white;
		border-radius: var(--radius);
		gap: 1rem;
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
		background-color: var(--light);
		font-size: 1.2rem;
	}

	search input:focus {
		outline: none;
	}
</style>
