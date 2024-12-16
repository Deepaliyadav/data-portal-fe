import { useMemory } from './use-memory';

/**
 * Uses grid filter
 *
 * @example
 * <code>
 *     let [ filters, setFilters ] = useGridFilters('uniquekey');
 * </code>
 * @param {String} key
 * @returns {Object}
 */
export function useGridFilters(key) {

	// if (!localStorage.getItem(key)) {
	// 	localStorage.setItem(key, JSON.stringify());
	// }

	return useMemory(key, {
		search: '',
		subTitle: '',
		view: 'table',
		empDetail: {},
		dropdownFilter: {
			options: [],
			selected: {}
		},
		reportFilters: null,
		playback: null,
		refresh: () => void 0,
		column: {
			open: false,
			columns: [],
			newColumns: []
		},
		filter: {
			open: false,
			filters: {}
		},
		exportFile: {
			d: '',
			m: '',
			format: []
		},
		'export': {
			format: '',
			count: null,
			fileName: ''
		},
		download: false,
		downloadIcon: false,
		clone: false,
		editIcon: false,
		edit: false,
		updateUrl: null,
		formTable: null,
		tableLoading: false,
		onSave: () => void 0,
		tableFirstRender: false
	});
}
