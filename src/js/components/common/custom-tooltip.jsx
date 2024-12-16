import { Tooltip } from 'antd';
import React from 'react';

import style from './common.module.scss';

function CustomTooltip({ children, title, placement, cc = '', subTitle = '' }) {

	const text = (
		<div className={style['tooltip-title']}>
			<div className={style['title-1']}>{title}</div>
			<div className={style['title-2']}>{subTitle}</div>
		</div>
	);

	return (
		<Tooltip
			color={cc || '#1CFFB5'}
			title={title ? text : ''}
			placement={placement}
			overlayClassName={style['tooltip-overlay']}
		>
			{children}
		</Tooltip>
	);
}

export default CustomTooltip;
