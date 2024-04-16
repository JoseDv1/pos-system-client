<script>
	import {
		providersFilter,
		createSupply,
		totalSuppliesAmount,
	} from "@/services/supplies";
	import { searchDate } from "@/services/stores";
	import { providers } from "@/services/providers";
	import { slide } from "svelte/transition";
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";
</script>

<header>
	<section>
		<h1>Provisiones y facturas</h1>
		<search>
			<input
				type="date"
				name="fecha"
				id="search-date"
				autocomplete="off"
				bind:value={$searchDate}
			/>

			<select name="Supply" id="client-select" bind:value={$providersFilter}>
				<option value="" selected>Todos</option>
				{#each $providers as provider}
					<option value={provider.id}>{provider.name}</option>
				{/each}
			</select>
		</search>
		{#if $providersFilter !== "" && $searchDate == new Date()
					.toISOString()
					.split("T")[0]}
			<div
				class="actions"
				transition:slide={{
					axis: "x",
				}}
			>
				<button
					class="btn-edit"
					on:click={async () => {
						await createSupply($providersFilter);
					}}
				>
					{@html PlusIcon}
					Agregar
				</button>
			</div>
		{/if}
	</section>
	<footer>
		<div>
			<p>
				<b>Total Gastos Dia: </b>
				{new Intl.NumberFormat("es-CO", {
					style: "currency",
					currency: "COP",
				}).format($totalSuppliesAmount)}
			</p>
		</div>
	</footer>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		background-color: var(--color);
		padding: 1rem;
		border-radius: var(--radius);
		gap: 1rem;
		margin-bottom: 1rem;
	}

	header section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	header section search {
		flex: 1;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: bold;
	}

	header section .actions {
		display: flex;
		gap: 1rem;
	}

	header section search {
		display: flex;
		gap: 1rem;
	}

	header section search input {
		padding: 0.5rem;
		background-color: var(--accent);
		border-radius: var(--radius);
		width: 100%;
		border: 0;
	}

	header section search select {
		padding: 0.5rem;
		background-color: var(--accent);
		border-radius: var(--radius);
		border: 0;
		flex-shrink: 0;
		min-width: 150px;
		font-size: 1rem;
	}

	header section search select option {
		padding: 0.5rem;
	}

	/* header footer {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
	} */

	header footer div {
		display: flex;
		gap: 1rem;
	}
</style>
