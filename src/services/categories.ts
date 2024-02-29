import type { Category } from "@/types";
import { API_URL } from "@/services/constants";
import { writable } from "svelte/store";
import { loading } from "@/services/stores";
import { createToast } from "@/services/utils";


type CreateCategoryData = {
	name: string;
	description: string;
}

export const categories = writable<Category[]>([]);

// Fetch categories on load
export const fetchCategoriesService = (async () => {
	try {
		loading.set(true);
		const response = await fetch(`${API_URL}/categories?products=true`);
		const data = await response.json();
		categories.set(data);
		return data;
	} catch (error) {
		createToast("Error al consultar las categorias", "error");
	} finally {
		loading.set(false);
	}
})();

export const addCategoryService = async (categoryData: CreateCategoryData) => {
	try {
		const response = await fetch(`${API_URL}/categories`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(categoryData),
		});
		const data = await response.json();
		categories.update((items) => [...items, data]);
		return data;
	} catch (error) {
		createToast("Fallo al crear la categoría", "error");
	}
}

export const updateCategoryService = async (categoryId: string, categoryData: CreateCategoryData) => {

	try {
		const response = await fetch(`${API_URL}/categories/${categoryId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(categoryData),
		});
		const data = await response.json();
		categories.update((prevCategories) => {
			const updatedCategories = prevCategories.map((category) => {
				if (category.id === data.id) {
					return data;
				}

				return category;
			});
			return updatedCategories;
		})

		return data;
	} catch (error) {
		createToast("Fallo al Actualizar la categoría", "error");
	}
}

export const deleteCategoryService = async (categoryId: string) => {
	try {
		const response = await fetch(`${API_URL}/categories/${categoryId}`, {
			method: "DELETE",
		});
		const data = await response.json();
		categories.update((prevCategories) => {
			const updatedCategories = prevCategories.filter((category) => category.id !== data.id);
			return updatedCategories;
		})
		return data;
	} catch (error) {
		createToast("Fallo al eliminar la categoría", "error");
	}
}




