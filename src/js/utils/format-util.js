
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { isNumber } from './type-util';
const pluralRegex = /\[([^|]*)\|([^\]]*)\]/g;

/**
 * Formats a number into a string with fixed digits.
 *
 * @param   {Number} val        The numeric value to format.
 * @param   {Number} digits     The amount of fixed digits.
 * @returns {String}
 */
export function toFixedDigits(val, digits) {

	let result = String(val);
	digits = isNumber(digits) ? digits : 0;
	val = isNumber(val) ? val : parseInt(val, 10);

	if (isNumber(val) && !isNaN(val)) {

		result = String(val);

		while (result.length < digits) {
			result = '0' + result;
		}

		return result;
	}

	return 'NaN';
}

/**
 * Formats seconds into a time stamp.
 *
 * @param   {Number} seconds    The number of seconds to format.
 * @returns {String}
 */
export function toTimeStamp(seconds) {

	if (isNumber(seconds)) {

		let neg = seconds < 0;
		let min = Math.floor(Math.abs(seconds) / 60);
		let sec = Math.floor(Math.abs(seconds) % 60);

		return (neg ? '-' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;

	} else {

		return 'NaN';
	}
}
/**
	 * Formats a file form input.files to base 64.
	 *
	 * @param   {File} file    File form input.files
	 * @returns {Promise}
	 */

export function getFileBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

export function getFileArrayBuffer(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

export function parseForBulkUpdate(formTable) {
	function getKeyVal(key, value) {
		if (typeof value === 'object') {
			if (value.key && value.value) {
				return { [key]: value.key };
			} else {
				let obj = {};
				for (let i in value) {
					obj = { ...obj, ...getKeyVal((key ? key + '.' : '') + i, value[i]) };
				}
				return obj;
			}
		} else {
			return { [key]: value.trim() };
		}
	}

	let result = {};

	for (let id in formTable) {
		result[id] = getKeyVal('', formTable[id]);
	}
	return result;
}

export function copyText(text, successMsg) {
	var input_temp = document.createElement('input');
	input_temp.value = text;
	document.body.appendChild(input_temp);
	input_temp.select();
	document.execCommand('copy');
	document.body.removeChild(input_temp);
	toast.success((successMsg || 'Link copied to clipboard'), { autoClose: 2000, closeOnClick: true });
}

export function convertToPlainText(html) {
	var tempDivElement = document.createElement('div');

	tempDivElement.innerHTML = html;
	let innerText = tempDivElement.innerText;
	tempDivElement.remove();

	return innerText || '';
}

export function colorToRgba(color, alpha) {
	if (color.startsWith('#')) {
	  color = color.slice(1);
	  const isShortHex = color.length === 3 || color.length === 4;
	  const hex = isShortHex ? color.split('').map(char => char.repeat(2)).join('') : color;

	  const [r, g, b, a] = isShortHex ?
		 hex.match(/.{2}/g).map(component => parseInt(component, 16)) :
		 [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), parseInt(hex.slice(6, 8), 16)];

	  return `rgba(${ r },${ g },${ b },${ (a || 255) / 255 * alpha })`;
	}

	if (color.startsWith('rgb(')) {
	  const [r, g, b] = color.match(/\d+/g).map(Number);
	  return `rgba(${ r },${ g },${ b },${ alpha })`;
	}

	if (color.startsWith('rgba(')) {
	  return color.replace(/[^,]+(?=\))/, alpha);
	}

	return null;
}

/**
 * String template tag function for conditional pluralization.
 * Substitutes strings of the form "[singular|plural]" based on the value of the preceding numeric expression.
 *
 * @param   {Array} strings
 * @param   {Array} exps
 * @returns {String}
 */
export function plural(strings, ...exps) {
	const result = [];
	let n = exps[0];
	for (const str of strings) {
		if (isNumber(n)) {
			result.push(str.replace(pluralRegex, n === 1 ? '$1' : '$2'));
		} else {
			result.push(str);
		}
		if (!exps.length) {
			break;
		}
		n = exps.shift();
		result.push(n);
	}
	return result.join('');
}

export function numberFormatter(num) {
	if (num > 1000000000) {
		return (num / 1000000000).toFixed(1) + 'B';
	}
	if (num > 1000000) {
		return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
	}
	if (num > 999) {
		return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
	}
	return num; // if value < 1000, nothing to do
}
export function toTitleCase(str) {
	return str
		.replace(
			/\w\S*/g,
			txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		)
		.replaceAll('_', ' ');
}
/**
 * Format number with locale settings
 *
 * @param   {Number} value
 * @returns {String}
 */
export function formatCount(value) {
	if (value === undefined) {
		return '';
	}
	return value.toLocaleString();
}
/**
 * Formats number as currency
 *
 * @param   {Number} value
 * @param   {Number} precision
 * @returns {String}
 */
export function formatCurrency(value, precision = 2) {
	if (value === undefined) {
		return '';
	}
	return Number(value).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: Number.isInteger(value) ? 0 : precision,
		maximumFractionDigits: precision
	});
}
/**
 * Formats number as percent
 *
 * @param   {Number} value
 * @param   {Number} precision
 * @returns {String}
 */
export function formatPercent(value) {
	if (value === undefined) {
		return '';
	}
	return value.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%';
}
/**
 * Formats a date string
 *
 * @param   {String} value
 * @returns {String}
 */
export function formatDate(value, text) {
	const date = dayjs(value);
	return date?.isValid() ? date.format('DD/MM/YYYY hh:mm A') : text || 'NA';
}
