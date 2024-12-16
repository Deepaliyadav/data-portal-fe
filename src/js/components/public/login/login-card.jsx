import classNames from 'classnames';
import React from 'react';
import QwerkLogo from 'src/icons/login-signup/qwerk-logo';
import Icon from '@ant-design/icons/lib/components/Icon';

import style from './login.module.scss';

function LoginCard({ className, children, styling }) {
	return (
		<div className={classNames(style.loginCard, className)} style={{ styling }}>
			<div className={style['qwerk-logo']}>
				    <Icon component={QwerkLogo} />
			</div>
			<p className={style['title']}>Login to Your Account</p>
			{children}
			<div className={style['register-footer']}>
				<span>Don&apos;t have an Account?</span>
			</div>
		</div>
	);
}

export default LoginCard;
