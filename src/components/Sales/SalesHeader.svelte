<script>
	import {
		createSaleService,
		searchDate,
		clientsFilter,
		totalSalesCount,
		totalSalesAmount,
		pendingSalesCount,
		totalClientSalesCount,
		totalClientSalesAmount,
		pendingSalesCountByClient,
	} from "@/services/sales";
	import { clients } from "@/services/clients";
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";
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
		<div>
			<button
				class="btn-edit"
				on:click={async () => {
					await createSaleService($clientsFilter);
				}}
			>
				{@html PlusIcon}
				Agregar
			</button>
		</div>
	</section>
	<footer>
		<div>
			<p>
				<b>Conteo Dia: </b>
				{$totalSalesCount < 100 ? `00${$totalSalesCount}` : $totalSalesCount}
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
			<p><b>Conteo Cliente: </b> {$totalClientSalesCount}</p>
			<p>
				<b>Total Cliente: </b>
				{new Intl.NumberFormat("es-CO", {
					style: "currency",
					currency: "COP",
				}).format($totalClientSalesAmount)}
			</p>
			<p><b>Pendientes Cliente: </b> {$pendingSalesCountByClient}</p>
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

	header section button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
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
	}

	header section search select option {
		padding: 0.5rem;
	}

	header footer {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}

	header footer div {
		display: flex;
		gap: 0.5rem;
		flex: 1;
		justify-content: space-around;
	}
</style>
