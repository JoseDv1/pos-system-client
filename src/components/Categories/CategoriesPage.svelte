<script lang="ts">
	import { onMount } from "svelte";
	import CategoriesList from "./CategoriesList.svelte";
	import CategoriesHeader from "./CategoriesHeader.svelte";
	import CategoriesDialogs from "./CategoriesDialogs.svelte";
	import {
		addCategoryService,
		updateCategoryService,
		categories,
	} from "@/services/categories";

	let openCategory: any = {};

	// ---- Events ----
	const createCategoryEvent = (e: SubmitEvent) => {
		const $form = e.target as HTMLFormElement;
		const formData = new FormData($form);
		const category = {
			name: formData.get("add-category-name") as string,
			description: formData.get("add-category-description") as string,
		};

		addCategoryService(category);

		$form.reset();

		let dialog = (
			document.getElementById("add-category-dialog") as HTMLDialogElement
		).close();
	};

	const updateCategoryEvent = (e: PointerEvent) => {
		if (openCategory.id === undefined) {
			return;
		}

		// Get the elements to edit
		const _name = document.getElementById(
			"editable-category-name"
		) as HTMLElement;

		const _description = document.getElementById(
			"editable-category-description"
		) as HTMLElement;

		const _dialog = document.getElementById(
			"detail-category-dialog"
		) as HTMLDialogElement;

		// Set the contenteditable attribute to true
		_name.setAttribute("contenteditable", "true");
		_description.setAttribute("contenteditable", "true");
		_name.classList.add("editing");
		_description.classList.add("editing");

		const editFunction = (e: Event) => {
			// Set the contenteditable attribute to falseq
			_name.setAttribute("contenteditable", "false");
			_description.setAttribute("contenteditable", "false");

			// Get the new values
			const name = _name.textContent as string;
			const description = _description.textContent as string;

			// Update the category
			updateCategoryService(openCategory.id, {
				name,
				description,
			});
			_name.classList.remove("editing");
			_description.classList.remove("editing");

			_dialog.removeEventListener("close", editFunction);
		};

		_dialog.addEventListener("close", editFunction);
	};

	// ---- Dialogs ----
	const openDetailCategoryDialog = (id: String) => {
		const $dialog = document.getElementById(
			"detail-category-dialog"
		) as HTMLDialogElement;
		$dialog.showModal();

		categories.subscribe((value) => {
			openCategory = value.find((category) => category.id === id);
		});
	};

	const closeDetailCategoryDialog = () => {
		const $dialog = document.getElementById(
			"detail-category-dialog"
		) as HTMLDialogElement;
		$dialog.close();

		openCategory = {};
	};
</script>

<div class="page">
	<CategoriesHeader />
	<CategoriesDialogs
		{createCategoryEvent}
		{closeDetailCategoryDialog}
		{openCategory}
		{updateCategoryEvent}
	/>
	<CategoriesList {openDetailCategoryDialog} />
</div>

<style>
	div.page {
		padding: 1rem 2rem;
	}
</style>
