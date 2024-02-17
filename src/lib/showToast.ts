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