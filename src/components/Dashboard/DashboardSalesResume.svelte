<script>
	import {
		totalSalesCount,
		totalSalesAmount,
		searchDate,
	} from "@/services/sales";
</script>

<article>
	<h2>Resumen de las ventas</h2>

	<p>
		Ventas de: <input type="date" bind:value={$searchDate} />
	</p>
	<p>Cantidad: {$totalSalesCount}</p>
	<p>
		Total: {new Intl.NumberFormat("es-CO", {
			style: "currency",
			currency: "COP",
		}).format($totalSalesAmount)}
	</p>
</article>

<style>
	article {
		background-color: white;
		padding: 1rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	article h2 {
		text-align: center;
		margin-bottom: 0.5rem;
	}

	input[type="date"] {
		padding: 0.5rem;
		border-radius: var(--radius);
		border: 1px solid var(--light75);
	}
</style>
