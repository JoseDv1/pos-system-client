<script>
	import {
		createSaleService,
		searchDate,
		clientsFilter,
		totalSalesAmount,
		pendingSalesCount,
		totalClientSalesAmount,
		pendingSalesCountByClient,
		pendingSalesAmount,
		pendingSalesAmountByClient,
		markAllSalesAsPaidByClientService,
		filteredSales,
	} from "@/services/sales";
	import { clients } from "@/services/clients";
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";

	import paidIcon from "@/assets/svgs/bx-money-withdraw.svg?raw";
	import { slide } from "svelte/transition";
</script>

<header>
	<section>
		<h1>Ventas y pedidos</h1>
		<search>
			<input
				type="date"
				name="fecha"
				id="search-date"
				autocomplete="off"
				bind:value={$searchDate}
			/>

			<select name="Client" id="client-select" bind:value={$clientsFilter}>
				<option value="" selected>Todos</option>
				{#each $clients as client}
					<option value={client.id}>{client.name}</option>
				{/each}
			</select>
		</search>
		{#if $clientsFilter !== "" && $searchDate == new Date()
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
						await createSaleService($clientsFilter);
					}}
				>
					{@html PlusIcon}
					Agregar
				</button>

				{#if $filteredSales.length > 0}
					<button
						class="btn-success"
						transition:slide={{
							axis: "x",
						}}
						on:click={async () => {
							await markAllSalesAsPaidByClientService($clientsFilter);
						}}
					>
						{@html paidIcon}
						Marcar todo como pagado</button
					>
				{/if}
			</div>
		{/if}
	</section>
	<footer>
		<div>
			<p>
				<b>Pendiente:</b>
				{new Intl.NumberFormat("es-CO", {
					style: "currency",
					currency: "COP",
				}).format($pendingSalesAmount)}
			</p>
			<p>
				<b>Total Dia: </b>
				{new Intl.NumberFormat("es-CO", {
					style: "currency",
					currency: "COP",
				}).format($totalSalesAmount)}
			</p>
			<p><b>Pendientes: </b> {$pendingSalesCount}</p>
		</div>
		<div>
			<p>
				<b>Total Cliente: </b>
				{new Intl.NumberFormat("es-CO", {
					style: "currency",
					currency: "COP",
				}).format($totalClientSalesAmount)}
			</p>
			<p><b>Pendientes Cliente: </b> {$pendingSalesCountByClient}</p>
			<p class="pending-amount">
				<b>Total Pendientes Clientes: </b>
				{new Intl.NumberFormat("es-CO", {
					style: "currency",
					currency: "COP",
				}).format($pendingSalesAmountByClient)}
			</p>
		</div>
	</footer>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		background-color: white;
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
		background-color: var(--light);
		border-radius: var(--radius);
		width: 100%;
		border: 0;
	}

	header section search select {
		padding: 0.5rem;
		background-color: var(--light);
		border-radius: var(--radius);
		border: 0;
		flex-shrink: 0;
	}

	header section search select option {
		padding: 0.5rem;
	}

	header footer {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	header footer div {
		display: flex;
		gap: 1rem;
	}
</style>
