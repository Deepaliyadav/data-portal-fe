import React from 'react';

import SignupBackground from '../../../../img/signup-bg.jpg';
import style from '../sign-up.module.scss';

function PublicWrapper({ children }) {
	return (
		<div className={style.signup} style={{ background: 'url(' + SignupBackground + ')' }}>
			{children}
		</div>
	);
}

export default PublicWrapper;
