import React from 'react';
import classNames from 'classnames';

import CommonModal from '../common-modal';

import style from './modal.module.scss';

function ConfirmationModalWrapper({ children, onCancel, open, className, ...rest }) {
	return (
		<CommonModal
			isOpen={open}
			hideHeader
			className={classNames(style['confirm-wrapper-modal'], className)}
			bodyClassName={style['confirm-wrapper-body']}
			centered
			width={570}
			onRequestClose={onCancel}
			{...rest}
		>
			{children}
		</CommonModal>
	);
}

export default ConfirmationModalWrapper;
