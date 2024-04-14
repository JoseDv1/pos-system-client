<script>
	export let supplyId;
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";
	import { API_URL } from "@/services/constants";
	import { moneyFormater, parseId, parseIsoDate } from "@/services/utils";

	const getSupply = async () => {
		const response = await fetch(`${API_URL}/supplies/${supplyId}`);
		const supply = await response.json();
		return supply;
	};
</script>

<header>
	<section>
		<h1>Detalle de la factura #{parseId(supplyId)}</h1>
		<button
			class="btn-edit"
			popovertarget="create-product-on-supply-dialog"
			popovertargetaction="show"
		>
			{@html PlusIcon}
			Agregar Producto
		</button>
	</section>
	<footer>
		{#await getSupply() then supply}
			<p>Fecha: {parseIsoDate(supply.date)}</p>
			<p>Proveedor: {supply.provider.name}</p>
			<p>Total: {moneyFormater.format(supply.totalCost)}</p>
		{/await}
	</footer>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: var(--color);
		padding: 1rem 2rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}

	section {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	section button {
		display: flex;
		align-items: center;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
	}

	footer {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: space-between;
	}
</style>
