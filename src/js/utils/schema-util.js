
import { isObject, isArray } from './type-util';
import { isEnum } from './enum-util';

/**
 * Parses data fields based on a given schema.
 *
 * @param {Object || Array} data
 * @param {Object}          schema
 */
export function parseFields(data, schema) {

	if (!schema) {
		return;
	}

	let items = isArray(data) ? data : [ data ];

	for (let [ field, type ] of Object.entries(schema)) {

		// if (type === 'date') {

		// 	items.forEach(item => {
		// 		item[ field ] = item[ field ] ? isDayjs(new Date(item[ field ])) : null;
		// 	});

		// } else if (type === 'unix') {

		// 	items.forEach(item => {
		// 		item[ field ] = item[ field ] ? isDayjs(new Date(item[ field ] * 1000)) : null;
		// 	});

		// } else
		if (type === 'bool') {

			items.forEach(item => {
				item[ field ] = Boolean(item[ field ]);
			});

		} else if (type === 'json') {

			items.forEach(item => {
				try {
					item[ field ] = JSON.parse(item[ field ]);
				} catch (e) {}
			});

		} else if (isEnum(type)) {

			items.forEach(item => {
				let key = item[ field ];
				item[ field ] = type.fromKey(key) || key;
			});

		} else if (isObject(type)) {

			items.forEach(item => {
				parseFields(item[ field ], type);
			});
		}
	}
}
