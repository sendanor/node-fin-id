/*
 * Finnish Identity Number Library
 * https://github.com/sendanor/node-fin-id
 */

/**
 * Copyright (c) 2014 Juho Vähäkangas
 * Copyright (c) 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

/** Parse integers in base 10
 * @returns {number} value of `parseInt(n, 10)`
 */
function parse_int_10(n) {
	return parseInt(n, 10);
}

/** Generate Finnish business IDs
 * @param id {string} The business ID with or without checksum
 * @returns {string} The business ID with checksum
 */
function _with_sum(id_) {
	var numbers = [7, 9, 10, 5, 8, 4, 2];
	var parts = (''+id_).split("-");
	var id = parts.shift();
	if(!id) { throw new TypeError("id not valid: " + id_); }
	if(id.length === 6) {
		id = '0' + id;
	}
	if(id.length !== 7) { throw new TypeError("id length not valid: " + id_); }

	var id_array = id.split('').map(parse_int_10);

	if(id_array.length > 7) {
		throw new TypeError("id array too long (" + id_array.length + ") for " + id_);
	}

	var sum = id_array.reduce(function(sum, n, i) {
		var x = numbers[i];
		if(typeof n !== "number") { throw new TypeError("id["+i+"] not valid number in " + id_); }
		return sum + n * x;
	}, 0);

	sum = (sum % 11);
	if(! ((sum === 0) || ((sum >= 2) && (sum <= 10))) ) { throw new TypeError("Illegal checksum for " + id_); }
	sum = (sum === 0) ? 0 : 11 - sum;

	var sum_ = parts.join('-');
	if(sum_ && (''+sum !== sum_)) { throw new TypeError("Illegal checksum in " + id_); }

	return id + "-" + sum;
}

/** Check existance of checksum
 * @param id {string} Finnish business ID
 * @returns {boolean} `true` if `id` has a checksum
 */
function _has_sum(id) {
	return (''+id).match("-") !== null;
}

/** Parse Finnish business ID
 * @param id {string} ID with or without checksum
 * @returns {string} ID with checksum
 */
function _parse(id_) {
	return _with_sum(id_);
}

/** Non-throwing version of _parse()
 * @param id {string} The ID to parse
 * @param defvalue {string} Optional value to use if errors, defaults to `undefined`.
 * @returns {string|defvalue} ID with checksum otherwise `defvalue`
 */
function _parse_nothrow(id, defvalue) {
	defvalue = (arguments.length === 1) ? undefined : defvalue;
	try {
		return _parse(id);
	} catch(err) {
		return defvalue;
	}
}

/** Compare two business IDs
 * @param a {string} First business ID
 * @param b {string} Second business ID
 * @returns {boolean} `true` if both ids are identical
 */
function _compare(a, b) {
	return _parse_nothrow(a) === _parse_nothrow(b);
}

/** Check Finnish business ID validity. This function might throw an exception! See _check_nothrow().
 * @param id {string} The ID to check
 * @returns {boolean} `true` if ID was valid
 */
function _check(id) {
	id = '' + id;
	return _has_sum(id) ? _compare(id, _with_sum(id)) : false;
}

/** Non-throwing version of _check()
 * @param id {string} The ID to check
 * @returns {boolean} `true` if ID was valid
 */
function _check_nothrow(id) {
	try {
		return _check(id);
	} catch(err) {
		return false;
	}
}

// Exports
module.exports = {
	"_with_sum": _with_sum,
	"_has_sum": _has_sum,
	"compare": _compare,
	"parse": _parse_nothrow,
	"check": _check_nothrow
};
