<script lang="ts">
	import AddProductForm from "./AddProductForm.svelte";
	import EditProductForm from "./EditProductForm.svelte";
</script>

<dialog id="edit-product-dialog">
	<EditProductForm />
</dialog>

<dialog id="add-product-dialog" popover="auto">
	<AddProductForm />
</dialog>

<style>
	dialog {
		width: 100%;
		max-width: 500px;
		border: 2px solid black;
		border-radius: var(--radius);
		padding: 1rem;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}
</style>
