
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './public-layout.module.scss';

function PublicCard({ className, children, styling }) {
	return (
		<div className={classNames(style.card, className)} style={{ styling }}>
			{children}
		</div>
	);
}

PublicCard.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	styling: PropTypes.object
};

export default PublicCard;
