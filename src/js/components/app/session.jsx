
import React, { useState, useRef, memo } from 'react';
import { AppContext } from 'src/js/global/context';
import Store from 'src/js/global/store';

import ErrorBoundary from '../common/layout/error-boundary.jsx';

import AppRoutes from './app-routes';

function Session() {
	const [user, setUser] = useState(Store.host);

	let userRef = useRef(null);
	userRef.current = user;

	const syncUser = data => {
		setUser({ ...userRef.current, ...data });
	};

	return (
		<>
			<ErrorBoundary>
				<AppContext.Provider
					value={{
						user,
						syncUser
					}}
				>
					<AppRoutes />
				</AppContext.Provider>
			</ErrorBoundary>
		</>
	);
}

export default memo(Session);
