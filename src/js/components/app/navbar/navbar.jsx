import React from 'react';
// import { BeansLogo } from 'src/img';

import style from './navbar.module.scss';

function Navbar() {
	return (
		<div className={style['navbar-container']}>
			{/* <img src={BeansLogo} /> */}
			Data Portal
		</div>
	);
}

export default Navbar;
