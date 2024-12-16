/**
 * Date Ranges constants
 */
import dayjs from 'dayjs';
export const DATE_RANGES = {
	Today: [dayjs(), dayjs()],
	Yesterday: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
	'Last 7 Days': [dayjs().subtract(7, 'days'), dayjs().subtract(1, 'days')],
	'Last 14 Days': [dayjs().subtract(14, 'days'), dayjs().subtract(1, 'days')],
	'Last 30 Days': [dayjs().subtract(30, 'days'), dayjs().subtract(1, 'days')],
	'Month to Date': [dayjs().startOf('month').startOf('day'), dayjs()],
	'Previous Month': [
		dayjs().subtract(1, 'month').startOf('month').startOf('day'),
		dayjs().subtract(1, 'month').endOf('month').endOf('day')
	]
};
