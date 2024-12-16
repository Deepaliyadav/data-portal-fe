
import { useEffect, useState } from 'react';

/**
 * Uses the current online status of the application.
 *
 * @example
 * <code>
 *     let online = useOnlineStatus();
 * </code>
 *
 * @returns {Object}
 */
export function useOnlineStatus() {

	let [ online, setOnline ] = useState(navigator.onLine);

	useEffect(() => {

		let handleOffline = () => setOnline(false);
		let handleOnline = () => setOnline(true);

		window.addEventListener('offline', handleOffline);
		window.addEventListener('online', handleOnline);

		return () => {
			window.removeEventListener('offline', handleOffline);
			window.removeEventListener('online', handleOnline);
		};
	}, []);

	return online;
}
