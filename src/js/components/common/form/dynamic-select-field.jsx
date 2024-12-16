import React, { useEffect, useState } from 'react';
import { Spin, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { isFunction, isNonEmptyString, isNotEmptyArray } from 'src/js/utils/type-util';
import { convertObjectToParamString, convertParamStringToObject, getUniqueArray } from 'src/js/utils/object-util';
import { api } from 'src/js/api';

import SelectField from './select-field';

/**
 * @param {Object} [initialSelected] Initial Data that is Selected
 * @param {String} [uniqueKey] uniqueKey should be a unique key in object.
 * @param {String} [dontCall] dontCall isa boolean to stop the calling of the API.
 * @param {Object} [setData] It is a function to store the data in state.
 * @param {Boolean} [minStringSearchLength]
 * @param {Boolean} [onSearch] Function that executes on searching in select field.
 * @param {Number} [name] It is name of the form field element.
 * @param {Boolean} [hideInitalSelected] Hide all the Intital selected content from the list.
 * @returns {Node} It returns Table component.
 */

function DynamicSelectField({ initialSelected, uniqueKey = 'key', dontCall, setData, minStringSearchLength, onSearch, name, hideInitalSelected, preventKey, ...rest }) {
	const { params, apiUrl, addable, onRefresh, onAdd, addText, dynamicSearch, extraFooter } = rest;
	const [loading, setLoading] = useState(false);
	const [newData, setNewData] = useState([]);

	useEffect(() => {
		if (isNotEmptyArray(initialSelected)) {
			let updatedNewData = [];
			if (isNotEmptyArray(newData)) {
				updatedNewData = [...newData ];
			}
			updatedNewData = [ ...updatedNewData, ...initialSelected ];
			let filteredArr = getUniqueArray(updatedNewData, uniqueKey);
			setNewData(filteredArr);
		}
	}, [initialSelected]);

	const apiCall = searchString => {
		setLoading(true);
		let param = '';
		let paramObj = {};
		if (dynamicSearch) {
			paramObj = { ...paramObj, q: searchString };
		}
		if (isNonEmptyString(params)) {
			paramObj = convertParamStringToObject(params);
		}
		param = convertObjectToParamString(paramObj);
		let url = apiUrl + param;
		api.callGet({ url: url })
			.then(response => {
				if (response?.data?.s) {
					let filteredArr = [];
					if (isNotEmptyArray(initialSelected)) {
						let updatedNewData;
						if (hideInitalSelected) {
							updatedNewData = response.data.data?.filter(obj => {
								return !initialSelected.map(obj => obj[uniqueKey]).includes(obj[uniqueKey]);
							});
						} else {
							updatedNewData = [...response.data.data, ...initialSelected];
						}
						filteredArr = getUniqueArray(updatedNewData, uniqueKey);
					} else {
						filteredArr = [...response.data.data];
					}
					if (preventKey) {
						filteredArr = filteredArr.filter(el => {
							if (!el[preventKey]) return el;
						});
					}
					setNewData(filteredArr);
					if (isFunction(setData)) {
						setData(filteredArr);
					}
				} else {
					setNewData([]);
					if (isFunction(setData)) {
						setData([]);
					}
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const callApiOnOpenDropdown = open => {
		if ((!open || dontCall)) {
			return;
		}
		apiCall();
	};
	const onSearchData = e => {
		let val = e.trim() || '';
		if (dynamicSearch && e.length === val.length && !loading && minStringSearchLength < e.length) {
			const searchString = encodeURIComponent(val);
			apiCall(searchString);
		}
		if (typeof onSearch === 'function') onSearch();
	};
	const customSelectDropdown = menu => {
		if (loading && !isNotEmptyArray(newData?.data)) {
			return (
				<div style={{ width: '100%', minHeight: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Spin size='small' />
				</div>
			);
		}
		return (
			<div>
				{menu}
				<>{extraFooter}</>
				{addable && (
					<>
						<Divider style={{ margin: '4px 0 0' }} />
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div
								style={{
									padding: '6px 8px',
									cursor: 'pointer',
									width: isFunction(onRefresh) ? 'calc(100% - 40px)' : '100%'
								}}
								onMouseDown={e => e.preventDefault()}
								onClick={onAdd}>
								{!!addText && addText}
								{!addText && (
									<>
										<PlusOutlined className='link-color' />
										<span style={{ paddingLeft: '5px', verticalAlign: 'bottom' }} className='link-color'>
                                            Add New
										</span>
									</>
								)}
							</div>
							{/* <div>
								{isFunction(onRefresh) && (
									<TooltipHelp helpText='Refresh'>
										<Icon
											component={RefreshIcon}
											className={style['refresh-icon']}
											onMouseDown={e => e.preventDefault()}
											onClick={onRefresh}
										/>
									</TooltipHelp>
								)}
							</div> */}
						</div>
					</>
				)}
			</div>
		);
	};
	return (
		<SelectField
			onDropdownVisibleChange={callApiOnOpenDropdown}
			hideValueOnLoading={false}
			customDropdownRender={customSelectDropdown}
			data={isNotEmptyArray(newData) ? newData : hideInitalSelected ? [] : initialSelected}
			onSearch={onSearchData}
			name={name}
			{...rest}
		/>
	);
}

export default DynamicSelectField;
