import React from 'react';

import style from './main-section.module.scss';
import TitleBar from './title-bar';

export function ContentTitleBar({ title, config = {} }) {

	return (
		<div className={style['content-title-bar']}>
			<TitleBar title={title ? title : ''}>
				<div className='horizontal-flow align-center gap-10'>
					{config.children}
				</div>
			</TitleBar>
		</div>
	);
}
