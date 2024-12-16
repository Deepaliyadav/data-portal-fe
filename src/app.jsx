import React from 'react';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Session from './js/components/app/session.jsx';
import PageNotFound from './js/components/common/page-not-found.jsx';

function App() {
	return (
		<Compatible>
			<RouterProvider router={router} />
		</Compatible>
	);
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* <Route element={<PrivateRoute />}> */}
			<Route path='/*' element={<Session />} />
			{/* </Route> */}
			{/* <Route element={<AuthRoute />}>
				<Route path='/login' element={<Login />} />
			</Route> */}
			<Route path='*' element={<PageNotFound />} />
		</>
	)
);

function Compatible({ children }) {
	return (
		<ConfigProvider
			theme={{
				hashed: false
			}}
		>
			{children}
		</ConfigProvider>
	);
}

export default App;
