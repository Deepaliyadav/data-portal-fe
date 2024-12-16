import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { responseError } from 'src/js/utils/object-util';
import { api } from 'src/js/api';
import { toast } from 'react-toastify';

import CommonModal from '../common-modal';

import style from './modal.module.scss';

function ConfirmationModal({ open, onCancel, data = {}, refreshCallback, apiData = {}, wrapClassName, onConfirm, disabled, ...rest }) {
	const [load, setLoad] = useState();

	const onSubmit = () => {
		if (typeof onConfirm === 'function') {
			onConfirm();
			return;
		}
		setLoad(true);
		let request = apiData.type === 'POST' ? api.callPostwithParams : api.callGetwithParams;
		if (apiData.type === 'DELETE') request = api.callDeleteWithParams;
		return request({ url: apiData.url, data: apiData.data, params: apiData.params })
			.then(response => {
				let data = response.data;
				if (data.s) {
					setTimeout(() => {
						toast.success((data.msg || 'Success!') || 'Something went wrong!', { autoClose: 2000, hideProgressBar: true, theme: 'colored', position: 'bottom-right' });
						if (typeof refreshCallback === 'function') refreshCallback(data);
						onCancel();
						setLoad(false);
					},1000);
				} else if (data.ed) {
					handleError(data.ed);
				}
			}, error => {
				handleError(responseError(error));
			});
	};

	function handleError(msg) {
		setLoad(false);
		toast.error(msg || 'Something went wrong!', { autoClose: 4000, hideProgressBar: true, theme: 'colored', position: 'bottom-right' });
	}

	return (
		<CommonModal
			isOpen={open}
			hideHeader
			className={style['confirm-modal']}
			bodyClassName={style['confirm-body']}
			// closeIcon={null}
			centered
			width={570}
			wrapClassName={wrapClassName}
			onRequestClose={onCancel}
			{...rest}
		>
			<div className={style['container-body']}>
				<div className={style['user-thumb']}>
					<UserOutlined />
				</div>
				<div className={style['header']}>
					<span>{data.header?.title} </span>
					<span className='link-color'>{data.header?.subtitle}</span>
				</div>
				<div className={style['text-container']}>
					<div className={style['text1']}>{data.text}</div>
					<div className={style['text2']}>{data.subText}</div>
				</div>
				{data.children}
				<Button
					type='primary'
					className={style['action-btn']}
					onClick={onSubmit}
					disabled={load || disabled}
					loading={load}
				>
					{data.actionBtn?.title}
				</Button>
			</div>
		</CommonModal>
	);
}

export default ConfirmationModal;
