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
 * *** Tarkisteiden laskemisia ***
 * luonut:	Mux F-Production | http://mux.fi/ | 2009
 * käyttöoikeus: Sendanor - http://sendanor.fi/
 * Käyttöoikeus sisältää vapaan muokkauksen ja soveltamisen
 * sekä käyttötarkoituksen (kaupallisuus, avoin lähdekoodi,...).
 *
 * created: Su 2009-05-17
 * updated: Su 2009-05-17
 * $Id: hetu.js 8373 2009-06-30 08:38:04Z jheusala $
 * -----
 * FUNKTIOT:
 * - TarkistaHETU	Tarkista henkilötunnuksen oikeellisuus.
 *
 * SUUNNITELMISSA:
 * - pankkitilin oikeellisuuden laskenta (kotimaisen ja IBAN)
 *
 */

"use strict";

/** Parse hetu string and return it as an object */
function parse_hetu (hetu) {

	/** Parse hetu string to an object */
	function parse_hetu_string (hetu) {
		// Tarkista henkilötunnus hetu (merkkijono muotoa PPKKVVXNNNT).
		// dd = 01..31 (päivä)
		// mm = 01..12 (kuukausi)
		// yy = 00..99 (vuosi)
		// x = "+" tarkoittaa 1800-lukua, "-" 1900-lukua ja "A" 2000-lukua
		// n = 3-numeroinen yksilönumero (miehillä pariton, naisilla parillinen)
		// t = tarkistemerkki (jokin seuraavista: 0123456789ABCDEFHJKLMNPRSTUVWXY)

		// vaaditaan 11 merkin pituus
		if (hetu.length !== 11) { return; }

		var that = {};
		var dd = parseInt(hetu.substr(0, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
		var mm = parseInt(hetu.substr(2, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
		var yy = parseInt(hetu.substr(4, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
		var century = hetu[6].toUpperCase();
		var id = parseInt(hetu.substr(7, 3).replace('/^0+/', '').replace('/^$/', ''), 10);
		var checksum = hetu[10].toUpperCase();

		if ((dd<1) || (dd>31)) { return; }
		if ((mm<1) || (mm>12)) { return; }
		if (isNaN(yy) || (yy<0)) { return; }
		if ((century!=='+') && (century!=='-') && (century!=='A')
		&& (century!=='B') && (century!=='C') && (century!=='D')
		&& (century!=='E') && (century!=='F') && (century!=='Y')
		&& (century!=='X') && (century!=='W') && (century!=='V')
		&& (century!=='U')) { return; }
		if (isNaN(id) || (id<0)) { return; }

		that.x = century;
		that.dd = dd;
		that.mm = mm;
		that.yy = yy;
		that.n = id;
		that.t = checksum;

		return that;
	}

	/** Check hetu from a string */
	function check_parsed_hetu (id) {

		/** Calculate check sum for finnish hetu ID object */
		function hetu_checksum(id) {
			// luodaan iso luku äsken luetuista numeroista ja samalla lasketaan tarkiste
			var n = (id.n + id.yy*1000 + id.mm*100000 + id.dd*10000000)%31;
			var s = '0123456789ABCDEFHJKLMNPRSTUVWXY';
			return s[n];
		}

		if( (!id) || (id && (!id.t)) ) { return false; }
		return hetu_checksum(id) === id.t;
	}

	/** Parse date from hetu object */
	function parse_hetu_date(id) {
		function parse_century(x) {
			switch(x) {
        case '+':
          return 1800
        case '-':
        case 'Y':
        case 'X':
        case 'W':
        case 'V':
        case 'U':
          return 1900
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'F':
          return 2000
			}
		}
		var century = parse_century(id.x);
		if(century && id.mm && id.dd) { return new Date(century+id.yy, id.mm-1, id.dd, 12); }
	}

	/** Parse sex */
	function parse_sex(parsed_hetu) {
		var n = parsed_hetu.n;
		if((n === undefined) || (typeof n !== "number")) { return; }
		/* jslint bitwise: false */
		/* jshint bitwise: false */
		n = n & 1;
		/* jshint bitwise: true */
		/* jslint bitwise: true */
		switch(n) {
		case 0: return "female";
		case 1: return "male";
		}
	}

	hetu = ""+hetu;
	var parsed_hetu = parse_hetu_string(hetu);
	var that = {
		'change': function(h) { hetu=""+h; parsed_hetu = parse_hetu_string(hetu); },
		'check': function() { return check_parsed_hetu(parsed_hetu); },
		'date': function() { return parse_hetu_date(parsed_hetu); },
		'sex': function() { return parse_sex(parsed_hetu); }
	};
	return that;
}

/** Check hetu from a string */
function check_hetu_string (hetu) {
	return parse_hetu(hetu).check();
}

// Exports
module.exports = {
	"parse": parse_hetu,
	"check": check_hetu_string
};

/* EOF */
