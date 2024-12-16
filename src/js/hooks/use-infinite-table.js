import { useState, useMemo } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
// import { useInfiniteQuery, useQuery } from 'react-query';

import { isBoolean, isEmptyString, isNumber, isObject, makeArray } from '../utils/type-util';
import { Filter } from '../components/common/common-v2/filter/filter';

const defaultOperator = 'EQUALS';
const operatorMap = {
	[Filter.Operator.Any.EQUALS.key]: 'EQUAL',
	[Filter.Operator.String.CONTAINS.key]: 'CONTAINS',
	[Filter.Operator.String.STARTS_WITH.key]: 'START_WITH',
	[Filter.Operator.Date.BEFORE.key]: 'LESS_THAN',
	[Filter.Operator.Date.AFTER.key]: 'GREATER_THAN',
	[Filter.Operator.Date.BETWEEN.key]: 'DATE_RANGE',
	[Filter.Operator.Number.LESS_THAN.key]: 'LESS_THAN',
	[Filter.Operator.Number.GREATER_THAN.key]: 'GREATER_THAN',
	[Filter.Operator.Array.INCLUDE.key]: 'INCLUDE',
	[Filter.Operator.Array.EXCLUDE.key]: 'EXCLUDE'
};
export const useInfiniteTable = ({
	queryKey,
	queryFn,
	params = {},
	filters = [],
	defaultPageSize = 50,
	defaultSorter = {},
	fetchTotalSeparately = false,
	enabled = true,
	url
}) => {
	const [pageSize, setPageSize] = useState(defaultPageSize);
	const [sorter, setSorter] = useState(defaultSorter);
	const serverFilters = useMemo(() => formatFilter(filters), [filters]);
	const serverSorter = useMemo(() => formatSorter(sorter), [sorter]);

	const query = useInfiniteQuery({
		queryKey: [
			...makeArray(queryKey),
			{ pageSize, params, sorter, serverFilters }
		],
		queryFn: async ({ pageParam }) => {
			const payload = {
				url,
				params,
				pagination: {
					number: pageSize,
					numberOfPages: pageParam,
					start: pageParam * pageSize
				},
				sort: serverSorter,
				tableFilter: serverFilters,
				fetchTotal: !fetchTotalSeparately && pageParam === 0
			};
			let res = {};
			res = await queryFn(payload);
			return res.data;
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.hm) {
				return lastPageParam + 1;
			}
			return null;
		},
		refetchInterval: () => false,
		retry: false
		// staleTime: 60000,
		// enabled
	});

	const totalQuery = useQuery({
		queryKey: [...makeArray(queryKey), { params, serverFilters }, 'total'],
		queryFn: async () => {
			const payload = {
				params,
				pagination: {
					number: 1,
					numberOfPages: 0,
					start: 0
				},
				sort: {},
				tableFilter: serverFilters,
				fetchTotal: true
			};
			const res = await queryFn(payload);
			return res.data.totalCount;
		},
		staleTime: 60000,
		enabled: enabled && fetchTotalSeparately
	});
	const dataSource = useMemo(() => combinePageData(query.data), [query.data]);
	const total = totalQuery.data ?? query.data?.pages[0]?.totalCount ?? 0;

	const onChange = event => {
		setSorter(event.sorter);
	};
	const props = {
		dataSource: dataSource,
		total: total,
		onChange: onChange,
		pageSize: pageSize,
		onPageSizeChange: setPageSize,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		fetchNextPage: query.fetchNextPage,
		loading: query.isLoading,
		fetching: query.isFetching,
		refetch: query.refetch,
		data: query.data?.pages?.[0]
	};
	return { ...query, dataSource, pageSize, sorter, serverFilters, onChange, props };
};
/**
 * Combines the data for all pages into a single array.
 *
 * @param   {Array} data
 * @returns {Array}
 */
function combinePageData(data) {
	if (!data) {
		return [];
	}
	return data.pages
		.map(p => p.rows)
		.flat()
		.map(r => (r.rowData ? { ...r.rowData, id: r.key } : r));
}
/**
 * Formats a sort query.
 *
 * @param   {Object} sorter
 * @returns {Object}
 */
function formatSorter(sorter = {}) {
	const { field = '', order = '' } = sorter;
	if (order && field) {
		return {
			predicate: Array.isArray(field) ? field[0] : field,
			reverse: order === 'ascend'
		};
	}
	return {};
}
/**
 * Formats a filter query.
 *
 * @param   {Array} filters
 * @returns {Object}
 */
function formatFilter(filters) {
	const result = {};
	filters.forEach(desc => {
		if (!isEmptyString(desc.value)) {
			const op = isObject(desc) ? operatorMap[desc.operator] : defaultOperator;
			const val = isObject(desc) ? desc.value : desc;
			result[desc.dataIndex] = {
				operation: op,
				value: formatFilterValue(val),
				searchType: getSearchType(val)
			};
		}
	});
	return result;
}
function formatFilterValue(val) {
	if (getSearchType(val) === 'DATE') {
		if (Array.isArray(val) && val.every(dayjs.isDayjs)) {
			return [
				val[0].startOf('day').format('x'),
				val[1].endOf('day').format('x')
			].join('-');
		}
		if (dayjs.isDayjs(val)) {
			return val.startOf('day').format('x');
		}
	}
	return val;
}
function getSearchType(val) {
	if (Array.isArray(val) && val.every(dayjs.isDayjs)) {
		return 'DATE';
	}
	if (dayjs.isDayjs(val)) {
		return 'DATE';
	}
	if (isNumber(val)) {
		return Number.isInteger(val) ? 'NUMBER' : 'FLOAT';
	}
	if (isBoolean(val)) {
		return 'BOOLEAN';
	}
	return undefined;
}
