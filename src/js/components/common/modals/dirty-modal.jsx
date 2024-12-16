import { Modal } from 'antd';
import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

function DirtyModal({ dirty }) {

	let blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
		  dirty &&
		  currentLocation.pathname !== nextLocation.pathname
	  );

	useEffect(() => {
		if (blocker.state === 'blocked') {
			Modal.confirm({
				title: 'Changes Are Not Saved !',
				content: 'The current page contains unsaved changes that will be lost if you leave this page. Do you really want to discard your changes?',
				onOk: blocker.proceed,
				onCancel: blocker.reset,
				icon: null,
				okText: 'Proceed'
			});
		}
	}, [blocker]);
}

export default DirtyModal;
