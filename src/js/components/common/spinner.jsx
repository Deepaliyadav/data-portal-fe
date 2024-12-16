
import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import style from './common.module.scss';

function Spinner({ className = '', ...rest }) {

	return (
		<div className={ className || style.container }>
			<Spin { ...rest } />
		</div>
	);
}

Spinner.propTypes = {
	show: PropTypes.bool,
	className: PropTypes.string,
	filterKey: PropTypes.string
};

export default Spinner;
