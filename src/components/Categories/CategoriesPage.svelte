<script lang="ts">
	import { createToast } from "@/lib/showToast";

	import { onMount } from "svelte";
	import CategoriesList from "./CategoriesList.svelte";
	import CategoriesHeader from "./CategoriesHeader.svelte";
	import CategoriesDialogs from "./CategoriesDialogs.svelte";

	let categories: any[] = [];
	let loading = true;
	let openCategory: any = {};

	// ---- State Events ----
	// Get categories from the server
	onMount(async () => {
		try {
			const res = await fetch(
				"http://localhost:3000/api/categories?products=true"
			);
			const data = await res.json();
			categories = data;
		} catch (e: any) {
			createToast(e.message, "error");
		} finally {
			loading = false;
		}
	});

	// Create Category
	const createCategory = (category: { name: string; description: string }) => {
		try {
			// Add Category to the server
			const res = fetch("http://localhost:3000/api/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(category),
			});

			// Add Category to the state
			categories = [category, ...categories];
		} catch (error: any) {
			createToast(error.message, "error");
		}
	};

	const createCategoryEvent = (e: SubmitEvent) => {
		const $form = e.target as HTMLFormElement;
		const formData = new FormData($form);

		const category = {
			name: formData.get("add-category-name") as string,
			description: formData.get("add-category-description") as string,
		};

		createCategory(category);
		$form.reset();
		closeCreateCategoryDialog();
	};

	// TODO: Update Category Function doesn't work properly
	// Update Category
	const updateCategory = (data: any, id: string) => {
		try {
			// Update Category to the server
			const res = fetch(`http://localhost:3000/api/categories/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// Update Category to the state
			categories = categories.map((category) => {
				if (category.id === id) {
					return { ...category, ...data };
				}
				return category;
			});
		} catch (error: any) {
			createToast(error.message, "error");
		}
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
			const name = _name.textContent;
			const description = _description.textContent;

			// Update the category
			updateCategory({ name, description }, openCategory.id);
			_name.classList.remove("editing");
			_description.classList.remove("editing");

			_dialog.removeEventListener("close", editFunction);
		};

		_dialog.addEventListener("close", editFunction);
	};

	// Delete Category
	const deleteCategory = (id: string) => {
		try {
			// Delete Category to the server
			const res = fetch(`http://localhost:3000/api/categories/${id}`, {
				method: "DELETE",
			});
			const deletedCategory = categories.find((category) => category.id === id);
			// Delete Category to the state
			categories = categories.filter((category) => category.id !== id);
			closeDetailCategoryDialog();
			createToast(
				`Categoria ${deletedCategory.name} Eliminado Correctamente`,
				"error"
			);
		} catch (error: any) {
			createToast(error.message, "error");
		}
	};

	// ---- Dialog Events ----
	const openCreateCategoryDialog = () => {
		const $dialog = document.getElementById(
			"add-category-dialog"
		) as HTMLDialogElement;
		$dialog!.showModal();
	};

	const closeCreateCategoryDialog = () => {
		const $dialog = document.getElementById(
			"add-category-dialog"
		) as HTMLDialogElement;
		$dialog.close();
	};

	const openDetailCategoryDialog = (id: String) => {
		const $dialog = document.getElementById(
			"detail-category-dialog"
		) as HTMLDialogElement;
		$dialog.showModal();

		openCategory = categories.find((category) => category.id === id);
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
	<CategoriesHeader {openCreateCategoryDialog} />
	<CategoriesDialogs
		{closeCreateCategoryDialog}
		{createCategoryEvent}
		{closeDetailCategoryDialog}
		{openCategory}
		{updateCategoryEvent}
		{deleteCategory}
	/>
	<CategoriesList {categories} {loading} {openDetailCategoryDialog} />
</div>

<style>
	div.page {
		padding: 1rem;
	}
</style>
