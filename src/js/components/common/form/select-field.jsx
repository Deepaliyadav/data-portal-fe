
import React, { useRef } from 'react';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import Form from 'antd/es/form';
import Select from 'antd/es/select';
import Divider from 'antd/es/divider';
import { useField } from 'react-final-form';
import classNames from 'classnames';
import { composeInputHandlers } from 'src/js/utils/input-util';
import { isFunction } from 'src/js/utils/type-util';

import Spinner from '../spinner';

import style from './select-field.module.scss';

function SelectField({ name, data, keyField, textField, className, customDropdownRender, customPopupClassname, validate, addable, onAdd, onRefresh, mode, type, onChange, disabled, prefix, hideValueOnLoading, loading, addText, optionsWithProfile, avoidContainer, noDataIcon, noDataMsg, prefixIconStyle = {}, ...rest }) {

	let { input, meta } = useField(name, { validate, allowNull: true });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';
	const ref = useRef();

	function onChangeCalled(e, sList) {
		if (mode === 'tags' && type === 'number' && onChange) {
			e = e.filter(v => !isNaN(Number(v)));
			input.onChange(e);
			onChange(e, sList);
		} else if (onChange) {
			input.onChange(e);
			onChange(e, sList);
		} else {
			input.onChange(e);
		}
	}

	const NotFoundContent = () => {
		if (loading) {
			return (
				<div className={style['spin-div']}>
					<Spinner />
				</div>
			);
		} else {
			return (
				<>
					<div className={style['no-data-div']}>
						{
							noDataIcon &&
				<img src={noDataIcon} />
						}
						<div>{noDataMsg || 'No Records Found!'}</div>
					</div>
				</>);
		}
	};

	return (
		(<Form.Item
			className={className}
			validateStatus={validateStatus}
			help={help} >
			{/* <div ref={ref} style={{ padding: '1px 0 1.1px' }}> */}
			<div ref={ref}>
				{prefix &&
					<div className={style.prefixIcon}
						style={prefixIconStyle}>{prefix}</div>
				}
				<Select
					mode={mode}
					className={(mode === 'multiple' || mode === 'tags') ? style['select-multiple'] : style['select-component']}
					getPopupContainer={() => avoidContainer ? document.body : ref.current}
					popupClassName={classNames(style['select-field'], customPopupClassname && customPopupClassname ,optionsWithProfile ? style['select-field-with-profile'] : '')}
					suffixIcon={<CaretDownOutlined />}
					{...input}
					{...rest}
					{...handlers}
					onChange={onChangeCalled}
					notFoundContent={<NotFoundContent />}
					loading={loading}
					value={(hideValueOnLoading && loading) ? undefined : ((data && input.value) || undefined)}
					filterOption={(input, option) => {
						if (option?.props?.title) {
							return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}
						if (option?.props?.children?.toLowerCase?.().indexOf) {
							return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						} else {
							return true;
						}
					}}
					disabled={!!disabled}
					dropdownRender={menu => customDropdownRender ? customDropdownRender(menu) : (
						<div>
							{menu}
							{addable &&
								<>
									<Divider style={{ margin: '4px 0 0' }} />
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
										<div
											style={{ padding: '6px 8px', cursor: 'pointer', width: isFunction(onRefresh) ? 'calc(100% - 40px)' : '100%' }}
											onMouseDown={e => e.preventDefault()}
											onClick={onAdd}
										>
											{
												!!addText && addText
											}
											{
												!addText &&
												<>
													<PlusOutlined className='link-color' />
													<span style={{ paddingLeft: '5px', verticalAlign: 'bottom' }} className='link-color'>Add New</span>
												</>
											}
										</div>
										<div>
											{/* {
												isFunction(onRefresh) &&
												<Tooltip title='Refresh' >
													<Icon component={RefreshIcon} className={style['refresh-icon']} onMouseDown={e => e.preventDefault()} onClick={onRefresh} />
												</Tooltip>
											} */}
										</div>
									</div>
								</>
							}
						</div>
					)}
				>
					{
						data && data.map(el => {
							if (el) {
								return (
									<Select.Option key={keyField ? el[keyField] : el} title={textField ? el[textField] : el} disabled={el.disabled}>
										{textField ? <div className={style['show-option']}>
											<span className={el?.redirectUrl ? style['text-option'] : style['select-text-div']}>{el[textField]}</span>
											{/* {el?.redirectUrl && <span onClick={() => window.open(el?.redirectUrl, '_blank')}>{<Icon component={ExternalLinkIcon} className={style['option-icon']} />}</span>} */}
										</div> : el}
									</Select.Option>
								);
							}
						})
					}
				</Select>
			</div>
		</Form.Item>)
	);
}

/**
 * See the link below for a full list of props for Select.
 * @link https://ant.design/components/select/#API
 */
SelectField.Option = Select.Option;

// SelectField.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	data: PropTypes.array,
// 	keyField: PropTypes.string,
// 	textField: PropTypes.string,
// 	className: PropTypes.string,
// 	subValueClassName: PropTypes.string,
// 	imgClassName: PropTypes.string,
// 	dotClassName: style.string,
// 	validate: PropTypes.func,
// 	onChange: PropTypes.func,
// 	onFocus: PropTypes.func,
// 	onBlur: PropTypes.func,
// 	addable: PropTypes.bool,
// 	onAdd: PropTypes.func,
// 	disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
// 	prefix: PropTypes.object,
// 	prefixIconStyle: PropTypes.object,
// 	mode: PropTypes.string,
// 	type: PropTypes.string,
// 	hideValueOnLoading: PropTypes.bool,
// 	loading: PropTypes.bool,
// 	addText: PropTypes.any,
// 	optionsWithProfile: PropTypes.bool,
// 	avoidContainer: PropTypes.bool,
// 	customDropdownRender: PropTypes.func,
// 	noDataIcon: PropTypes.string,
// 	noDataMsg: PropTypes.string,
// 	onRefresh: PropTypes.func,
// 	textClassName: PropTypes.string,
// 	optionStyle: PropTypes.string,
// 	customPopupClassname: PropTypes.string
// };

export default SelectField;
