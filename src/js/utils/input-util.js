
import { isFunction } from './type-util';

/**
 * Composes input handlers from multiple sources.
 *
 * @param   {...Object} sources
 * @returns {{ onBlur: Function, onChange: Function, onFocus: Function }}
 */
export function composeInputHandlers(...sources) {

	let handleEvent = name => (...args) => {
		sources.forEach(source => {
			if (isFunction(source[ name ])) {
				source[ name ](...args);
			}
		});
	};

	return {
		onChange: handleEvent('onChange'),
		onFocus: handleEvent('onFocus'),
		onBlur: handleEvent('onBlur')
	};
}
