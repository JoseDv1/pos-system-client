import type { Supply } from "@/types"
import { derived, writable } from "svelte/store"
import { API_URL } from "./constants"
import { loading, searchDate } from "./stores"
import { createToast } from "./utils"



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
