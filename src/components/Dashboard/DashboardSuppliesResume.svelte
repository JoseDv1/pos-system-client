<script>
	import { lastDaysSupplies, totalSuppliesAmount } from "@/services/supplies";
	import { moneyFormater } from "@/services/utils";
	$lastDaysSupplies;
</script>

<article>
	<h1>
		Total Gastos del dia: {moneyFormater.format($totalSuppliesAmount)}
	</h1>
	<section>
		<canvas id="suppliesChart"></canvas>
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
