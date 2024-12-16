/**
 * Creates a function that is the composition of a list of functions from right to left,
 * each consuming the return value of the function that follows.
 */
export function compose(funcs) {
	if (funcs.length === 0) {
		return arg => arg;
	}

	if (funcs.length === 1) {
		return funcs[0];
	}

	const start = funcs.length - 1;

	return function () {
		let i = start;
		let result = funcs[start].apply(this, arguments);

		while (i--) {
			result = funcs[i].call(this, result);
		}

		return result;
	};
}
