import React from 'react';

import style from './main-section.module.scss';

export default function LeftContent({ data }) {
	return (
		<div className={style['left-container']}>
			<div className={style['inner-cont']}>
				<div className={style['page-title']}>{data.title}</div>
			</div>
		</div>
	);
}

