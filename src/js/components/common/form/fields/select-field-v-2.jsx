import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Flex, Select, Tooltip } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { isArray, isEmptyString, isNotEmptyArray, isNotEmptyObject } from 'src/js/utils/type-util';

import { Box } from '../../common-v2';

import style from './common.module.scss';

const SelectFieldV2 = ({
	data,
	value,
	mode,
	keyField,
	textField,
	iconField,
	emptyMsg,
	hasMultiOption,
	disabled,
	...rest
}) => {
	const empty = (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={emptyMsg ?? 'No Data Available'}
		/>
	);
	return (
		<Select
			value={isEmptyString(value) ? undefined : value}
			className={style['select-component']}
			optionFilterProp='textvalue'
			mode={mode}
			disabled={disabled}
			notFoundContent={empty}
			getPopupContainer={el => el.parentNode}
			{...rest}
		>
			{isArray(data)
				? data.map((el, index) => (
					<Select.Option
						index={index}
						{...el}
						key={keyField ? el[keyField] : el}
						textvalue={textField ? el[textField] : el}
						title={textField ? el[textField] : el}
						value={keyField ? el[keyField] : el}
					>
						{iconField && el[iconField] ? (
							<img
								src={el[iconField]}
								height={20}
								width={20}
								style={{ marginRight: 5, verticalAlign: 'text-bottom' }}
								alt=''
							/>
						) : null}
						{hasMultiOption ? (
							<Flex justifyContent='space-between'>
								<Box>{textField ? el[textField] : el}</Box>
								<Tooltip
									placement='right'
									title={
										isNotEmptyObject(el.subValues) &&
                      Object.hasOwn(el, 'subValues')
											? el.subValues.join(', ')
											: ''
									}
								>
									<Box mt='1px'>
										{isNotEmptyArray(el?.subValues) ? <RightOutlined /> : ''}
									</Box>
								</Tooltip>
							</Flex>
						) : textField ? (
							el[textField]
						) : (
							el
						)}
					</Select.Option>
				))
				: null}
		</Select>
	);
};
SelectFieldV2.defaultProps = {
	hasMultiOption: false
};
SelectFieldV2.propTypes = {
	data: PropTypes.array,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	mode: PropTypes.string,
	keyField: PropTypes.string,
	textField: PropTypes.string,
	iconField: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	emptyMsg: PropTypes.node,
	customDropdownRender: PropTypes.func,
	hasMultiOption: PropTypes.bool,
	disabled: PropTypes.bool
};
export default SelectFieldV2;
