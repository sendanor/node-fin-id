/*
 * Finnish Identity Number Library
 * https://github.com/sendanor/node-fin-id
 */

/*
 * Copyright (C) 2014 by Sendanor <info@sendanor.fi> (http://www.sendanor.fi),
 *               2011-2014 by Jaakko-Heikki Heusala <jheusala@iki.fi> (http://www.jhh.me),
 *               2009 by Mux F-Production <contact@mux.fi> (http://mux.fi/)
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

var is = require('nor-is');
var debug = require('nor-debug');
var moment = require('moment');
var REFNUM = require('./refnum.js');

/** Parse finnish IBAN as 16 numbers
 * Example: 'FI21 1234 5600 0007 85', more examples: http://www.rbs.co.uk/corporate/international/g0/guide-to-international-business/regulatory-information/iban/iban-example.ashx
 * @returns {string} The result as 16 numeric characters.
 */
function parse_fi_iban(iban) {
	iban = ('' + iban).trim().toLowerCase();
	debug.assert(iban.substr(0, 2)).is('string').equals('fi');
	iban = iban.replace(/^[^0-9]+/, "").replace(/ +/g, "");
	debug.assert(iban).is('string').length(16).is('integer');
	return iban;
}

/** */
function pad_zeros(num, l) {
	num = '' + num;
	var ll = num.length;
	if(ll >= l) {
		return num;
	}
	return new Array((l-ll)+1).join('0') + num;
}

/** Parse finnish reference numbers and pad it
 * @returns {string} The reference number as 20 long string padded with zeros.
 */
function parse_refnum(num) {
	num = (''+num).trim().replace(/[^0-9]/g, "");
	debug.assert(num).is('string').maxLength(20);
	if(num.length !== 20) {
		return pad_zeros(num, 20);
	}
	debug.assert(num).is('string').length(20).is('integer');
	return num;
}

/** Parse cents and pad it. If the amount is wrong, use all zeros (8 characters).
 * @returns {string} The reference number as 20 long string padded with zeros.
 */
function parse_cents(opts) {
	opts = opts || {};
	debug.assert(opts).is('object');

	var euros = pad_zeros(opts.euros||'', 6);
	var cents = pad_zeros(opts.cents||'', 2);

	if(euros.length !== 6) {
		return '00000000';
	}

	var res;
	if( (!opts.hasOwnProperty('euros')) && (cents.length > 2) ) {
		euros = '';
		res = pad_zeros('' + euros + cents, 8);
	} else {
		if(cents.length !== 2) {
			return '00000000';
		}
		res = pad_zeros('' + euros + cents, 8);
	}
	if(!(res && (res.length === 8))) {
		return '00000000';
	}
	debug.assert(res).is('string').length(8).is('integer');
	return res;
}

/** Parse dates as a string in format "YYMMDD"
 * @returns {string} The date as a string
 */
function parse_duedate(date) {
	if(!date) {
		return '000000';
	}
	var str = moment(date).format("YYMMDD");
	debug.assert(str).is('string').length(6).is('integer');
	return str;
}

/** */
function viivakoodi_create(opts) {
	opts = opts || {};
	debug.assert(opts).is('object');
	if(!opts.hasOwnProperty('iban')) { throw new TypeError("opts.iban missing"); }
	var iban = parse_fi_iban(opts.iban);
	var cents = parse_cents(opts);
	var refnum = parse_refnum(opts.refnum);
	var duedate = parse_duedate(opts.duedate);
	var viite = '4' + iban + cents + "000" + refnum + duedate;
	debug.assert(viite).is('string').length(54).is('integer');
	return viite;
}

/** */
function viivakoodi_check(code) {
	if(!is.string(code)) { return false; }
	var version = code[0];
	if(! ( (version === '4') || (version === '5') ) ) { return false; }
	if(code.length !== 54) { return false; }
	//if(!is.integer(code)) { return false; }
	return true;
}

/** */
function viivakoodi_parse_4(code) {
	debug.assert(code).is('string');

	if(!viivakoodi_check(code)) {
		throw new TypeError("code is invalid: "+ code);
	}

	var version = code[0];
	debug.assert(version).is('string').equals('4');

	var parsed = {};

	parsed.iban = 'FI' + code.substr(1, 16);
	parsed.euros = parseInt( code.substr(1+16, 6).replace(/^0+([0-9])/, "$1") , 10);
	parsed.cents = parseInt( code.substr(1+16+6, 2).replace(/^0+([0-9])/, "$1") , 10);
	parsed.refnum = REFNUM.parse( code.substr(1+16+6+2+3, 20) );

	var duedate = code.substr(1+16+6+2+3+20, 6);
	//debug.log('duedate = ', duedate);
	parsed.duedate = moment( '20' + code.substr(1+16+6+2+3+20, 6), "YYYYMMDD" ).toDate();

	return parsed;
}

/** 
 * @returns normal reference number
 */
function parse_rf_refnum(code) {
	debug.assert(code).is('string');
	if(code.substr(0, 2) === 'RF') {
		return REFNUM.parse( code.substr(4) );
	}
}

/** */
function viivakoodi_parse_5(code) {
	debug.assert(code).is('string');

	if(!viivakoodi_check(code)) {
		throw new TypeError("code is invalid: "+ code);
	}

	var version = code[0];
	debug.assert(version).is('string').equals('5');

	var parsed = {};

	parsed.iban = 'FI' + code.substr(1, 16);
	parsed.euros = parseInt( code.substr(1+16, 6).replace(/^0+([0-9])/, "$1") , 10);
	parsed.cents = parseInt( code.substr(1+16+6, 2).replace(/^0+([0-9])/, "$1") , 10);
	parsed.refnum = parse_rf_refnum('RF' + code.substr(1+16+6+2, 23));

	var duedate = code.substr(1+16+6+2+23, 6);
	//debug.log('duedate = ', duedate);
	parsed.duedate = moment( '20' + duedate, "YYYYMMDD" ).toDate();

	return parsed;
}

/** */
function viivakoodi_parse(code) {
	debug.assert(code).is('string');
	var version = code[0];
	if(version === '5') {
		return viivakoodi_parse_5(code);
	}
	return viivakoodi_parse_4(code);
}

// Exports
module.exports = {
	"create": viivakoodi_create,
	"check": viivakoodi_check,
	"parse": viivakoodi_parse
};

/* EOF */
