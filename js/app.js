(() => {
	'use strict';

	const storage = window.AlumniStorage;

	const initials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || 'A';

	const applyTheme = () => {
		const theme = storage ? storage.getTheme() : 'light';
		document.documentElement.dataset.theme = theme;
	};

	const updateUserChrome = () => {
		if (!storage) return;
		const user = storage.getCurrentUser();
		if (!user) return;
		document.querySelectorAll('[data-user-name]').forEach((element) => { element.textContent = user.name; });
		document.querySelectorAll('[data-welcome-name]').forEach((element) => { element.textContent = user.name.split(' ')[0]; });
		document.querySelectorAll('[data-user-avatar]').forEach((element) => { element.textContent = initials(user.name); });
	};

	const updateNotificationChrome = () => {
		if (!storage) return;
		const unreadCount = storage.getNotifications().filter((notification) => !notification.read).length;
		document.querySelectorAll('[data-notification-count]').forEach((element) => { element.textContent = unreadCount ? String(unreadCount) : ''; });
		document.querySelectorAll('[data-notification-dot]').forEach((element) => { element.classList.toggle('is-hidden', unreadCount === 0); });
	};

	const setupNavigation = () => {
		const currentPage = document.body.dataset.page || window.location.pathname.split('/').pop().replace('.html', '') || 'index';
		document.querySelectorAll('[data-nav-page]').forEach((link) => {
			link.classList.toggle('active', link.dataset.navPage === currentPage);
		});
		document.querySelectorAll('.logout-button').forEach((button) => {
			button.addEventListener('click', () => {
				storage.logoutUser();
				window.location.href = 'login.html';
			});
		});
	};

	const setupGlobalSearch = () => {
		const search = document.getElementById('global-search');
		if (!search) return;
		search.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' && search.value.trim()) {
				window.location.href = `alumni.html?search=${encodeURIComponent(search.value.trim())}`;
			}
		});
	};

	const setupLandingStats = () => {
		if (!storage || !document.body.classList.contains('landing-page')) return;
		const values = {
			'[data-landing-alumni]': storage.getAlumni().length,
			'[data-landing-events]': storage.getEvents().length,
			'[data-landing-jobs]': storage.getJobs().length
		};
		Object.entries(values).forEach(([selector, value]) => {
			const element = document.querySelector(selector);
			if (element) element.textContent = value;
		});
	};

	const setup = () => {
		applyTheme();
		if (storage && document.body.dataset.protectedPage === 'true' && !storage.getCurrentUser()) {
			window.location.replace('login.html');
			return;
		}
		updateUserChrome();
		updateNotificationChrome();
		setupNavigation();
		setupGlobalSearch();
		setupLandingStats();
	};

	window.AlumniApp = Object.freeze({ applyTheme, updateUserChrome, updateNotificationChrome, initials });
	document.addEventListener('DOMContentLoaded', setup);
})();
