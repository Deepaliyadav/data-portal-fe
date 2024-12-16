import { Children } from 'react';
// import { isFragment } from 'react-is';

import { isFunction } from './type-util';

/**
 * Assigns a value to a ref function or object.
 */
export function assignRef(ref, value) {
	if (isFunction(ref)) {
		ref(value);
	} else if (ref) {
		// @ts-ignore
		ref.current = value;
	}
}

/**
 * Returns children as an array of elements.
 */
export function childrenToArray(children) {
	let arr = [];

	Children.forEach(children, child => {
		if (child === undefined || child === null) {
			return;
		}

		if (Array.isArray(child)) {
			arr = arr.concat(childrenToArray(child));
		// } else if (isFragment(child) && child.props) { // uncomment this line and use 'react-is' if we are using this helper function
		} else if (child.props) {
			arr = arr.concat(childrenToArray(child.props.children));
		} else {
			arr.push(child);
		}
	});

	return arr;
}
