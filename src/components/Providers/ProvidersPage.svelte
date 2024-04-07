<script>
	import ProvidersTable from "./ProvidersTable.svelte";
	import AddProviderDialog from "./AddProviderDialog.svelte";
	import EditProviderDialog from "./EditProviderDialog.svelte";

	import PlusIcon from "@/assets/svgs/bx-plus.svg?raw";
</script>

<main>
	<header>
		<h1>Proveedores</h1>

		<!-- Actions -->
		<div>
			<button
				class="btn-edit"
				popovertarget="add-provider-dialog"
				popovertargetaction="show"
			>
				{@html PlusIcon}
				Agregar</button
			>
		</div>
	</header>

	<ProvidersTable />

	<dialog id="add-provider-dialog" popover="auto">
		<AddProviderDialog />
	</dialog>
	<dialog id="edit-provider-dialog">
		<EditProviderDialog />
	</dialog>
</main>

<style>
	main {
		padding: 1rem 2rem;
	}

	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	main header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: var(--color);
		border-radius: var(--radius);
	}

	main header h1 {
		font-size: 2rem;
	}

	main header button {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 0.5rem;
	}
</style>
