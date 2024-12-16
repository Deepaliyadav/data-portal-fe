import React from 'react';
import { useField } from 'react-final-form';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { composeInputHandlers } from 'src/js/utils/input-util';

function TextAreaField({ name, className, validate, row, ...rest }) {
	let { input, meta } = useField(name, { validate });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';

	return (
		<Form.Item className={className} validateStatus={validateStatus} help={help}>
			<Input.TextArea
				{...input}
				rows={row || 1}
				{...rest}
				{...handlers}
			/>
		</Form.Item>
	);
}

/**
 * See the link below for a full list of props for Switch.
 * @link https://ant.design/components/input/#Input.TextArea
 */
TextAreaField.propTypes = {
	name: PropTypes.string.isRequired,
	validate: PropTypes.func,
	className: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	row: PropTypes.string
};

export default TextAreaField;
