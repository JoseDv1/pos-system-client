<script>
	import { darkMode, fastSale } from "@/services/configs";

	const getGHCommit = async () => {
		const res = await fetch(
			"https://api.github.com/repos/JoseDv1/pos-system-client/commits"
		);
		const data = await res.json();
		return data[0].sha;
	};
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

	<!-- svelte-ignore missing-declaration -->
	<p class="version">
		Aplication Version: {__COMMIT_HASH__.slice(0, 7)}
		{#await getGHCommit() then commit}
			{#if commit !== __COMMIT_HASH__}
				(Update Available)
			{:else}
				(latest)
			{/if}
		{/await}
	</p>
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

	.version {
		font-size: 0.75rem;
		color: var(--color-text);
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
</style>
