import React from 'react';
import { Radio } from 'antd';
import classNames from 'classnames';

import style from '../common.module.scss';

function RadioGroup({ isFilters, className, ...rest }) {
	return (
		<Radio.Group
			className={classNames(isFilters && style['filter-div'], className)}
			{ ...rest }
		/>
	);
}

export default RadioGroup;
