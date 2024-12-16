
import React from 'react';
import { useField } from 'react-final-form';
import PropTypes from 'prop-types';
import { ColorPicker, Form } from 'antd';
import Icon from '@ant-design/icons';
import classNames from 'classnames';
import { composeInputHandlers } from 'src/js/utils/input-util';
import CrossIcon from 'src/icons/cross-icon';

import style from './common.module.scss';

function ColorField({ name, className, validate, initialValue, onChange, allowClear, colorFieldStyle, ...rest }) {
	let { input, meta } = useField(name, { validate, initialValue: initialValue });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';

	const changeFunction = value => {
		input.onChange(value.toHexString());
		if (onChange) {
			onChange(value.toHexString());
		}
	};
	const onClear = () => {
		input.onChange('');
	};

	return (
		<Form.Item className={className} validateStatus={validateStatus} help={help}>
			<div className={classNames(style['color-field'], colorFieldStyle)}>
				<div className={style['selector']}>
					<ColorPicker {...input} {...handlers} {...rest} value={input.value} rootClassName={style['color-picker-sam']} onChange={changeFunction} showText={!!input.value}>
						{!input.value && <div className={style['text']}>Please select a color</div>}
					</ColorPicker>
					{input.value && allowClear &&
						<Icon onClick={onClear} component={CrossIcon} className={style['icon']} />
					}
				</div>
			</div>
		</Form.Item>
	);
}

/**
 * See the link below for a full list of props for Switch.
 * @link https://swiftcarrot.dev/react-input-color
 */
ColorField.propTypes = {
	name: PropTypes.string.isRequired,
	validate: PropTypes.func,
	className: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	title: PropTypes.string,
	initialValue: PropTypes.string,
	allowClear: PropTypes.bool,
	colorFieldStyle: PropTypes.string
};

export default ColorField;
