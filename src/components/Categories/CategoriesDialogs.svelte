<script>
	import AddCategoryForm from "./AddCategoryForm.svelte";
	import DetailsCategory from "./DetailsCategory.svelte";

	export let createCategoryEvent;
	export let closeDetailCategoryDialog;
	export let openCategory;
	export let updateCategoryEvent;
</script>

<dialog popover id="add-category-dialog" class="add">
	<AddCategoryForm {createCategoryEvent} />
</dialog>

<dialog id="detail-category-dialog" on:blur={() => closeDetailCategoryDialog()}>
	<DetailsCategory
		{closeDetailCategoryDialog}
		{openCategory}
		{updateCategoryEvent}
	/>
</dialog>

<style>
	dialog {
		z-index: 100;
		border-radius: var(--radius);
		padding: 1rem;
	}

	.add {
		width: 100%;
		max-width: 500px;
		border: 2px solid black;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	#detail-category-dialog {
		border: none;
		width: 100%;
		height: 100dvh;
		right: 0;
		inset-inline-start: unset;
		overflow: initial;
		max-width: 500px;
		max-height: 100dvh;
		top: 0;
	}
</style>
