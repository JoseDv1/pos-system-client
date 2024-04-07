<script>
	import AddProductOnSaleForm from "./AddProductOnSaleForm.svelte";
	import EditProductOnsaleForm from "./EditProductOnsaleForm.svelte";
</script>

<dialog id="add-product-on-sale-dialog" popover="auto">
	<AddProductOnSaleForm />
</dialog>
<dialog id="edit-product-on-sale-dialog">
	<EditProductOnsaleForm />
</dialog>

<style>
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: fixed;
		z-index: 100;
		border: 2px solid #000;
		border-radius: var(--radius);
		width: clamp(500px, 80%, 800px);
		max-height: 80dvh;
	}

	dialog#edit-product-on-sale-dialog {
		width: clamp(300px, 80%, 500px);
	}
</style>
