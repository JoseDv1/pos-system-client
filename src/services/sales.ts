import { API_URL } from "./constants";
import { derived, writable } from "svelte/store";
import { loading } from "./stores";
import { createToast } from "./utils";
import type { Sale } from "@/types";


export const sales = writable<Sale[]>([]);
export const clientsFilter = writable<string>("");
export const searchDate = writable<string>(new Date().toISOString().split("T")[0]);

export const filteredSales = derived([sales, clientsFilter, searchDate], ([$sales, $clientsFilter, $searchDate]) => {
	const filtered = $sales.filter((sale) => {
		const clientMatch = $clientsFilter ? sale.clientId === $clientsFilter : true
		const dateMatch = sale.createdAt.split("T")[0] === $searchDate
		return clientMatch && dateMatch;
	});
	return filtered;
});

export const filteredSaleByDate = derived([sales, searchDate], ([$sales, $searchDate]) => {
	const filtered = $sales.filter((sale) => {
		const dateMatch = sale.createdAt.split("T")[0] === $searchDate
		return dateMatch;
	});
	return filtered;
});

export const totalClientSalesCount = derived([filteredSales], ([$filteredSales]) => {
	const total = $filteredSales.length;
	return total;
});

export const totalClientSalesAmount = derived([filteredSales], ([$filteredSales]) => {
	const total = $filteredSales.reduce((acc, sale) => acc + sale.totalCost, 0);
	return total;
});

export const totalSalesCount = derived([filteredSaleByDate], ([$filteredSaleByDate]) => {
	const total = $filteredSaleByDate.length;
	return total;
});

export const totalSalesAmount = derived([filteredSaleByDate], ([$filteredSaleByDate]) => {
	const total = $filteredSaleByDate.reduce((acc, sale) => acc + sale.totalCost, 0);
	return total;
});

export const pendingSalesCount = derived([filteredSaleByDate], ([$filteredSaleByDate]) => {
	const total = $filteredSaleByDate.filter((sale) => sale.status === "PENDING").length;
	return total;
});

export const pendingSalesCountByClient = derived([filteredSales], ([$filteredSales]) => {
	const total = $filteredSales.filter((sale) => sale.status === "PENDING").length;
	return total;
});

export const pendingSalesAmount = derived([filteredSaleByDate], ([$filteredSaleByDate]) => {
	const total = $filteredSaleByDate.filter((sale) => sale.status === "PENDING").reduce((acc, sale) => acc + sale.totalCost, 0);
	return total;
});

export const pendingSalesAmountByClient = derived([filteredSales], ([$filteredSales]) => {
	const total = $filteredSales.filter((sale) => sale.status === "PENDING").reduce((acc, sale) => acc + sale.totalCost, 0);
	return total;
});


// Services
export const fetchSalesService = (async () => {
	try {
		loading.set(true);
		const response = await fetch(`${API_URL}/sales`);
		const data = await response.json();
		sales.set(data);
		return data;
	} catch (error) {
		createToast("Error al consultar las ventas", "error");
	} finally {
		loading.set(false);
	}
})()

export const createSaleService = async (clientId: string) => {
	try {

		const response = await fetch(`${API_URL}/sales`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				clientId,
			}),
		});
		const data = await response.json();
		// Add to state 
		sales.update((prevSales) => {
			return [data, ...prevSales];
		});

		return data;
	} catch (error) {
		createToast("Error al crear la venta", "error");
	}
}

export const deleteSaleService = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/sales/${id}`, {
			method: "DELETE",
		});
		const data = await response.json();
		// Remove from state
		sales.update((prevSales) => {
			return prevSales.filter((sale) => sale.id !== id);
		});
		return data;
	} catch (error) {
		createToast("Error al eliminar la venta", "error");
	}
}

export const markSaleAsPaidService = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/sales/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: "PAYED",
			}),
		});
		const data = await response.json();

		// Update state
		sales.update((prevSales) => {
			return prevSales.map((sale) => {
				if (sale.id === id) {
					return { ...sale, status: "PAYED" };
				}
				return sale;
			});
		});
		return data;
	} catch (error) {
		createToast("Error al marcar la venta como pagada", "error");
	}
}