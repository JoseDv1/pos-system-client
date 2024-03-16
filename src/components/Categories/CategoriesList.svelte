<script>
	import { categories } from "@/services/categories";
	import { loading } from "@/services/stores";

	export let openDetailCategoryDialog;
</script>

<section>
	{#if $loading}
		<p>Loading...</p>
	{:else}
		{#each $categories as category}
			<article>
				<h1>{category?.name}</h1>
				<p>
					{category?.description}
				</p>
				<button on:click={() => openDetailCategoryDialog(category.id)}>
					Ver Productos</button
				>
			</article>
		{/each}
	{/if}
</section>

<style>
	article h1 {
		text-wrap: wrap;
	}

	article {
		background-color: var(--color);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		border-radius: var(--radius);
	}

	article button {
		align-self: end;
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border-radius: var(--radius);
		border: none;
		margin-top: 0.5rem;
	}
	article p {
		flex: 1;
	}
	section {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
