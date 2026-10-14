(() => {
	'use strict';

	const KEYS = Object.freeze({
		users: 'alumni_users',
		currentUser: 'alumni_current_user',
		alumni: 'alumni_directory',
		events: 'alumni_events',
		jobs: 'alumni_jobs',
		messages: 'alumni_messages',
		notifications: 'alumni_notifications',
		theme: 'alumni_theme',
		settings: 'alumni_settings'
	});

	const demoAlumni = [
		{ id: 'alumni-02', name: 'Aisha Mehta', email: 'aisha.mehta@example.com', graduationYear: 2022, department: 'Business Administration', city: 'Mumbai', role: 'Product Manager', company: 'Northstar', skills: ['Product strategy', 'Research', 'Roadmapping'], connectionStatus: 'Not connected' },
		{ id: 'alumni-03', name: 'Vikram Iyer', email: 'vikram.iyer@example.com', graduationYear: 2020, department: 'Data Science', city: 'Pune', role: 'Data Analyst', company: 'InsightWorks', skills: ['Python', 'SQL', 'Tableau'], connectionStatus: 'Not connected' },
		{ id: 'alumni-04', name: 'Nisha Kapoor', email: 'nisha.kapoor@example.com', graduationYear: 2021, department: 'Design', city: 'Delhi', role: 'UI/UX Designer', company: 'Studio Kite', skills: ['Figma', 'Design systems', 'Prototyping'], connectionStatus: 'Connected' },
		{ id: 'alumni-05', name: 'Arjun Rao', email: 'arjun.rao@example.com', graduationYear: 2019, department: 'Information Technology', city: 'Hyderabad', role: 'Cloud Engineer', company: 'CloudHarbor', skills: ['AWS', 'Kubernetes', 'Terraform'], connectionStatus: 'Not connected' },
		{ id: 'alumni-06', name: 'Priya Nair', email: 'priya.nair@example.com', graduationYear: 2018, department: 'Computer Science', city: 'Kochi', role: 'AI/ML Engineer', company: 'Cognitive Grid', skills: ['Machine learning', 'PyTorch', 'MLOps'], connectionStatus: 'Not connected' },
		{ id: 'alumni-07', name: 'Sameer Joshi', email: 'sameer.joshi@example.com', graduationYear: 2017, department: 'Commerce', city: 'Ahmedabad', role: 'Entrepreneur', company: 'BrightRoute', skills: ['Leadership', 'Fundraising', 'Growth'], connectionStatus: 'Not connected' },
		{ id: 'alumni-08', name: 'Maya Thomas', email: 'maya.thomas@example.com', graduationYear: 2023, department: 'Human Resources', city: 'Chennai', role: 'HR Manager', company: 'PeopleFirst', skills: ['Talent strategy', 'Coaching', 'Culture'], connectionStatus: 'Not connected' },
		{ id: 'alumni-09', name: 'Karan Malhotra', email: 'karan.malhotra@example.com', graduationYear: 2016, department: 'Finance', city: 'Jaipur', role: 'Business Analyst', company: 'BluePeak Finance', skills: ['Financial modeling', 'Excel', 'Analytics'], connectionStatus: 'Not connected' },
		{ id: 'alumni-10', name: 'Leena George', email: 'leena.george@example.com', graduationYear: 2022, department: 'Cybersecurity', city: 'Bengaluru', role: 'Cybersecurity Analyst', company: 'SecureStack', skills: ['Threat analysis', 'SIEM', 'Risk management'], connectionStatus: 'Not connected' },
		{ id: 'alumni-11', name: 'Rohan Sen', email: 'rohan.sen@example.com', graduationYear: 2021, department: 'Computer Science', city: 'Kolkata', role: 'Platform Engineer', company: 'OpenFrame', skills: ['Go', 'Distributed systems', 'Docker'], connectionStatus: 'Not connected' }
	];

	const demoEvents = [
		{ id: 'event-01', title: 'Alumni Product Leaders Roundtable', description: 'A practical conversation about building products people return to, hosted by alumni product leaders.', date: '2026-10-18', time: '18:30', location: 'Innovation Hub, Bengaluru', organizer: 'AlumniConnect Community', category: 'Networking', maxAttendees: 80, attendees: [] },
		{ id: 'event-02', title: 'Career Switch Workshop', description: 'Learn how alumni made successful transitions into technology, design, and business roles.', date: '2026-10-25', time: '16:00', location: 'Online event', organizer: 'Career Support Circle', category: 'Career', maxAttendees: 150, attendees: [] },
		{ id: 'event-03', title: 'Founders and First Hires', description: 'An evening of honest founder stories, hiring lessons, and early-stage networking.', date: '2026-11-02', time: '19:00', location: 'The Foundry, Mumbai', organizer: 'Entrepreneurship Club', category: 'Entrepreneurship', maxAttendees: 60, attendees: [] },
		{ id: 'event-04', title: 'Design Systems Showcase', description: 'Alumni designers share how they create consistent, accessible digital experiences.', date: '2026-11-12', time: '17:30', location: 'Design Lab, Delhi', organizer: 'Design Alumni Group', category: 'Learning', maxAttendees: 90, attendees: [] },
		{ id: 'event-05', title: 'Annual Alumni Homecoming', description: 'Reconnect with classmates, meet new members, and celebrate the alumni community.', date: '2026-12-05', time: '11:00', location: 'Alumni University Campus', organizer: 'AlumniConnect Team', category: 'Community', maxAttendees: 400, attendees: [] }
	];

	const demoJobs = [
		{ id: 'job-01', title: 'Senior Frontend Engineer', company: 'Vertex Labs', location: 'Bengaluru', employmentType: 'Full-time', experience: '3-5 years', salary: 'INR 18-26 LPA', description: 'Build polished, accessible product experiences with a collaborative frontend team.', skills: ['JavaScript', 'CSS', 'Testing'], postedDate: '2026-10-02', applicationLink: 'https://example.com/jobs/frontend-engineer' },
		{ id: 'job-02', title: 'Product Analyst', company: 'InsightWorks', location: 'Pune', employmentType: 'Full-time', experience: '1-3 years', salary: 'INR 8-12 LPA', description: 'Turn customer and product data into decisions that improve the user journey.', skills: ['SQL', 'Analytics', 'Experimentation'], postedDate: '2026-09-29', applicationLink: 'https://example.com/jobs/product-analyst' },
		{ id: 'job-03', title: 'Cloud Platform Engineer', company: 'CloudHarbor', location: 'Hyderabad', employmentType: 'Full-time', experience: '3-5 years', salary: 'INR 16-24 LPA', description: 'Own reliable cloud infrastructure and developer tooling for a growing platform.', skills: ['AWS', 'Terraform', 'Kubernetes'], postedDate: '2026-09-25', applicationLink: 'https://example.com/jobs/cloud-platform' },
		{ id: 'job-04', title: 'UX Designer', company: 'Studio Kite', location: 'Remote', employmentType: 'Contract', experience: '2-4 years', salary: 'INR 10-15 LPA', description: 'Shape clear workflows and expressive interfaces for small business owners.', skills: ['Figma', 'Research', 'Prototyping'], postedDate: '2026-09-20', applicationLink: 'https://example.com/jobs/ux-designer' },
		{ id: 'job-05', title: 'Machine Learning Engineer', company: 'Cognitive Grid', location: 'Chennai', employmentType: 'Full-time', experience: '3-5 years', salary: 'INR 20-30 LPA', description: 'Productionize machine learning systems that support responsible automation.', skills: ['Python', 'PyTorch', 'MLOps'], postedDate: '2026-09-18', applicationLink: 'https://example.com/jobs/ml-engineer' },
		{ id: 'job-06', title: 'People Operations Specialist', company: 'PeopleFirst', location: 'Remote', employmentType: 'Full-time', experience: '1-3 years', salary: 'INR 7-10 LPA', description: 'Help build thoughtful employee programs for a distributed team.', skills: ['People operations', 'Communication', 'HRIS'], postedDate: '2026-09-14', applicationLink: 'https://example.com/jobs/people-operations' },
		{ id: 'job-07', title: 'Security Operations Analyst', company: 'SecureStack', location: 'Bengaluru', employmentType: 'Full-time', experience: '0-2 years', salary: 'INR 7-11 LPA', description: 'Monitor, investigate, and improve security operations across a modern environment.', skills: ['SIEM', 'Incident response', 'Linux'], postedDate: '2026-09-09', applicationLink: 'https://example.com/jobs/security-analyst' },
		{ id: 'job-08', title: 'Community Program Intern', company: 'AlumniConnect', location: 'Mumbai', employmentType: 'Internship', experience: '0-1 years', salary: 'INR 25k-35k monthly', description: 'Support events and member programs that make the alumni community useful.', skills: ['Community', 'Events', 'Writing'], postedDate: '2026-09-01', applicationLink: '' }
	];

	const demoMessages = [
		{ id: 'conversation-01', participantId: 'alumni-02', participantName: 'Aisha Mehta', unreadCount: 2, messages: [{ id: 'message-01', senderId: 'alumni-02', text: 'Hi Rahul, great to see you here. Are you attending the product roundtable?', timestamp: '2026-10-06T13:20:00.000Z' }, { id: 'message-02', senderId: 'alumni-02', text: 'I would love to compare notes on product communities.', timestamp: '2026-10-06T13:22:00.000Z' }] },
		{ id: 'conversation-02', participantId: 'alumni-04', participantName: 'Nisha Kapoor', unreadCount: 0, messages: [{ id: 'message-03', senderId: 'member-01', text: 'Your design systems showcase was excellent.', timestamp: '2026-10-05T09:15:00.000Z' }, { id: 'message-04', senderId: 'alumni-04', text: 'Thank you. Let us catch up after the next community event.', timestamp: '2026-10-05T09:30:00.000Z' }] },
		{ id: 'conversation-03', participantId: 'alumni-05', participantName: 'Arjun Rao', unreadCount: 1, messages: [{ id: 'message-05', senderId: 'alumni-05', text: 'I shared a cloud engineering role in the jobs board today.', timestamp: '2026-10-04T15:40:00.000Z' }] },
		{ id: 'conversation-04', participantId: 'alumni-06', participantName: 'Priya Nair', unreadCount: 0, messages: [{ id: 'message-06', senderId: 'member-01', text: 'Would you be open to sharing your MLOps learning path?', timestamp: '2026-10-02T10:05:00.000Z' }] },
		{ id: 'conversation-05', participantId: 'alumni-08', participantName: 'Maya Thomas', unreadCount: 0, messages: [{ id: 'message-07', senderId: 'alumni-08', text: 'Welcome to AlumniConnect, Rahul. Happy networking!', timestamp: '2026-09-30T08:45:00.000Z' }] }
	];

	const demoNotifications = [
		{ id: 'notification-01', userId: null, type: 'connection', message: 'Nisha Kapoor is now connected with you.', createdAt: '2026-10-06T08:30:00.000Z', read: false },
		{ id: 'notification-02', userId: null, type: 'event', message: 'Alumni Product Leaders Roundtable has opened registration.', createdAt: '2026-10-05T12:10:00.000Z', read: false },
		{ id: 'notification-03', userId: null, type: 'message', message: 'Aisha Mehta sent a new community message.', createdAt: '2026-10-06T13:22:00.000Z', read: false },
		{ id: 'notification-04', userId: null, type: 'job', message: 'A new Senior Frontend Engineer role matches your profile.', createdAt: '2026-10-02T09:00:00.000Z', read: false },
		{ id: 'notification-05', userId: null, type: 'profile', message: 'Complete your profile with a short introduction.', createdAt: '2026-10-01T10:00:00.000Z', read: true },
		{ id: 'notification-06', userId: null, type: 'connection', message: 'Your connection request was viewed.', createdAt: '2026-09-28T14:25:00.000Z', read: true },
		{ id: 'notification-07', userId: null, type: 'event', message: 'Career Switch Workshop has 20 seats remaining.', createdAt: '2026-09-26T11:15:00.000Z', read: true },
		{ id: 'notification-08', userId: null, type: 'job', message: 'The Product Analyst role closes applications soon.', createdAt: '2026-09-24T16:45:00.000Z', read: true },
		{ id: 'notification-09', userId: null, type: 'message', message: 'A new opportunity was shared with the community.', createdAt: '2026-09-20T09:30:00.000Z', read: true },
		{ id: 'notification-10', userId: null, type: 'profile', message: 'Your profile received a new view.', createdAt: '2026-09-18T07:50:00.000Z', read: true }
	];

	const defaultSettings = {
		emailNotifications: true,
		messageNotifications: true,
		eventNotifications: true,
		privacy: 'community'
	};

	demoAlumni.length = 0;
	demoEvents.length = 0;
	demoJobs.length = 0;
	demoMessages.length = 0;
	demoNotifications.length = 0;

	const clone = (value) => JSON.parse(JSON.stringify(value));

	const read = (key, fallback) => {
		try {
			const rawValue = window.localStorage.getItem(key);
			return rawValue === null ? clone(fallback) : JSON.parse(rawValue);
		} catch (error) {
			console.warn(`AlumniConnect reset invalid storage value: ${key}`, error);
			return clone(fallback);
		}
	};

	const write = (key, value) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.warn(`AlumniConnect could not save storage value: ${key}`, error);
			return false;
		}
	};

	const ensureSeed = (key, seed) => {
		try {
			const rawValue = window.localStorage.getItem(key);
			if (rawValue === null) {
				write(key, seed);
				return;
			}
			JSON.parse(rawValue);
		} catch (error) {
			console.warn(`AlumniConnect reset invalid storage value: ${key}`, error);
			write(key, seed);
		}
	};

	const getCollection = (key, fallback) => {
		const value = read(key, fallback);
		return Array.isArray(value) ? value : clone(fallback);
	};

	const getUsers = () => getCollection(KEYS.users, []);
	const saveUsers = (users) => write(KEYS.users, Array.isArray(users) ? users : []);
	const getCurrentUserId = () => read(KEYS.currentUser, null);
	const setCurrentUser = (userOrId) => write(KEYS.currentUser, typeof userOrId === 'object' ? userOrId?.id || null : userOrId);
	const logoutUser = () => {
		try {
			window.localStorage.removeItem(KEYS.currentUser);
			return true;
		} catch (error) {
			console.warn('AlumniConnect could not clear the current session.', error);
			return false;
		}
	};
	const getCurrentUser = () => {
		const currentUserId = getCurrentUserId();
		return getUsers().find((user) => user.id === currentUserId) || null;
	};

	const getAlumni = () => getCollection(KEYS.alumni, []);
	const saveAlumni = (alumni) => write(KEYS.alumni, Array.isArray(alumni) ? alumni : []);
	const getEvents = () => getCollection(KEYS.events, []);
	const saveEvents = (events) => write(KEYS.events, Array.isArray(events) ? events : []);
	const getJobs = () => getCollection(KEYS.jobs, []);
	const saveJobs = (jobs) => write(KEYS.jobs, Array.isArray(jobs) ? jobs : []);
	const getMessages = () => getCollection(KEYS.messages, []);
	const saveMessages = (messages) => write(KEYS.messages, Array.isArray(messages) ? messages : []);
	const getNotifications = () => getCollection(KEYS.notifications, []);
	const saveNotifications = (notifications) => write(KEYS.notifications, Array.isArray(notifications) ? notifications : []);
	const getSettings = () => {
		const settings = read(KEYS.settings, defaultSettings);
		return settings && typeof settings === 'object' && !Array.isArray(settings) ? settings : clone(defaultSettings);
	};
	const saveSettings = (settings) => write(KEYS.settings, settings && typeof settings === 'object' ? settings : defaultSettings);
	const getTheme = () => {
		const theme = read(KEYS.theme, 'light');
		return theme === 'dark' ? 'dark' : 'light';
	};
	const saveTheme = (theme) => write(KEYS.theme, theme === 'dark' ? 'dark' : 'light');
	const clearLegacyAppData = () => {
		const resetKey = 'alumni_fresh_state_v1';
		try {
			if (window.localStorage.getItem(resetKey) === 'true') return;
			[KEYS.users, KEYS.alumni, KEYS.events, KEYS.jobs, KEYS.messages, KEYS.notifications].forEach((key) => write(key, []));
			window.localStorage.removeItem(KEYS.currentUser);
			window.localStorage.setItem(resetKey, 'true');
		} catch (error) {
			console.warn('AlumniConnect could not complete the fresh-state migration.', error);
		}
	};
	const removeFormerDemoAccount = () => {
		const cleanupKey = 'alumni_demo_cleanup_complete';
		try {
			if (window.localStorage.getItem(cleanupKey) === 'true') return;
		} catch (error) {
			console.warn('AlumniConnect could not read migration status.', error);
		}
		const formerIds = new Set(['user-demo-rahul']);
		const users = read(KEYS.users, []);
		if (Array.isArray(users)) saveUsers(users.filter((user) => !formerIds.has(user.id) && user.email !== 'rahul@example.com'));
		const alumni = read(KEYS.alumni, []);
		if (Array.isArray(alumni)) saveAlumni(alumni.filter((person) => !formerIds.has(person.id) && person.email !== 'rahul@example.com'));
		const events = read(KEYS.events, []);
		if (Array.isArray(events)) saveEvents(events.map((event) => ({ ...event, attendees: (event.attendees || []).filter((id) => !formerIds.has(id)) })));
		try {
			window.localStorage.removeItem(KEYS.currentUser);
			window.localStorage.setItem(cleanupKey, 'true');
		} catch (error) {
			console.warn('AlumniConnect could not complete the removed demo migration.', error);
		}
	};

	const initialize = () => {
		clearLegacyAppData();
		removeFormerDemoAccount();
		ensureSeed(KEYS.users, []);
		ensureSeed(KEYS.alumni, []);
		ensureSeed(KEYS.events, []);
		ensureSeed(KEYS.jobs, []);
		ensureSeed(KEYS.messages, []);
		ensureSeed(KEYS.notifications, []);
		ensureSeed(KEYS.settings, defaultSettings);
		ensureSeed(KEYS.theme, 'light');
	};

	initialize();

	window.AlumniStorage = Object.freeze({
		KEYS,
		getUsers,
		saveUsers,
		getCurrentUser,
		setCurrentUser,
		logoutUser,
		getAlumni,
		saveAlumni,
		getEvents,
		saveEvents,
		getJobs,
		saveJobs,
		getMessages,
		saveMessages,
		getNotifications,
		saveNotifications,
		getSettings,
		saveSettings,
		getTheme,
		saveTheme,
		initialize
	});
})();
