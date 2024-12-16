/**
 * This component serves as a protected route handler that restricts access to certain routes
 * based on the provided `isAllowed` condition. It renders child components if the access is
 * permitted; otherwise, it displays a "Page Not Found" component, effectively denying access.
 */

import React from 'react';
import { Outlet } from 'react-router-dom';

import PageNotFound from '../components/common/page-not-found';

/**
 * Renders a protected route based on the access permission defined by the `isAllowed` prop.
 * If access is not allowed, it shows the "Page Not Found" component; otherwise, it renders
 * the specified children or the nested routes.
 *
 * @param   {boolean}  isAllowed - A flag indicating whether access is permitted.
 * @param   {JSX.Element}  children - Optional children elements to render if access is allowed.
 * @returns {JSX.Element} - The rendered component based on the access condition.
 */

export const ProtectedRoute = ({
	isAllowed,
	children
}) => {
	if (!isAllowed) {
		return <PageNotFound />;
	}

	// Render the provided children if available; otherwise, render nested routes using Outlet.
	return children ? children : <Outlet />;
};
