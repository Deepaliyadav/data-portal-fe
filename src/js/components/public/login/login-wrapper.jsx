import React from 'react';

import SignupBackground from '../../../../img/login-img.png';
import style from '../login/login.module.scss';

function LoginWrapper({ children }) {
	return (
		<div className={style['login-wrapper']}>
			<div className={style['login-img']} style={{ backgroundImage: 'url(' + SignupBackground + ')' }} />
			<div className={style['login-bg']}>
				{children}
			</div>
		</div>
	);
}

export default LoginWrapper;
