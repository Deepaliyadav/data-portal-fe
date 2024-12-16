/* eslint-disable no-new-func */

import React, { useEffect, useRef } from 'react';
import { Form, Input } from 'antd';
import { useField } from 'react-final-form';
import PropTypes from 'prop-types';

import { composeInputHandlers } from '../../../utils/input-util';
import { isNotEmptyArray, isNotEmptyObject, isStringNumeric } from '../../../utils/type-util';

/**
 * @param {Boolean} [noZeroAtStart] It is to prevent zero from typing from zero.
 * @param {Node} [lastAppendText] It is to append something at the suffix of the input.
 * @param {Boolean} [allowNegative] It is to allow negative numbers in input field.
  */

function InputField({ name, formName, className, defaultValue, lastAppendText, wholeDigits, type, validate, inputFunctionString, disabled, formula, values, allowNegative, preventDecimal, noZeroAtStart, upperCase, numberType, hasFeedback, ...rest }) {

	let { input, meta } = useField(name, { validate, defaultValue: defaultValue });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : (hasFeedback && meta.touched && input.value) ? 'success' : '';
	let help = meta.touched ? meta.error : '';
	const ref = useRef(null);

	let valueObj = ((values && formName) ? values[formName] : values) || {};
	const getValue = value => {

		let newValue = value;
		if (rest?.id && type === 'number') {
			let inputBox = document.getElementById(rest.id);
			if (inputBox) {
				var invalidChars = ['+', 'e'];
				if (allowNegative) {
					newValue = value.replace(/[e\+]/gi, '');
				} else {
					newValue = value.replace(/[e\+\-]/gi, '');
					invalidChars.push('-');
				}
				if (!wholeDigits && value.length >= 17) {
					newValue = input.value;
				} else if (value && value < 0.001 && !allowNegative) {
					newValue = 0;
				}

				if (preventDecimal) {
					newValue = value.replace(/[e\+\-\.]/gi, '');
					invalidChars.push('.');
				}
			}
			if (noZeroAtStart && value === '0') {
				newValue = '';
			}

			inputBox.addEventListener('keydown', e => {
				if (invalidChars.includes(e.key)) e.preventDefault();
			});
		}

		return { target: { value: upperCase ? newValue.toUpperCase() : newValue } };
	};

	function doChangeVal(v) {
		let value = getValue(v?.target?.value);
		input.onChange(value);

		if (rest.onChange) {
			rest.onChange(value);
		}
	}

	useEffect(() => {
		if (input.value && inputFunctionString && new Function('return ' + inputFunctionString)()) {
			let func = new Function('return ' + inputFunctionString)();
			doChangeVal({ target: { value: func(input.value) } });
		}
	}, [input.value]);

	function onChange(v) {
		if (numberType || wholeDigits) {
			let value = v?.target?.value;
			value = value.replace(/[^0-9]*/g,'');
			let lastCharacter = value.substr(value.length - 1);
			if (!isStringNumeric(lastCharacter)) {
				value = value.substring(0, value.length - 1);
			}
			v.target.value = value;
			doChangeVal(v);
		} else {
			doChangeVal(v);
		}
	}

	useEffect(() => {
		if (formula) {
			let newAllFieldsData = rest && isNotEmptyArray(rest.allFieldsData) ? [...rest.allFieldsData] : [];
			let newVal = getValueFromFormula(formula, valueObj, newAllFieldsData, input.value);
			if ((type === 'NUMBER' || type === 'number') && (Number(newVal) >= 1) && newVal.indexOf('.') !== -1) {
				newVal = parseFloat(Number(newVal)).toFixed(2);
			}
			if (newVal) {
				setTimeout(() => {
					input.onChange(newVal);
				},[]);
			} else if (input.value !== '') {
				input.onChange('');
			}
		}
		return () => null;
	}, [JSON.stringify(values)]);

	if (type === 'password') {
		return (
			<Form.Item className={className} validateStatus={validateStatus} help={help} hasFeedback={hasFeedback}>
				<Input.Password
					{...input}
					{...rest}
					autoComplete='new-password'
					{...handlers}
					onChange={onChange}
					addonAfter={lastAppendText}
				/>
			</Form.Item>
		);
	}

	return (
		<Form.Item className={className} validateStatus={validateStatus} help={help} hasFeedback={hasFeedback}>
			<Input
				ref={ref}
				type={type}
				{...input}
				{...rest}
				{...handlers}
				onChange={onChange}
				disabled={disabled}
				addonAfter={lastAppendText}
			/>
		</Form.Item>
	);
}

