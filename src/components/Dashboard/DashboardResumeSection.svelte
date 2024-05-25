<script>
	import { totalSuppliesAmount } from "@/services/supplies";
	import {
		totalSalesAmount,
		totalCardSalesAmount,
		totalCashSalesAmount,
		totalTransferSalesAmount,
	} from "@/services/sales";
	import { moneyFormater } from "@/services/utils";
</script>

<article>
	<h1>Resumen del Dia</h1>
	<p>Total Ingresos: {moneyFormater.format($totalSalesAmount)}</p>
	<ul>
		<li>Total Efectivo: {moneyFormater.format($totalCashSalesAmount)}</li>
		<li>Total Tarjeta: {moneyFormater.format($totalCardSalesAmount)}</li>
		<li>
			Total Transferencia: {moneyFormater.format($totalTransferSalesAmount)}
		</li>
	</ul>

	<p>Total Egresos: {moneyFormater.format($totalSuppliesAmount)}</p>

	{#if $totalSalesAmount - $totalSuppliesAmount < 0}
		<p class="lose">
			Total Perdidas: {moneyFormater.format(
				($totalSalesAmount - $totalSuppliesAmount) * -1
			)}
		</p>
	{:else}
		<p class="win">
			Total Ganancias: {moneyFormater.format(
				$totalSalesAmount - $totalSuppliesAmount
			)}
		</p>
	{/if}
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
		gap: 1rem;
		align-items: start;
		font-size: 1.5rem;
	}

	.win {
		color: var(--success);
	}

	.lose {
		color: var(--danger);
	}
</style>
