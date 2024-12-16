
import { toFixedDigits } from './format-util';

/**
 * Parses a schedule array to a day parts array.
 * The returned format can be used by a DayParts component.
 *
 * @param   {Array} schedule
 * @returns {Array}
 */
export function parseSchedule(schedule) {

	let dayParts = [];

	Object.entries(schedule).forEach(([ day, periods ]) => {
		periods.AM.forEach(hour => {
			hour = Number(hour);

			if (hour === 12) {
				hour = 0;
			}

			dayParts.push({
				day: String(day),
				hour: String(hour)
			});
		});
		periods.PM.forEach(hour => {
			hour = Number(hour);

			if (hour < 12) {
				hour = hour + 12;
			}

			dayParts.push({
				day: String(day),
				hour: String(hour)
			});
		});
	});

	return dayParts;
}

/**
 * Formats a day parts array to a schedule array.
 *
 * @param   {Array} dayParts
 * @returns {Array}
 */
export function formatSchedule(dayParts) {

	let schedule = [
		{ AM: [], PM: [] },
		{ AM: [], PM: [] },
		{ AM: [], PM: [] },
		{ AM: [], PM: [] },
		{ AM: [], PM: [] },
		{ AM: [], PM: [] },
		{ AM: [], PM: [] }
	];

	dayParts.forEach(({ day, hour }) => {
		hour = Number(hour);
		let period = hour < 12 ? 'AM' : 'PM';

		if (hour === 0) {
			hour = 12;
		}

		if (hour > 12) {
			hour = hour - 12;
		}

		let hourStr = toFixedDigits(hour, 2);
		schedule[ day ][ period ].push(hourStr);
	});

	return schedule;
}
