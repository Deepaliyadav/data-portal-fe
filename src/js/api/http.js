
import axios from 'axios';

import Store from '../global/store';

/**
 * Custom parameter serializer that converts an object of parameters into a
 * URL query string. This function ensures that parameters are formatted
 * correctly for inclusion in request URLs.
 *
 * @param {Object} params - The parameters to be serialized.
 * @returns {string} - A URL-encoded query string.
 */

const paramsSerializer = params =>
	Object.entries(params).map(([key, value]) =>
		key + '=' + (value || '')).join('&') || ''; // Serialize parameters into a query string format.

/**
 * Creates an Axios instance with custom configuration, including a custom
 * parameter serializer.
 */
export const http = axios.create({
	paramsSerializer
});

// Request interceptor: Modifies request configurations before sending the request.
http.interceptors.request.use(config => {
	let securityHeaders = {}; // Placeholder for security-related headers.
	const timeStamp = Date.now().toString(); // Generate a timestamp for request tracking.
	const userHeaders = {
		'Content-Type': 'application/json', // Default content type.
		'vname': '20.6', // Version name header.
		'App_Version_Name': '16.1', // Application version name.
		'vcode': '1', // Version code header.
		'App_Version_Code': '1', // Application version code.
		'crs': 'true', // Custom header (purpose-specific).
		'tlp-t': timeStamp // Timestamp header to track request time.
	};
	http.defaults.timeout = 15000; // Set default timeout for requests to 15 seconds.

	// Prefix the URL with `/api` for routing through the backend API.
	config.url = '/api' + config.url;

	// Change content type if the request is a multipart upload.
	if (config.method.toLowerCase() === 'post' && config.params?.uploadingMultiPart) {
		userHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
	}
	config.headers = {
		...config.headers,
		...userHeaders,
		...securityHeaders
	};
	return config; // Return the modified config.
}, error => Promise.reject(error));

// Response interceptor: Handles the response after it is received from the server.
http.interceptors.response.use(response => {
	// Update the session in the global store in order to redirect to multiple access screen just after login
	if (response.data?.showPopUp) {
		Store.session = { ...response.data };
	}

	return response;
}, error => {
	let path = ['/admin', '/project', '/superAdmin'];
	// If the response status is 401 (Unauthorized) and the current path matches, redirect to the login page.
	if (path.some(item => window.location.pathname.includes(item))) {
		if (error?.response?.status === 401) {
			// toast.error('Access Error', { autoClose: 2000, hideProgressBar: true, theme: 'colored', position: 'bottom-right' });
			// setTimeout(() => {
			window.location.replace('/login');
			// });
		}
	}
	return Promise.reject(error);
});
