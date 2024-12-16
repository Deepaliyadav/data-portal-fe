
import React, { useEffect } from 'react';
import { useField } from 'react-final-form';
import { Form, Switch } from 'antd';
import PropTypes from 'prop-types';
import { composeInputHandlers } from 'src/js/utils/input-util';

function SwitchField({ name, className, defaultValue, ...rest }) {

	let { input, meta } = useField(name, { type: 'checkbox', defaultValue: defaultValue });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';

	useEffect(() => {
		if (input.value === undefined || input.value === '') {
			input.onChange(input.checked);
		}
	}, [input.value]);

	return (
		<Form.Item className={className} validateStatus={validateStatus} help={help}>
			<Switch
				{...input}
				{...rest}
				{...handlers}
				checked={input.checked}
			/>
		</Form.Item>
	);
}

/**
 * See the link below for a full list of props for Switch.
 * @link https://ant.design/components/switch/#API
 */
SwitchField.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	defaultValue: PropTypes.bool,
	onChange: PropTypes.func,
	validate: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

export default SwitchField;
