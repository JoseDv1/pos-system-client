<script lang="ts">
	import { deleteCategoryService } from "@/services/categories";

	export let closeDetailCategoryDialog: any;
	export let openCategory: any;
	export let updateCategoryEvent: any;
	openCategory.products = [];
</script>

<div>
	<span
		on:click={() => closeDetailCategoryDialog()}
		on:keydown={(e) => e.key === "Q" && closeDetailCategoryDialog()}
		tabindex="0"
		role="button"
		aria-label="Close dialog">&times;</span
	>

	<header>
		<section>
			<h1 id="editable-category-name">{openCategory?.name}</h1>
			<div>
				<button class="btn-edit" on:click={updateCategoryEvent}>Editar</button>
				<button
					class="btn-delete"
					on:click={() => {
						if (confirm("¿Estás seguro de eliminar esta categoría?")) {
							deleteCategoryService(openCategory.id);
							closeDetailCategoryDialog();
						}
					}}>Eliminar</button
				>
			</div>
		</section>
		<p id="editable-category-description">{openCategory?.description}</p>
	</header>

	<table>
		<tr>
			<th>Nombre</th>
			<th>Stock</th>
		</tr>

		{#if openCategory?.products}
			{#each openCategory?.products as product}
				<tr>
					<td>{product?.name}</td>
					<td>{product?.stock}</td>
				</tr>
			{/each}
		{/if}
	</table>
</div>

<style>
	span {
		cursor: pointer;
	}

	header {
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	header p {
		margin-bottom: 1rem;
	}

	header section {
		display: flex;
		justify-content: space-between;
	}

	header section div {
		display: flex;
		align-self: flex-end;
		justify-content: start;
		gap: 1rem;
	}

	header section h1 {
		flex-grow: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 50%;
	}

	header div button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #f2f2f2;
		color: white;

		&.btn-edit {
			background-color: var(--primary);
		}

		&.btn-delete {
			background-color: var(--danger);
		}
	}

	table {
		width: 100%;
	}

	th {
		background-color: #f2f2f2;
	}

	th,
	td {
		text-align: left;
		padding: 0.5rem;
	}

	:global(.editing) {
		color: gray;
	}
</style>
