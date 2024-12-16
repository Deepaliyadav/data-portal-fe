
import React from 'react';
import PropTypes from 'prop-types';

import style from './main-section.module.scss';

function TitleBar({ title, children, isSideMenu }) {

	return (
		<div className={ style.titleBar } style={isSideMenu ? { height: '45px' } : {}}>
			<h1 className={ style.title }>{ title }</h1>
			{ children }
		</div>
	);
}

TitleBar.propTypes = {
	title: PropTypes.node,
	children: PropTypes.node,
	isSideMenu: PropTypes.bool
};

export default TitleBar;
