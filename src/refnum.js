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

/*
 * Finnish Referer Number Library (for JavaScript)
 * by: eXtranium 2009 http://extranium.net/
 * (c) Sendanor 2009 http://www.sendanor.fi/
 *
 * created: Mo 2009-01-05
 * updated: We 2009-01-07
 * -----
 *
 * Functions:
 ** refnum_leave_only_digits  - remove non-digits from string
 ** refnum_calculate_digit    - calculate check-digit needed in referer number
 ** refnum_create             - generate referer number
 ** refnum_check              - check referer number
 *
 */

/** Remove non-digits from string */
function refnum_leave_only_digits(s) {
	// remove any non-digit (0..9) chars from string s
	var s = String(s);
	var t = '';		// new string
	var l = s.length;	// length of old string
	for (var i=0; i<l; i++) {
		if ((s[i]>='0') && (s[i]<='9')) t += s[i];	// get only the digits
	}
	return (t);
}

/* Calculate check-digit needed in referer number */
function refnum_calculate_digit(num) {
	// function calculates check-digit for complete referer number
	// num = string of digits ('0'..'9')

	var num = refnum_leave_only_digits(num);	// we need only digits 0..9

	var index = num.length;			// set char pointer to end-of-string
	if (!index || (index>19)) return false;	// real referer number is 1..19 + 1 chars long

	var calc = 9;	// sum calculator
	var mult = 0;	// multiplier aka weight (7, 3, 1, 7, 3, 1,...)

	// loop with all digits in num backwards
	while (index--) {
		if (!(mult>>=1)) mult = 7;	// update weight (7, 3, 1, 7, 3, 1,...)
		calc += mult * (num[index].charCodeAt(0)-48);	// add weight*digit to sum
	} // while

	return String.fromCharCode(57-(calc%10));
}

/** Generate referer number */
function refnum_create(num) {
	// create referer number by adding check-digit to num
	// num = string of digits ('0'..'9')
	var num = refnum_leave_only_digits(num);	// remove non-digits
	return num+refnum_calculate_digit(num);
}

/** Check referer number */
function refnum_check(refnum) {
	// check is referer number legal
	// refnum = referer number, string of digits '0'..'9'

	var refnum = String(refnum);

	// this becomes to fixed string
	var t = '';	

	for (var i=0; i<refnum.length; i++) {
		var c = refnum[i];
		if (c==' ') continue;	// space-bar allowed (but not used in calculations)
		if ((c<'0') || (c>'9')) return false;	// non-digits not allowed
		t += c;
	} // for

	return refnum_create(t.substr(0,t.length-1))==t;
}

// Exports
module.exports = {
	"create": refnum_create,
	"check": refnum_check
};

/* EOF */
