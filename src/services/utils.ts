export function createToast(message: string, type: string) {
	// Create the toast
	const $toast = document.createElement('div');
	$toast.classList.add('toast');
	$toast.classList.add(type);
	$toast.textContent = message;
	document.body.appendChild($toast);

	// Remove the toast after 3 seconds
	setTimeout(() => {
		$toast.remove();
	}, 3000);
}

export const parseId = (id: String) => {
	return id?.split("-").at(0);
};


export function parseIsoDate(date: string) {
	const newDate = new Date(date);
	const day = newDate.getDate();
	const month = newDate.getMonth() + 1;
	const year = newDate.getFullYear();
	const hours = newDate.getHours();
	const minutes = newDate.getMinutes();

	return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day
		} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes
		} 
	`;
}