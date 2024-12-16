/**
 * This component serves as a protected route wrapper for components that require authentication.
 * It checks if the user is authenticated and, based on this check, either renders the child
 * components or redirects the user to the login page.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { authService } from './auth-service';

/**
 * Renders a protected route that checks for user authentication.
 * If the user is authenticated, it renders the child routes; otherwise,
 * it redirects the user to the login page.
 *
 * @returns {JSX.Element} - The rendered route component based on authentication status.
 */

export const PrivateRoute = () => {
	return (
		<>
			{
				authService.isAuthenticated() ? <Outlet /> : <Navigate to='/login' />
			}
		</>
	);
};
