
import React from 'react';
import { Form, Radio } from 'antd';
import { useField } from 'react-final-form';
import PropTypes from 'prop-types';
import { composeInputHandlers } from 'src/js/utils/input-util';

function RadioGroupField({ name, className, validate, ...rest }) {

	let { input, meta } = useField(name, { validate });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';

	return (
		<Form.Item className={ className } validateStatus={ validateStatus } help={ help }>
			<Radio.Group
				{ ...input }
				{ ...rest }
				{ ...handlers }
			/>
		</Form.Item>
	);
}

/**
 * See the link below for a full list of props for Radio.
 * @link https://ant.design/components/radio/#API
 */
RadioGroupField.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	validate: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

export default RadioGroupField;
