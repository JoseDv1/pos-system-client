import { writable } from "svelte/store";


export const darkMode = writable<Boolean>(localStorage.getItem('darkMode') === 'true' || false);
darkMode.subscribe((value) => {
	localStorage.setItem('darkMode', value.toString());

	if (value) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
});




