
import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import { useField } from 'react-final-form';
import PropTypes from 'prop-types';

import { composeInputHandlers } from '../../../utils/input-util';

function CheckboxField({ name, label, value, hint, defaultChecked, desc, styles = {}, ...rest }) {

	let { input } = useField(name, { value, type: 'checkbox', defaultValue: defaultChecked });
	let handlers = composeInputHandlers(input, rest);

	return (
		<Tooltip title={hint || ''}>
			<Checkbox {...input} {...rest} {...handlers}>
				{label}
				{desc && <div style={styles}>{desc}</div>}
			</Checkbox>
		</Tooltip>
	);
}

/**
 * See the link below for a full list of props for Checkbox.
 * @link https://ant.design/components/checkbox/#API
 */
CheckboxField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	value: PropTypes.string,
	desc: PropTypes.string,
	defaultChecked: PropTypes.bool,
	hint: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	styles: PropTypes.object
};

export default CheckboxField;
