/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
// import NotFoundIcon from 'src/icons/not-found-icon';
// import NoInternetError from 'src/icons/no-internet-error';
// import SomethingWentWrongError from 'src/icons/something-went-wrong-error';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useOnlineStatus } from 'src/js/hooks';

import styles from './common.module.scss';

export default function ErrorApi(params) {
	const { msg } = params;
	const onlineStatus = useOnlineStatus();
	const [errorMsg, setErrorMsg] = useState({ errorMsg: msg, subErrorMsg: 'We encountered an error while fetching the data, we are working on to fix the problem. Please refresh and try again.'  });

	useEffect(() => {
		if (msg && typeof msg === 'string') {
			if (msg.includes('Network')) setErrorMsg({ errorMsg: 'Slow or no internet connection' , subErrorMsg: 'Seems you are not connected to internet, please check your internet and try again' });
			else if (msg.includes('timed')) setErrorMsg({ errorMsg: <div>Oops! <span className={styles['error-no']}>408</span> Request timed out</div> , subErrorMsg: 'This request takes too long to process by the server. Please refresh and try again.' });
			else if (msg.includes('503')) setErrorMsg({ errorMsg: <div>Oops! <span className={styles['error-no']}>503</span> Something went wrong</div> , subErrorMsg: 'We encountered an error while fetching the data, we are working on to fix the problem. Please refresh and try again.' });
			else if (msg?.includes('401')) setErrorMsg({ errorMsg: <div>Oops! <span className={styles['error-no']}>401</span> Access Error</div> , subErrorMsg: 'You do not have the necessary permissions to access.' });
		}
	},[msg]);

	let reload = () => {
		window.location.reload();
	};

	const GetComponent = field =>
		({
			INVALID_DATA: <InvalidData />,
			OFFLINE: <CheckOnlineStatus />
		}[field]
		?? <ValidData
			reload={reload}
			{...params}
			errorMsg={errorMsg}
		/>);

	return (
		<>
			{GetComponent(onlineStatus ? '' : 'OFFLINE')}
		</>
	);
}
function InvalidData() {
	let loc = location.pathname.split('/')[1];
	let tab = {
		roadmap: 'roadmaps',
		feedback: 'feedbacks',
		changelog: 'changelogs'
	}[loc];
	// const { widget = false } = convertParamStringToObject(history.location.search);

	return (
		<div className={styles['page-not-found']}>
			{/* <Icon component={NotFoundIcon} className={styles['title-icon']} /> */}
			<div>
				<p className={styles['title']}>Oops! The {tab} you are trying to explore does not exist.</p>
				<p className={styles['txt']}>As the requested url was not found in the server. Please recheck the url once or start exploring other {tab} by clicking below</p>
			</div>
			<Button className={styles['home-btn']}>Explore other {tab}</Button>
		</div>
	);
}

function ValidData({ style, msg, iconWidth, errorMsgStyle, errorMsg, subErrorMsgStyle, pageReload, refreshCall, hideBottomButton, styleHomeBtn, reload, buttonLabel }) {
	return (
		<div className={styles.errordiv} style={style}>
			<div className={styles['offline-status']}>
				{/* {msg && typeof msg === 'string' && <Icon className={styles['error-icon']} style={{ width: iconWidth ? iconWidth : msg.includes('Network') ? '84px' : '104px' }} component={msg.includes('Network') ? NoInternetError : SomethingWentWrongError} />} */}
				<h1 className={styles.error} style={errorMsgStyle}>{errorMsg?.errorMsg}</h1>
				{errorMsg?.subErrorMsg && <div className={styles['sub-error']} style={subErrorMsgStyle} >{errorMsg.subErrorMsg}</div>}
				{
					(pageReload || refreshCall) && !hideBottomButton &&
					<Button type='primary' style={styleHomeBtn} className={styles.goHome} onClick={() => refreshCall ? refreshCall() : reload()}>
						{buttonLabel || 'Refresh'}
					</Button>
				}
			</div>
		</div>
	);
}

const CheckOnlineStatus = ({}) => {
	return (
		<>
			<div className={styles.notifyContainer}>
				<div className={styles['offline-status']}>
					{/* <Icon className={styles['error-icon']} style={{ width: '90px' }} component={NoInternetError} /> */}
					<div className={styles.heading}>Slow or no internet connection</div>
					<p className={styles.msg}>Seems you are not connected to internet, please check your internet and try again</p>
					<Button type='primary' onClick={() => null}>Refresh</Button>
				</div>
			</div>
		</>
	);
};
