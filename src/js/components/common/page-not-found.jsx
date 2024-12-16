import React from 'react';
// import Icon from '@ant-design/icons/lib/components/Icon';
// import NotFoundIcon from 'src/icons/not-found-icon';
import { Button } from 'antd';

import style from './common.module.scss';

function PageNotFound() {
	return (
		<div className={style['page-not-found']}>
			{/* <Icon component={NotFoundIcon} className={style['title-icon']} /> */}
			<div>
				<p className={style['title']}>Oops! The screen you are trying to explore does not exist.</p>
				<p className={style['txt']}>As the requested url was not found in the server. Please recheck the url once or go to Home Page</p>
			</div>
			<Button className={style['home-btn']} type='primary' onClick={() => window.location.replace('/')}>Home</Button>
		</div>
	);
}

export default PageNotFound;
