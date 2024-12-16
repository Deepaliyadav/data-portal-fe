/**
 * Filter operators by data type.
 */
export const FilterOperator = {
	Any: {
		EQUALS: {
			key: 'eq',
			name: 'Equals'
		}
	},
	Date: {
		BEFORE: {
			key: 'before',
			name: 'Before'
		},
		AFTER: {
			key: 'after',
			name: 'After'
		},
		BETWEEN: {
			key: 'between',
			name: 'Between'
		}
	},
	Number: {
		LESS_THAN: {
			key: 'lt',
			name: 'Less Than'
		},
		GREATER_THAN: {
			key: 'gt',
			name: 'Greater Than'
		},
		EQUALS: {
			key: 'eq',
			name: 'Equals'
		}
	},
	String: {
		CONTAINS: {
			key: 'contains',
			name: 'Contains'
		},
		STARTS_WITH: {
			key: 'startswith',
			name: 'Starts With'
		}
	},
	Array: {
		INCLUDE: {
			key: 'include',
			name: 'Includes'
		},
		EXCLUDE: {
			key: 'exclude',
			name: 'Excludes'
		}
	}
};
