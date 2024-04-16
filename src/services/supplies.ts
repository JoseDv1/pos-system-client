import type { Supply } from "@/types"
import { derived, writable } from "svelte/store"
import { API_URL } from "./constants"
import { loading, searchDate } from "./stores"
import { createToast } from "./utils"
import { Chart } from "chart.js/auto";



// MARK: States
export const supplies = writable<Supply[]>([])
export const providersFilter = writable<string>("")

// MARK: Derived
export const totalAmount = derived(supplies, ($supplies) => {
	return $supplies.reduce((acc, supply) => acc + supply.totalCost, 0)
})


export const filteredSupplies = derived([supplies, providersFilter, searchDate], ([$supplies, $providersFilter, $searchDate]) => {
	const filtered = $supplies.filter((supply) => {
		const providerMatch = $providersFilter ? supply.providerId === $providersFilter : true
		const dateMatch = supply.date.split("T")[0] === $searchDate
		return providerMatch && dateMatch
	})
	return filtered
})

export const filteredSuppliesByDate = derived([supplies, searchDate], ([$supplies, $searchDate]) => {
	const filtered = $supplies.filter((supply) => {
		const dateMatch = supply.date.split("T")[0] === $searchDate
		return dateMatch
	})
	return filtered
})

export const totalSuppliesAmount = derived(filteredSuppliesByDate, ($filteredSuppliesByDate) => {
	return $filteredSuppliesByDate.reduce((acc, supply) => acc + supply.totalCost, 0)
})

export const lastDaysSupplies = derived([supplies], ([$supplies]) => {
	const today = new Date()
	const lastDays = Array.from({ length: 8 }, (_, index) => {
		const date = new Date(today);
		date.setDate(date.getDate() - index);
		return date.toISOString().split("T")[0];
	});

	const supplies = lastDays.map((day) => {
		const supplies = $supplies.filter((supply) => supply.date.split("T")[0] === day)
		const totalCost = supplies.reduce((acc, supply) => acc + supply.totalCost, 0) * -1
		return { day, totalCost }
	})

	const canvas = document.getElementById("suppliesChart") as HTMLCanvasElement;
	if (canvas) {
		const ctx = canvas.getContext("2d");
		const labels = supplies.map((sale) => sale.day).reverse().map((date) => {
			const dateFormater = new Intl.DateTimeFormat("es-CO", {
				timeZone: "UTC",
				weekday: "long",
			});
			const formatedDate = dateFormater.format(new Date(date));
			// Capitalize the first letter
			return formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
		});
		const data = supplies.map((supply) => supply.totalCost).reverse();
		if (ctx) {
			// Create the chart
			new Chart(ctx, {
				type: "bar",
				data: {
					labels,
					datasets: [
						{
							label: "Gastos",
							data,
							backgroundColor: "#AE2F3144",
							borderColor: "#AE2F31",
							borderWidth: 1,

						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: true,
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								callback: (value) => new Intl.NumberFormat("es-CO", {
									style: "currency",
									currency: "COP",
								}).format(Number(value)),
							},
							reverse: true,
						},
					},
					locale: "es-CO",
					plugins: {
						legend: {
							display: false,
						},
						title: {
							text: "Gastos de los últimos 7 días",
							display: true,
							position: "top",
							fullSize: true,
							font: {
								size: 24,
							},
						}
					}
				},
			});
		}
	}
})




// MARK: CRUD
export const fetchSupplies = (async () => {
	try {
		loading.set(true)
		const res = await fetch(`${API_URL}/supplies`)
		const data = await res.json()
		supplies.set(data)

	} catch (error) {
		console.error(error)
		createToast("Error al obteer los sumnistros", "error")
	} finally {
		loading.set(false)
	}
})()

export async function createSupply(providerId: String) {
	try {
		const res = await fetch(`${API_URL}/supplies`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ providerId }),
		})
		const data = await res.json()
		supplies.update((items) => [data, ...items])

	} catch (error) {
		createToast("Error al crear el suministro", "error")
	}
}

export async function updateSupply(supplyId: string, supply: Omit<Supply, "id">) {
	try {
		const res = await fetch(`${API_URL}/supplies/${supplyId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(supply),
		})
		const data = await res.json()
		supplies.update((items) => items.map((item) => (item.id === data.id ? data : item)))
	} catch {
		createToast("Error al actualizar el suministro", "error")
	}
}

export async function deleteSupply(supplyId: string) {
	try {
		await fetch(`${API_URL}/supplies/${supplyId}`, {
			method: "DELETE",
		})
		supplies.update((items) => items.filter((item) => item.id !== supplyId))
	} catch {
		createToast("Error al eliminar el suministro", "error")
	}
}
