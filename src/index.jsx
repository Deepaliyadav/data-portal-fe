import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/elections.scss?global';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import { QueryClient, QueryClientProvider } from 'react-query';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<>
		{/* <React.StrictMode> */}
		<App />
		<ToastContainer />
		{/* </React.StrictMode> */}
	</>
);
