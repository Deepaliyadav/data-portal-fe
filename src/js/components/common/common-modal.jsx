import { Modal } from 'antd';
import React from 'react';
import classNames from 'classnames';

import style from './common.module.scss';

function CommonModal({ isOpen, title, children, onRequestClose, className, headerClassName, bodyClassName, ...rest }) {
	return (
		<Modal
			title={title}
			open={isOpen}
			onCancel={onRequestClose}
			footer={null}
			classNames={{
				header: headerClassName,
				body: bodyClassName,
				wrapper: classNames(style['wrapper-modal'], className)
			}}
			{...rest}
		>
			{children}
		</Modal>
	);
}

export default CommonModal;
