import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Button } from 'antd';
import { isNotEmptyObject } from 'src/js/utils/type-util';

import style from './common.module.scss';

function CommonNoDataLayout({ title = '', subtitle = {}, button = {}, icon }) {
	return (
		<div className={style['no-data-section']}>
			<div className={style['data-inner']}>
				{icon && <Icon component={icon} />}
				<div className={style['title-1']}>{title}</div>
				<div className={style['title-2']}>{subtitle?.text1}</div>
				<div className={style['title-2']}>{subtitle.text2}</div>
				{isNotEmptyObject(button) && <Button
					type='primary'
					onClick={button.onClick}
					className={style['create-btn']}
				>
					<Icon component={button.icon} />
					<span>{button.label}</span>
				</Button>}
			</div>
		</div>
	);
}

export default CommonNoDataLayout;
