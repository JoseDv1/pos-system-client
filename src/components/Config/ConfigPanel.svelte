<script>
	import { darkMode, fastSale } from "@/services/configs";
</script>

<section>
	<label>
		Modo Oscuro:
		<input type="checkbox" bind:checked={$darkMode} />
	</label>

	<label>
		Venta Rapida:
		<input type="checkbox" bind:checked={$fastSale} />
	</label>
</section>

<style>
	section {
		background-color: var(--color);
		padding: 1rem;
		border-radius: var(--radius);
		min-height: 50dvh;
		font-size: 1.5rem;
	}

	label {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		gap: 1rem;
	}
</style>
