import type { Product } from "@/types";

export const fetchProducts = async (): Promise<Product[]> => {
	const res = await fetch("http://localhost:3000/api/products?category=true");
	const data = await res.json();
	return data;
};


