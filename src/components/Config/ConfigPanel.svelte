<script>
	import { darkMode, fastSale } from "@/services/configs";
	import { API_URL } from "@/services/constants";

	const getGHCommit = async () => {
		const res = await fetch(
			"https://api.github.com/repos/JoseDv1/pos-system-client/commits"
		);

		if (!res.ok) return "Error";
		const data = await res.json();
		return data[0].sha;
	};
	const getGHAPICommit = async () => {
		const res = await fetch(
			"https://api.github.com/repos/JoseDv1/pos-system-server/commits"
		);

		if (!res.ok) return "Error";

		const data = await res.json();
		return data[0].sha;
	};
	const getAPIversion = async () => {
		const res = await fetch(`${API_URL}/version`);
		const data = await res.text();
		return data;
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
	<article>
		<p class="version">
			Aplication Version: {__COMMIT_HASH__.slice(0, 7)}
			{#await getGHCommit() then commit}
				{#if commit == "Error"}
					(403 Error)
				{:else if commit != __COMMIT_HASH__}
					(Update Available)
				{:else}
					(latest)
				{/if}
			{/await}
		</p>
		<p class="version">
			{#await getAPIversion() then version}
				{@const slice = version.slice(0, 7)}
				Server Version: {slice}
				{#await getGHAPICommit() then commit}
					{#if commit == "Error"}
						(403 Error)
					{:else if commit.slice(0, 7) != slice}
						(Update Available)
					{:else}
						(latest)
					{/if}
				{/await}
			{/await}
		</p>
	</article>
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

	article {
		font-size: 0.75rem;
		color: var(--color-text);
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
</style>
