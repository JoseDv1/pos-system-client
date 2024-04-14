<script>
	export let supplyId;
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";
	import { parseId } from "@/services/utils";
</script>

<header>
	<h1>Detalle de la factura {parseId(supplyId)}</h1>
	<button
		class="btn-edit"
		popovertarget="create-product-on-supply-dialog"
		popovertargetaction="show"
	>
		{@html PlusIcon}
		Agregar Producto
	</button>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color);
		padding: 1rem 2rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}
	header button {
		display: flex;
		align-items: center;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
	}
</style>