function getValueFromFormula(formulaString, valueObj, allFieldsData, defaultValue) {
	let tempFormulaString = formulaString;
	let newValObj = {};
	try {
		if (tempFormulaString) {
			newValObj = isNotEmptyObject(valueObj) ? { ...valueObj } : {};
			for (let i = 0; i < formulaString.length; i++) {
				let charAt = formulaString.charAt(i);
				if (charAt === '[') {
					let nextIndex = formulaString.indexOf(']', i);
					if (nextIndex > 0) {
						let placeHolder = formulaString.substring(i + 1, nextIndex);
						let value = newValObj[placeHolder];
						let typeDefaultValue;
						if (isNotEmptyArray(allFieldsData)) {
							let placeholderField = allFieldsData.find(el => el.id === placeHolder);
							if (placeholderField) {
								if (placeholderField.type === 'TEXT' || placeholderField.type === 'text') {
									typeDefaultValue = '';
								} else if (placeholderField.type === 'NUMBER' || placeholderField.type === 'number') {
									typeDefaultValue = 0;
								}
							}
						}
						if (value || value === 0 || value === '') {
							if (!isNaN(value)) {
								newValObj[placeHolder] = Number(value);
							}
							tempFormulaString = tempFormulaString.replaceAll(`[${ placeHolder }]`, `feValObj['${ placeHolder }']`);
						} else if (typeDefaultValue === '' || typeDefaultValue === 0) {
							newValObj[placeHolder] = typeDefaultValue;
							tempFormulaString = tempFormulaString.replaceAll(`[${ placeHolder }]`, `feValObj['${ placeHolder }']`);
						} else {
							newValObj[placeHolder] = 0;
							tempFormulaString = tempFormulaString.replaceAll(`[${ placeHolder }]`, `feValObj['${ placeHolder }']`);
							// tempFormulaString = defaultValue || '';
							// break;
						}

						i = nextIndex;
					}
				}
			}
		} else {
			tempFormulaString = defaultValue || '';
		}
		if (tempFormulaString) {
			let func = new Function('return function newFunction(feValObj){return ' + tempFormulaString + '}')();
			tempFormulaString = func(newValObj);
		}
	} catch {
		tempFormulaString = defaultValue || '';
	}
	return tempFormulaString.toString();
}

InputField.defaultProps = {
	noZeroAtStart: false,
	hasFeedback: false
};

/**
 * See the link below for a full list of props for Input.
 * @link https://ant.design/components/input/#API
 */
InputField.propTypes = {
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	values: PropTypes.object,
	formula: PropTypes.string,
	formName: PropTypes.string,
	className: PropTypes.string,
	defaultValue: PropTypes.string,
	lastAppendText: PropTypes.string,
	validate: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	type: PropTypes.string,
	onBlur: PropTypes.func,
	inputFunctionString: PropTypes.string,
	allowNegative: PropTypes.bool,
	noZeroAtStart: PropTypes.bool,
	upperCase: PropTypes.bool,
	numberType: PropTypes.bool,
	hasFeedback: PropTypes.bool,
	preventDecimal: PropTypes.bool,
	blurOnEnter: PropTypes.bool,
	wholeDigits: PropTypes.number,
	decimalDigits: PropTypes.number
};

export default InputField;
