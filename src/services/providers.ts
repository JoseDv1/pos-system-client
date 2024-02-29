import type { Provider } from "@/types";
import { writable } from "svelte/store";
import { API_URL } from "./constants";
import { createToast } from "./utils";
import { loading } from "./stores";

type CreateProviderData = {
	name: string;
	phone: string;
	supplyDays: string;
}


export const providers = writable<Provider[]>([]);

export const fetchProvidersService = (async () => {
	try {
		loading.set(true);
		const response = await fetch(`${API_URL}/providers`);
		const data = await response.json();
		providers.set(data);
		return data;
	} catch (error) {
		createToast("Error al consultar los proveedores", "error");
	} finally {
		loading.set(false);
	}
})();

export const addProviderService = async (data: CreateProviderData) => {
	// Add provider to the server
	try {
		const response = await fetch("http://localhost:3000/api/providers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const addedProvider = await response.json();
		// Add provider to the state
		providers.update((items) => [...items, addedProvider]);
	} catch (error) {
		createToast("Error al agregar el proveedor", "error");
	}
}

export const updateProviderService = async (providerId: string, data: CreateProviderData) => {
	try {
		const response = await fetch(`${API_URL}/providers/${providerId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const updatedProvider = await response.json();
		providers.update((prevProviders) => {
			const updatedProviders = prevProviders.map((provider) => {
				if (provider.id === updatedProvider.id) {
					return updatedProvider;
				}
				return provider;
			});
			return updatedProviders;
		});
	} catch (error) {
		createToast("Error al actualizar el proveedor", "error");
	}
}

export const deleteProviderService = async (providerId: string) => {
	try {
		const res = await fetch(`${API_URL}/providers/${providerId}`, {
			method: "DELETE",
		});
		const deltedProvider = await res.json();

		providers.update((prevProviders) => {
			const updatedProviders = prevProviders.filter((provider) => provider.id !== deltedProvider.id);
			return updatedProviders;
		});
	} catch (error) {
		createToast("Error al eliminar el proveedor", "error");
	}
}