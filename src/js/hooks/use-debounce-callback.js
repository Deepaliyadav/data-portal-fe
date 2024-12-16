import { useRef, useEffect, useCallback } from 'react';

import { useCallbackRef } from './use-callback-ref';

/**
 * Uses a debounced function that delays invoking the callback until after `wait` milliseconds have elapsed since the
 * last time the debounced function was invoked.
 */
export function useDebounceCallback(
	callback,
	wait,
	leading = false
) {
	const timeout = useRef();
	const savedCallback = useCallbackRef(callback);

	useEffect(() => {
		window.clearTimeout(timeout.current);
		timeout.current = undefined;
	}, [wait, leading]);

	const fn = (...args) => {
		if (timeout.current === undefined && leading) {
			savedCallback(...args);
		}

		window.clearTimeout(timeout.current);
		timeout.current = window.setTimeout(() => {
			timeout.current = undefined;
			if (!leading) {
				savedCallback(...args);
			}
		}, wait);
	};

	return useCallback(fn, [wait, leading]);
}
