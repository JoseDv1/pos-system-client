export interface Product {
	id: string;
	name: string;
	price: number;
	stock: number;
	updatedAt: string;
	categoryId: string;
	category: Category;
	isRawMaterial: boolean;
}

export interface Category {
	id: string;
	name: string;
	description: string;
}

export interface Provider {
	id: string;
	name: string;
	phone: string;
	supplyDays: string;
}

export interface Client {
	id: string
	name: string
	address: string?;
	email: string?;
}

export interface Sale {
	id: string;
	clientId: string;
	createdAt: string;
	totalCost: number;
	status: "PENDING" | "PAYED";
	paymentMethod: "CASH" | "CARD" | "TRANSFER";
	client: Client;
	saleProducts: SaleProduct[]?;
}

export interface SaleProduct {
	productId: string;
	saleId: string;
	quantity: number;
	unitCost: number;
	product: Product;
	sale: Sale;
}