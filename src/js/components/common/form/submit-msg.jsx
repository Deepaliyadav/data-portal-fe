
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './submit-msg.module.scss';

function SubmitMsg({ className, msg, styles }) {
	return (
		<span className={classNames(style[className], className)} style={styles}>{ msg }</span>
	);
}

SubmitMsg.propTypes = {
	className: PropTypes.string,
	msg: PropTypes.string.isRequired,
	styles: PropTypes.object
};

export default SubmitMsg;
