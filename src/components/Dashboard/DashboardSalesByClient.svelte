<script>
	import { clients } from "@/services/clients";
	import { filteredSales } from "@/services/sales";
</script>

<article>
	<h2>Ventas por mesero</h2>
	<table>
		<thead>
			<th>Mesero</th>
			<th>Ventas</th>
			<th>Total</th>
		</thead>
		<tbody>
			{#each $clients as waiter}
				<tr>
					<td>{waiter.name}</td>
					<td>
						{$filteredSales.filter((sale) => sale.clientId === waiter.id)
							.length}
					</td>
					<td>
						{new Intl.NumberFormat("es-CO", {
							style: "currency",
							currency: "COP",
						}).format(
							$filteredSales
								.filter((sale) => sale.clientId === waiter.id)
								.reduce((acc, sale) => acc + sale.totalCost, 0)
						)}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</article>

<style>
	article {
		background-color: var(--color);
		padding: 1rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
		width: fit-content;
	}

	article h2 {
		margin-bottom: 1rem;
		text-align: center;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding-inline: 1rem;
		border: 1px solid black;
	}
</style>
