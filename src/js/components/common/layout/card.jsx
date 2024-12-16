
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './card.module.scss';

function Card({ title, className, children, styles = {} }) {

	return (
		<div className={ classNames(style.card, className) } style={{ ...styles }}>
			{ title && <div className={ style.title }>{ title }</div> }
			{ children }
		</div>
	);
}

Card.propTypes = {
	title: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	styles: PropTypes.object
};

export default Card;
