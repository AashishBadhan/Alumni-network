(() => {
	'use strict';
	const storage = AlumniStorage; let notifications = [];
	const iconFor = (type) => ({ connection: '+', event: '*', message: '@', job: '$', profile: 'i' }[type] || '*');
	const attachDeleteButtons = () => {
		document.querySelectorAll('.notification-item').forEach((item) => {
			if (item.querySelector('[data-delete-notification]')) return;
			const message = item.querySelector('.notification-body p')?.textContent;
			const button = Object.assign(document.createElement('button'), { className: 'button button-outline button-sm', type: 'button', textContent: 'Delete' });
			button.dataset.deleteNotification = 'true';
			button.addEventListener('click', () => {
				notifications = notifications.filter((notification) => notification.message !== message);
				storage.saveNotifications(notifications);
				AlumniApp.updateNotificationChrome();
				render();
			});
			item.querySelector('.notification-actions')?.append(button);
		});
	};
	const render = () => { const list = document.querySelector('[data-notification-list]'); list.replaceChildren(); notifications.sort((first, second) => second.createdAt.localeCompare(first.createdAt)); if (!notifications.length) { const empty = document.createElement('div'); empty.className = 'panel empty-state'; empty.append(Object.assign(document.createElement('div'), { className: 'empty-state-icon', textContent: '*' }), Object.assign(document.createElement('h3'), { textContent: 'No notifications' }), Object.assign(document.createElement('p'), { textContent: 'You are all caught up.' })); list.append(empty); return; } notifications.forEach((notification) => { const item = document.createElement('article'); item.className = `notification-item panel${notification.read ? '' : ' unread'}`; const icon = Object.assign(document.createElement('span'), { className: 'activity-icon', textContent: iconFor(notification.type) }); const body = document.createElement('div'); body.className = 'notification-body'; body.append(Object.assign(document.createElement('p'), { textContent: notification.message }), Object.assign(document.createElement('time'), { textContent: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(notification.createdAt)) })); const actions = document.createElement('div'); actions.className = 'notification-actions'; if (!notification.read) { const read = Object.assign(document.createElement('button'), { className: 'button button-secondary button-sm', type: 'button', textContent: 'Mark read' }); read.addEventListener('click', () => { notification.read = true; storage.saveNotifications(notifications); AlumniApp.updateNotificationChrome(); render(); }); actions.append(read); } item.append(icon, body, actions); list.append(item); }); };
	document.addEventListener('DOMContentLoaded', () => { notifications = storage.getNotifications(); getElement('mark-all-read').addEventListener('click', () => { notifications.forEach((notification) => { notification.read = true; }); storage.saveNotifications(notifications); AlumniApp.updateNotificationChrome(); render(); }); const observer = new MutationObserver(attachDeleteButtons); observer.observe(document.querySelector('[data-notification-list]'), { childList: true }); render(); attachDeleteButtons(); });
	const getElement = (id) => document.getElementById(id);
})();
