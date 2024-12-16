let configObj = null;
let hostObj = null;
let sessionObj = null;

const Store = {
	// host response
	// get host() {
	// 	if (hostObj) {
	// 		return hostObj;
	// 	} else {
	// 		throw Error('Host Response not found');
	// 	}
	// },
	set host(obj) {
		// if (hostObj) {
		// 	throw Error('Host Response is not empty to set');
		// } else {
		hostObj = Object.freeze(obj);
		// }
	},
	isHost() {
		return !!hostObj;
	},

	// config response
	get config() {
		if (configObj) {
			return configObj;
		} else {
			throw Error('Config Response not found');
		}
	},
	set config(obj) {
		if (configObj) {
			throw Error('Config Response is not empty to set');
		} else {
			configObj = Object.freeze(obj);
		}
	},
	isConfig() {
		return !!configObj;
	},

	// user session response
	get session() {
		return sessionObj;
	},
	set session(obj) {
		sessionObj = obj;
	},
	isSession() {
		return !!sessionObj;
	}

};

export default Store;
