import { useLocalStorage } from './use-local-storage';

/**
 * Uses state that syncs with local storage.
 * Initial values are set here.
 * All local storage is cleared on logout.
 *
 * @example
 * <code>
 *     let [ value, setValue ] = useLocalStorage('myKey');
 * </code>
 *
 * @param   {String} key
 * @returns {[*, Function]}
 */

export function useLocalFilter(key) {

	const [memory, syncMemory] = useLocalStorage(key);

	if (!memory) {
		syncMemory({
			dashboard: {
				collapseMenu: false
			},
			employeeDetail: {
				collapseMenu: false
			},
			request: {
				open: false,
				requests: [],
				newRequests: []
			},
			antrikaLoginAlertModal: false,
			antrikaBanModal: false
		});
	}

	return [memory, syncMemory];
}
