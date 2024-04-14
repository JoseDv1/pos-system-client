import { writable } from "svelte/store";

export const loading = writable(true);
export const searchDate = writable<string>(new Date().toISOString().split("T")[0]);


