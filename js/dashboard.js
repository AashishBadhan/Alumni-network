(() => {
	'use strict';

	const storage = window.AlumniStorage;
	const formatDate = (value, options = { month: 'short', day: 'numeric' }) => {
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? 'Date pending' : new Intl.DateTimeFormat('en-US', options).format(date);
	};

	const createElement = (tag, className, text = '') => {
		const element = document.createElement(tag);
		if (className) element.className = className;
		if (text) element.textContent = text;
		return element;
	};

	const createAvatar = (name) => createElement('span', 'avatar', window.AlumniApp.initials(name));

	const createEmpty = (message) => {
		const empty = createElement('div', 'empty-state');
		empty.append(createElement('div', 'empty-state-icon', '*'), createElement('p', '', message));
		return empty;
	};

	const renderStats = (alumni, events, jobs, messages) => {
		document.querySelector('[data-stat-alumni]').textContent = alumni.length;
		document.querySelector('[data-stat-events]').textContent = events.length;
		document.querySelector('[data-stat-jobs]').textContent = jobs.length;
		document.querySelector('[data-stat-messages]').textContent = messages.reduce((total, conversation) => total + Number(conversation.unreadCount || 0), 0);
	};

	const renderRecommendations = (alumni) => {
		const container = document.querySelector('[data-recommended-list]');
		const currentUser = storage.getCurrentUser();
		const recommendations = alumni.filter((person) => person.id !== currentUser?.id).slice(0, 3);
		if (!recommendations.length) {
			container.append(createEmpty('No alumni recommendations yet.'));
			return;
		}
		recommendations.forEach((person) => {
			const item = createElement('div', 'recommendation-item');
			const content = createElement('div', 'item-content');
			content.append(createElement('strong', 'item-title', person.name), createElement('span', 'item-meta', `${person.role} at ${person.company || 'Independent'} - ${person.city}`));
			const link = createElement('a', 'item-action', 'View');
			link.href = `alumni.html?profile=${encodeURIComponent(person.id)}`;
			item.append(createAvatar(person.name), content, link);
			container.append(item);
		});
	};

	const renderEvents = (events) => {
		const container = document.querySelector('[data-events-list]');
		if (!events.length) {
			container.append(createEmpty('There are no upcoming events right now.'));
			return;
		}
		events.slice(0, 3).forEach((event) => {
			const date = new Date(`${event.date}T00:00:00`);
			const dateBlock = createElement('span', 'event-date');
			dateBlock.append(createElement('strong', '', String(date.getDate()).padStart(2, '0')), createElement('small', '', date.toLocaleDateString('en-US', { month: 'short' })));
			const content = createElement('div', 'item-content');
			content.append(createElement('strong', 'item-title', event.title), createElement('span', 'item-meta', `${event.category} - ${event.location}`));
			const link = createElement('a', 'item-action', 'Details');
			link.href = 'events.html';
			const item = createElement('div', 'dashboard-event-item');
			item.append(dateBlock, content, link);
			container.append(item);
		});
	};

	const renderJobs = (jobs) => {
		const container = document.querySelector('[data-jobs-list]');
		if (!jobs.length) {
			container.append(createEmpty('No job opportunities have been posted yet.'));
			return;
		}
		jobs.slice(0, 3).forEach((job) => {
			const content = createElement('div', 'item-content');
			const title = createElement('strong', 'item-title', job.title);
			const meta = createElement('span', 'item-meta', `${job.company} - ${job.location}`);
			meta.classList.add('job-company');
			content.append(title, meta);
			const posted = createElement('span', 'item-meta', formatDate(job.postedDate));
			const item = createElement('div', 'dashboard-job-item');
			item.append(content, posted);
			container.append(item);
		});
	};

	const renderActivity = (notifications) => {
		const container = document.querySelector('[data-activity-list]');
		if (!notifications.length) {
			container.append(createEmpty('Your recent activity will appear here.'));
			return;
		}
		notifications.slice(0, 4).forEach((notification) => {
			const item = createElement('div', 'activity-item');
			const icon = createElement('span', 'activity-icon', notification.type === 'message' ? '@' : '+');
			const content = createElement('div', 'item-content');
			content.append(createElement('span', 'activity-message', notification.message), createElement('span', 'activity-time', formatDate(notification.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })));
			item.append(icon, content);
			container.append(item);
		});
	};

	const render = () => {
		if (!storage || !storage.getCurrentUser()) return;
		const alumni = storage.getAlumni();
		const events = storage.getEvents().filter((event) => new Date(`${event.date}T${event.time || '00:00'}`) >= new Date()).sort((first, second) => first.date.localeCompare(second.date));
		const jobs = storage.getJobs().sort((first, second) => second.postedDate.localeCompare(first.postedDate));
		const messages = storage.getMessages();
		const notifications = storage.getNotifications().sort((first, second) => second.createdAt.localeCompare(first.createdAt));
		renderStats(alumni, events, jobs, messages);
		renderRecommendations(alumni);
		renderEvents(events);
		renderJobs(jobs);
		renderActivity(notifications);
	};

	document.addEventListener('DOMContentLoaded', render);
})();
