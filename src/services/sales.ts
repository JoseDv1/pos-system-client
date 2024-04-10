import { API_URL } from "./constants";
import { derived, get, writable } from "svelte/store";
import { loading } from "./stores";
import { createToast } from "./utils";
import type { Sale } from "@/types";
import { fastSale } from "./configs";
import { Chart } from "chart.js/auto";

// ---- STATES ----
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

// ---- Dashboard Stats ----
export const lastfiveDaysSales = derived([sales], ([$sales]) => {
	const today = new Date();
	const lastFiveDays = Array.from({ length: 8 }, (_, index) => {
		const date = new Date(today);
		date.setDate(date.getDate() - index);
		return date.toISOString().split("T")[0];
	});

	const sales = lastFiveDays.map((date) => {
		const total = $sales
			.filter((sale) => sale.createdAt.split("T")[0] === date)
			.reduce((acc, sale) => acc + sale.totalCost, 0);
		return { date, total };
	});

	const canvas = document.getElementById("salesChart") as HTMLCanvasElement;
	if (canvas) {
		const ctx = canvas.getContext("2d");
		const labels = sales.map((sale) => sale.date).reverse().map((date) => {
			const dateFormater = new Intl.DateTimeFormat("es-CO", {
				timeZone: "UTC",
				weekday: "long",
			});
			const formatedDate = dateFormater.format(new Date(date));
			// Capitalize the first letter
			return formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
		});
		const data = sales.map((sale) => sale.total).reverse();
		if (ctx) {



			// Create the chart
			const chart = new Chart(ctx, {
				type: "bar",
				data: {
					labels,
					datasets: [
						{
							label: "Ventas",
							data,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: true,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});

		}
	}


	return sales;

});


// ---- CRUD Operations ----
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

export const fetchByidSaleService = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/sales/${id}`);
		const data = await response.json();
		return data;
	} catch (error) {
		createToast("Error al consultar la venta", "error");
	}
}

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

		// Navigate to the new sale if fastSale is enabled
		if (get(fastSale)) {
			window.location.href = `/dashboard/sales/${data.id}`;
		}



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


// ---- Not CRUD Operations ----
export const markSaleAsPaidService = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/sales/${id}/paid`, {
			method: "PUT",
		});
		const data = await response.json();
		// Update state
		sales.update((prevSales) => {
			return prevSales.map((sale) => {
				if (sale.id === data.id) {
					return { ...sale, status: "PAYED" };
				}
				return sale;
			});
		});
	} catch (error) {
		createToast("Error al marcar la venta como pagada", "error");
	}
}

export const markSaleAsPendingService = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/sales/${id}/pending`, {
			method: "PUT",
		});
		const data = await response.json();
		// Update state
		sales.update((prevSales) => {
			return prevSales.map((sale) => {
				if (sale.id === data.id) {
					return { ...sale, status: "PENDING" };
				}
				return sale;
			});
		});
	} catch (error) {
		createToast("Error al marcar la venta como pendiente", "error");
	}
}

export const markAllSalesAsPaidByClientService = async (clientId: string) => {
	try {
		// Update the sales in the database
		const response = await fetch(`${API_URL}/sales/paid/${clientId}`, {
			method: "PUT",
		});
		const data = await response.json(); // This returns the count of updated sales not the updated sales

		// Update state
		sales.update((prevSales) => {
			return prevSales.map((sale) => {
				if (sale.clientId === clientId) {
					return { ...sale, status: "PAYED" };
				}
				return sale;
			});
		});

	}
	catch (error) {
		createToast("Error al marcar todas las ventas como pagadas", "error");
	}
}

export const generateReportByDateService = async (from: string, to: string) => {
	const response = await fetch(
		`http://localhost:3000/api/sales/report?from=${from}&to=${to}`
	);
	const data = await response.json();

	// Create a new window with the report
	const reportWindow = window.open("", "_blank");
	const dateFormater = new Intl.DateTimeFormat("es-CO", {
		timeZone: "UTC",
		day: "2-digit",
		month: "long",
		year: "numeric",

	});
	const moneyFormater = new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
	});

	const totalIncome = data.reduce((acc: number, sale: any) => acc + sale.total, 0);

	const itemsToShow = data.map(({ date, total }: {
		date: string;
		total: number;
	}) => {
		return `
			<tr>
				<td>${dateFormater.format(new Date(date))}</td>
				<td>${moneyFormater.format(total)}</td>
			</tr>
		`
	});

	const reportContent = ` 
	<!DOCTYPE html>
	<html lang="es">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Reporte de ventas</title>
			<style>
				@page {
					size: 80mm 297mm;
					margin: 0;
				}

				:root {
					color-scheme: light;

				}
	
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
					position: relative;
					font-family: system-ui, sans-serif;
				}
	
				body {
					max-width: 80mm;
					padding: 0.5rem;
				}

				header {
					margin-bottom: 1rem;
				}

				table {
					width: 100%;
					border-collapse: collapse;
				}

				th, td {
					text-align: left;
				}

				th {
					padding: 8px;
				}
			</style>
		</head>
		<body>
			<header>
				<h1>Reporte de ventas</h1>
				<p>Periodo: ${dateFormater.format(new Date(from))} - ${dateFormater.format(new Date(to))}</p>
				<p>Total de ventas: ${moneyFormater.format(totalIncome)}</p>
			</header>
	
			<main>
				<section>
					<h2>Ingresos Diarios</h2>
					<table>
						<thead>
							<tr>
								<th>Fecha</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							${itemsToShow.join("")}
						</tbody>
					</table>
				</section>
	
			
			</main>
		</body>
	</html>
	`

	reportWindow?.document.open();
	reportWindow?.document.write(reportContent);
	// Print the report
	reportWindow?.print();
	reportWindow?.document.close();
}

export const updateSaleNote = async (id: string, note: string) => {
	const response = await fetch(`${API_URL}/sales/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			note,
		}),
	});

	const data = await response.json();

	// Update state
	sales.update((prevSales) => {
		return prevSales.map((sale) => {
			if (sale.id === data.id) {
				return { ...sale, note: data.note };
			}
			return sale;
		});
	});

	return data;
}
