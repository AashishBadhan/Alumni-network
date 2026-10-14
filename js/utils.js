(() => {
	'use strict';

	const showToast = (message, type = 'info') => {
		let container = document.querySelector('[data-toast-container]');
		if (!container) {
			container = document.createElement('div');
			container.className = 'toast-container';
			container.dataset.toastContainer = '';
			container.setAttribute('aria-live', 'polite');
			document.body.append(container);
		}
		const toast = document.createElement('div');
		toast.className = `toast toast-${type}`;
		toast.setAttribute('role', 'status');
		toast.textContent = message;
		container.append(toast);
		window.setTimeout(() => toast.remove(), 3800);
	};

	window.AlumniUtils = Object.freeze({
		showToast,
		showSuccess: (message) => showToast(message, 'success'),
		showError: (message) => showToast(message, 'error'),
		showWarning: (message) => showToast(message, 'warning'),
		showInfo: (message) => showToast(message, 'info')
	});
})();
