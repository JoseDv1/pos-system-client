<script lang="ts">
	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";

	const openAddDialog = () => {
		const dialog = document.getElementById(
			"add-client-dialog"
		) as HTMLDialogElement;
		dialog.showModal();
	};
</script>

<header>
	<h1>Meseros</h1>

	<button class="btn-edit" on:click={() => openAddDialog()}>
		{@html PlusIcon}
		Agregar
	</button>
</header>

<style>
	header {
		display: flex;
		background-color: var(--color);
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		gap: 1rem;
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}

	header button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
