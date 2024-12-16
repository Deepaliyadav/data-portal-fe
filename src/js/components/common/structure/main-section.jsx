import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useCurrentUser } from 'src/js/hooks';

import ErrorBoundary from '../layout/error-boundary';

import style from './main-section.module.scss';

export default function MainSection({ leftContent, extraContent, className, headerClassName, rightContent, children, hideHeader, styles, containerStyle = {} }) {
	const header = useRef(null);
	const [user] = useCurrentUser();
	const rightRef = useRef();

	function getStyles() {
		let styles = { display: 'flex' };
		let width = rightRef?.current?.clientWidth;
		if (width) {
			styles.width = `calc(100% - ${ width + 20 }px)`;
		}
		return styles;
	}
	return (
		<div
			className={classNames(style['main-container'], user?.showSideMenu ? style['new-main-container'] : null, className)}
			style={{ ...styles }}
		>
			<ErrorBoundary>
				{
					!hideHeader &&
					<div
						ref={header}
						className={classNames(style['main-container-header'], headerClassName)}
					>
						<div style={{ ...getStyles() }}>{leftContent}</div>
						{extraContent}
						<div ref={rightRef}>{rightContent}</div>
					</div>
				}
				<div className={style['container-body']} style={{ ...containerStyle }}>
					{children}
				</div>
			</ErrorBoundary>
		</div>
	);
}

MainSection.propTypes = {
	children: PropTypes.node,
	leftContent: PropTypes.node,
	extraContent: PropTypes.node,
	className: PropTypes.string,
	headerClassName: PropTypes.string,
	rightContent: PropTypes.node,
	mediaQuery: PropTypes.bool,
	hideHeader: PropTypes.bool,
	styles: PropTypes.object,
	containerStyle: PropTypes.object
};
