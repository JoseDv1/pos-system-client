<script>
	import { totalSalesAmount, lastDaysSales } from "@/services/sales";
	$lastDaysSales;
</script>

<article>
	<h1>
		Total de ventas del dia: {new Intl.NumberFormat("es-CO", {
			style: "currency",
			currency: "COP",
		}).format($totalSalesAmount)}
	</h1>

	<section>
		<canvas id="salesChart"></canvas>
	</section>
</article>

<style>
	article {
		background-color: var(--color);
		padding: 1rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: start;
		font-size: 2rem;
	}

	section {
		width: 100%;
	}
</style>
