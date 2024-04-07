<script lang="ts">
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";
</script>

<header>
	<h1>Categorias</h1>
	<button popovertarget="add-category-dialog" popovertargetaction="show">
		{@html PlusIcon}
		Añadir Categoria
	</button>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: var(--color);
		border-radius: var(--radius);
	}

	header h1 {
		font-size: 2rem;
	}

	header button {
		padding: 0.5rem 1rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
	}
</style>
