
import React from 'react';
import { Form } from 'antd';
import { useField } from 'react-final-form';
import PropTypes from 'prop-types';
import OtpInput from 'react-otp-input';

import { composeInputHandlers } from '../../../utils/input-util';

function OtpInputField({ name, className, validate, ...rest }) {

	let { input, meta } = useField(name, { validate });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';

	return (
		<Form.Item className={ className } validateStatus={ validateStatus } help={ help }>
			<OtpInput
				// renderSeparator={<span>-</span>}
				renderInput={props => <input {...props} />}
				value={input.value}
				{ ...input }
				{...rest}
				{ ...handlers }
			/>
		</Form.Item>
	);
}

/**
 * See the link below for a information about Otp input.
 * @link https://www.npmjs.com/package/react-otp-input
 */
OtpInputField.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	validate: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

export default OtpInputField;
