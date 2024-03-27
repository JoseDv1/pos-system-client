import { writable } from "svelte/store";


export const darkMode = writable<Boolean>(window.localStorage.getItem('darkMode') === 'true' || false);
darkMode.subscribe((value) => {
	window.localStorage.setItem('darkMode', value.toString());

	if (value) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
});

export const fastSale = writable<Boolean>(window.localStorage.getItem('fastSale') === 'true' || false);
fastSale.subscribe((value) => {
	window.localStorage.setItem('fastSale', value.toString());
});



