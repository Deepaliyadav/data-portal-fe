/**
 * This component manages the routing for authenticated and unauthenticated users.
 * It acts as a protected route wrapper that redirects users based on their
 * authentication status and specific conditions, such as being mid-session.
 *
 * Key Features:
 * - Checks if the user is mid-session and redirects to the signup page if necessary.
 * - Redirects authenticated users to the home page ('/').
 * - Renders child components for unauthenticated users via the Outlet component.
 *
 * Dependencies:
 * - `useLocation` from `react-router-dom` to access the current location path.
 * - `Navigate` from `react-router-dom` to perform conditional redirects.
 * - `Store` for global state management, specifically session data.
 * - `authService` to check authentication status.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { authService } from './auth-service';

export const AuthRoute = () => {

	return (
		authService.isAuthenticated() ? <Navigate to='/' /> : <Outlet />
	);
};
