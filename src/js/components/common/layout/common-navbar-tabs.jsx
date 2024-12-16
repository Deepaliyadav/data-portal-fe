import { Menu } from 'antd';
import React from 'react';

import style from './card.module.scss';

function CommonNavbarTabs({ data, onChange, selectedKey }) {
	return (
		<div className={style['navbar-container']}>
			<Menu onClick={onChange} selectedKeys={selectedKey} mode='horizontal' items={data} />
		</div>
	);
}

export default CommonNavbarTabs;
