export interface Product {
	id: string;
	name: string;
	price: number;
	stock: number;
	updatedAt: string;
	categoryId: string;
	category: Category;
}

export interface Category {
	id: string;
	name: string;
	description: string;
}