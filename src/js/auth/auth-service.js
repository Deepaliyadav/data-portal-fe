
/**
 * This module provides authentication-related utilities for the application, specifically
 * checking the authentication status of the current user. It relies on the global `Store`
 * for session and user information.
 */

import Store from '../global/store';

export const authService = {
	/**
	 * Checks if the user is authenticated.
	 *
	 * The function primarily checks if the current user is in a host session
	 * and whether the host is logged in. It returns `true` if the host is logged
	 * in, otherwise it returns `false`.
	 *
	 * @returns {boolean} - Returns `true` if the user is authenticated, otherwise `false`.
	 */
	isAuthenticated() {
		if (Store.isHost() && Store?.host?.loggedIn) {
			return Store?.host?.loggedIn;
		} else {
			return true; // Returns `false` if the host is not logged in.
		}
	}
};
