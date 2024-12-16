
import React from 'react';

// import ElectionMap from '../elections/election-map';
import PreviewDataTable from '../elections/preview-data-table';

import { Navbar } from './navbar';
import style from './app.module.scss';

function AppRoutes() {

	return (
		<div className={style['main-container']}>
			<Navbar />
			<div className={style['bottom-main']}>
				<PreviewDataTable />
			</div>
		</div>
	);
}

export default AppRoutes;
