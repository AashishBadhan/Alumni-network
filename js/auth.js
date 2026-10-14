(() => {
	'use strict';

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const currentYear = new Date().getFullYear();

	const getElement = (id) => document.getElementById(id);

	const setStatus = (message, type = '') => {
		const status = getElement('auth-status');
		if (!status) return;
		status.textContent = message;
		status.className = `auth-status${type ? ` ${type}` : ''}`;
	};

	const setFieldError = (fieldId, message) => {
		const field = getElement(fieldId);
		const error = getElement(`${fieldId}-error`);
		if (field) field.classList.toggle('invalid', Boolean(message));
		if (error) error.textContent = message;
	};

	const clearFieldError = (fieldId) => setFieldError(fieldId, '');

	const getId = (prefix) => {
		if (window.crypto && typeof window.crypto.randomUUID === 'function') {
			return `${prefix}-${window.crypto.randomUUID()}`;
		}
		return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
	};

	const validateLogin = (email, password) => {
		let valid = true;
		if (!emailPattern.test(email)) {
			setFieldError('login-email', 'Enter a valid email address.');
			valid = false;
		} else {
			clearFieldError('login-email');
		}
		if (!password) {
			setFieldError('login-password', 'Enter your password.');
			valid = false;
		} else {
			clearFieldError('login-password');
		}
		return valid;
	};

	const validateRegistration = (values) => {
		const checks = [
			['register-name', values.name.length >= 2 ? '' : 'Enter your full name.'],
			['register-email', emailPattern.test(values.email) ? '' : 'Enter a valid email address.'],
			['register-year', Number.isInteger(values.graduationYear) && values.graduationYear >= 1950 && values.graduationYear <= currentYear + 4 ? '' : `Use a year between 1950 and ${currentYear + 4}.`],
			['register-password', values.password.length >= 6 ? '' : 'Password must be at least 6 characters.'],
			['register-confirm-password', values.password === values.confirmPassword && values.confirmPassword ? '' : 'Passwords must match.'],
			['register-department', values.department ? '' : 'Enter your department.'],
			['register-city', values.city ? '' : 'Enter your current city.'],
			['register-role', values.role ? '' : 'Enter your current role.']
		];
		let valid = true;
		checks.forEach(([fieldId, message]) => {
			setFieldError(fieldId, message);
			if (message) valid = false;
		});
		return valid;
	};

	const handleLogin = (event) => {
		event.preventDefault();
		const email = getElement('login-email').value.trim().toLowerCase();
		const password = getElement('login-password').value;
		setStatus('');
		if (!validateLogin(email, password)) return;

		const user = AlumniStorage.getUsers().find((candidate) => candidate.email.toLowerCase() === email && candidate.password === password);
		if (!user) {
			setStatus('The email or password does not match our records.', 'error');
			return;
		}

		AlumniStorage.setCurrentUser(user.id);
		setStatus('Signed in successfully. Opening your dashboard...', 'success');
		window.setTimeout(() => {
			window.location.href = 'dashboard.html';
		}, 450);
	};

	const handleRegistration = (event) => {
		event.preventDefault();
		const values = {
			name: getElement('register-name').value.trim(),
			email: getElement('register-email').value.trim().toLowerCase(),
			graduationYear: Number(getElement('register-year').value),
			password: getElement('register-password').value,
			confirmPassword: getElement('register-confirm-password').value,
			department: getElement('register-department').value.trim(),
			city: getElement('register-city').value.trim(),
			role: getElement('register-role').value.trim()
		};

		setStatus('');
		if (!validateRegistration(values)) return;
		if (AlumniStorage.getUsers().some((user) => user.email.toLowerCase() === values.email)) {
			setFieldError('register-email', 'An account with this email already exists.');
			setStatus('This email is already registered. Try signing in instead.', 'error');
			return;
		}

		const user = {
			id: getId('user'),
			name: values.name,
			email: values.email,
			password: values.password,
			graduationYear: values.graduationYear,
			department: values.department,
			city: values.city,
			role: values.role,
			company: '',
			bio: '',
			skills: [],
			education: '',
			experience: '',
			linkedin: '',
			github: '',
			isDemo: false,
			createdAt: new Date().toISOString()
		};
		const users = AlumniStorage.getUsers();
		users.push(user);
		AlumniStorage.saveUsers(users);
		const alumni = AlumniStorage.getAlumni();
		alumni.push({ ...user, connectionStatus: 'Not connected' });
		AlumniStorage.saveAlumni(alumni);
		AlumniStorage.setCurrentUser(user.id);
		setStatus('Your account is ready. Opening your dashboard...', 'success');
		window.setTimeout(() => {
			window.location.href = 'dashboard.html';
		}, 450);
	};

	const setupPasswordToggles = () => {
		document.querySelectorAll('[data-password-target]').forEach((button) => {
			button.addEventListener('click', () => {
				const field = getElement(button.dataset.passwordTarget);
				if (!field) return;
				const shouldShow = field.type === 'password';
				field.type = shouldShow ? 'text' : 'password';
				button.textContent = shouldShow ? 'Hide' : 'Show';
				button.setAttribute('aria-label', `${shouldShow ? 'Hide' : 'Show'} password`);
			});
		});
	};

	const protectPage = () => {
		if (document.body.dataset.protectedPage === 'true' && !AlumniStorage.getCurrentUser()) {
			window.location.replace('login.html');
		}
	};

	const setupAuthPage = () => {
		protectPage();
		if (document.body.dataset.authPage && AlumniStorage.getCurrentUser()) {
			window.location.replace('dashboard.html');
			return;
		}

		const loginForm = getElement('login-form');
		const registerForm = getElement('register-form');
		if (loginForm) loginForm.addEventListener('submit', handleLogin);
		if (registerForm) registerForm.addEventListener('submit', handleRegistration);
		setupPasswordToggles();

		const forgotPassword = getElement('forgot-password');
		if (forgotPassword) {
			forgotPassword.addEventListener('click', () => setStatus('Password recovery is unavailable in this offline version. Please register a new account.', 'error'));
		}
	};

	window.AlumniAuth = Object.freeze({ protectPage, logout: AlumniStorage.logoutUser });
	document.addEventListener('DOMContentLoaded', setupAuthPage);
})();
