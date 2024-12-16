
import { isString } from './type-util';

const urlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const PanInputFunctionString = "function newFunction(value){if(value){function checkIfNumber(v){if(v&&v.toString()>='0'&&v.toString()<='9'){return true;}else{return false;}}value=value.replace(/[^a-zA-Z0-9]/g,'');let newVal=value.split('');for(var i=0;i<value.length;i++){if(i<5&&checkIfNumber(value.charAt(i))){newVal.splice(i,1);}else if(i>=5&&i<9&&!checkIfNumber(value.charAt(i))){newVal.splice(i,1);}else if(i==9&&checkIfNumber(value.charAt(i))){newVal.splice(i, 1);}}value=newVal.join('').toUpperCase();if(value.length<=10){return value;}else{return value.substring(0,10);}}else{return null;}}";

/**
 * Returns whether a value is a valid URL.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isValidUrl(val) {

	return isString(val) && urlRegex.test(val);
}

/**
 * Returns whether a value is a valid Email format.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isValidEmail(val) {

	return isString(val) && emailRegex.test(val);
}

/**
 * Returns whether a value is in multiple valid Email format.
 * valid formats: 'abc@xyz.com,xyz.abc.com', 'abc@xyz.com'
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isValidMultipleEmails(val) {
	let isValid = true;
	let emailArr = val.split(',');
	emailArr.find(email => {
		email = email.trim();
		if (!isValidEmail(email)) {
			isValid = false;
		}
	});
	return isValid;
}

/**
 * Returns whether a value is a valid Email format.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isValidMobile(val) {

	return isString(val) && mobileRegex.test(val);
}
