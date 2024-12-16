import axios from 'axios';

import { http } from './http';

export const api = {

	/**
	 * Sends a POST request to the specified URL with parameters and data.
	 *
	 * @param {Object} options - Contains URL, params, and data for the request.
	 * @param {string} responseType - Specifies the type of response (e.g., 'json').
	 * @returns {Promise} - Axios Promise with the response from the API.
	 */

	callPostwithParams({ url, params, data }, responseType) {
		return http.post(url, data, { params, responseType });
	},

	/**
	 * Sends a DELETE request to the specified URL with URL parameters.
	 *
	 * @param {Object} options - Contains URL and params for the request.
	 * @param {string} responseType - Specifies the type of response (e.g., 'json').
	 * @returns {Promise} - Axios Promise resolving with the response of the DELETE request.
	 */
	callDeleteWithParams({ url, params }, responseType) {
		return http.delete(url, { params, responseType });
	},

	/**
	 * Sends a GET request to the specified URL with URL parameters.
	 *
	 * @param {Object} options - Contains URL and additional parameters for the request.
	 * @returns {Promise} - Axios Promise resolving with the response from the API.
	 */
	callGet({ url, ...params }) {
		return http.get(url, { params });
	},

	/**
	 * Sends a POST request to the specified URL with data.
	 *
	 * @param {Object} options - Contains URL and data for the request.
	 * @returns {Promise} - Axios Promise resolving with the response from the API.
	 */
	callPost({ url, data }) {
		return http.post(url, data);
	},

	/**
	 * Sends a GET request to the specified URL with URL parameters and optional response type.
	 *
	 * @param {Object} options - Contains URL, params, and optional responseType for the request.
	 * @param {string} responseType - Specifies the type of response (e.g., 'json').
	 * @returns {Promise} - Axios Promise resolving with the response from the API.
	 */
	callPostwithParams({ url, params, data }, responseType) {
		return http.post(url, data, { params, responseType });
	},

	/**
	 * Sends a GET request to the specified URL with URL parameters and optional response type.
	 *
	 * @param {Object} options - Contains URL, params, and optional responseType for the request.
	 * @param {string} responseType - Specifies the type of response (e.g., 'json').
	 * @returns {Promise} - Axios Promise resolving with the response from the API.
	 */
	callGetwithParams({ url, params }, responseType) {
		return http.get(url, { params, responseType });
	},

	/**
	 * Sends a POST request to the specified URL with additional parameters and data.
	 *
	 * @param {Object} options - Contains URL, params, and additional data for the request.
	 * @param {string} responseType - Specifies the type of response (e.g., 'json').
	 * @returns {Promise} - Axios Promise resolving with the response from the API.
	 */
	callList({ url, params, ...data }, responseType) {
		return http.post(url, data, { params, responseType });
	},

	/**
	 * Sends a GET request, using a mock API if the URL matches a specific pattern.
	 *
	 * @param {Object} options - Contains URL and URL parameters.
	 * @param {string} responseType - Specifies the type of response (e.g., 'json').
	 * @returns {Promise} - Axios Promise resolving with the response from the API or mock API.
	 */
	callGetWithMockandAPI({ url, params }, responseType) {
		if (url?.startsWith('https://run.mocky.io/')) {
			return axios.get(url);
		}
		return http.get(url, { params, responseType });
	}
};
