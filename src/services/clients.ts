import { API_URL } from "./constants";
import type { Client } from "@/types"
import { loading } from "./stores";
import { createToast } from "./utils";
import { writable } from "svelte/store";


export const clients = writable<Client[]>([]);

export const fetchClientsService = (async () => {
	try {
		loading.set(true);
		const res = await fetch(`${API_URL}/clients`);
		const data = await res.json();
		clients.set(data);
		return data
	} catch (error) {
		createToast("Error al consultar los clientes", "error")
	} finally {
		loading.set(false);
	}
})()

export const createClientService = async (client: Omit<Client, "id">) => {
	try {
		const res = await fetch(`${API_URL}/clients`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(client)
		});
		const data = await res.json();
		clients.update((items) => [...items, data]);
	} catch (error) {
		createToast("Error al crear el cliente", "error")
	}
}

// Partial<Client> is a TypeScript utility type that makes all properties of Client optional
export const updateClientService = async (clientID: string, data: Partial<Client>) => {
	try {



		const res = await fetch(`${API_URL}/clients/${clientID}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const updatedClient = await res.json();
		clients.update((prevClients) => {
			const updatedClients = prevClients.map((client) => client.id === updatedClient.id ? updatedClient : client);
			return updatedClients;
		});

	} catch (error) {
		createToast("Error al actualizar el cliente", "error")
	}
}

export const deleteClientService = async (clientID: string) => {
	try {
		const res = await fetch(`${API_URL}/clients/${clientID}`, {
			method: "DELETE"
		});

		const data = await res.json();

		clients.update((prevClients) => prevClients.filter((client) => client.id !== data.id));


	} catch (error) {
		createToast("Error al eliminar el cliente", "error")
	}
}