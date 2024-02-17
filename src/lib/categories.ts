import type { Category } from "@/types";

export const fetchCategories = async (): Promise<Category[]> => {
	const response = await fetch('http://localhost:3000/api/categories');
	const data = await response.json();
	return data;
}