"use strict";

var is = require('nor-is');
var assert = require('assert');
var debug = require('nor-debug');
var fin_id = require('../src/');

/* */
describe('fin_id.ytunnus', function(){

	it('.parse() is callable', function(){
		debug.assert(fin_id).is('object');
		debug.assert(fin_id.ytunnus).is('object');
		debug.assert(fin_id.ytunnus.parse).is('function');
	});

	it('.check() is callable', function(){
		debug.assert(fin_id).is('object');
		debug.assert(fin_id.ytunnus).is('object');
		debug.assert(fin_id.ytunnus.check).is('function');
	});

	it('._has_sum() can validate checksums', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.ytunnus ).is('object');
		debug.assert( fin_id.ytunnus._has_sum ).is('function');

		debug.assert( fin_id.ytunnus._has_sum('2092540') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus._has_sum('2256931') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus._has_sum('0709019') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus._has_sum( '709019') ).is('boolean').equals(false);

		debug.assert( fin_id.ytunnus._has_sum('2092540-6') ).is('boolean').equals(true);
		debug.assert( fin_id.ytunnus._has_sum('2256931-0') ).is('boolean').equals(true);
		debug.assert( fin_id.ytunnus._has_sum('0709019-2') ).is('boolean').equals(true);
		debug.assert( fin_id.ytunnus._has_sum( '709019-2') ).is('boolean').equals(true);

	});

	it('._with_sum() can parse IDs', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.ytunnus ).is('object');
		debug.assert( fin_id.ytunnus._with_sum ).is('function');

		debug.assert( fin_id.ytunnus._with_sum('2092540') ).is('string').equals('2092540-6');
		debug.assert( fin_id.ytunnus._with_sum('2256931') ).is('string').equals('2256931-0');
		debug.assert( fin_id.ytunnus._with_sum('0709019') ).is('string').equals('0709019-2');
		debug.assert( fin_id.ytunnus._with_sum( '709019') ).is('string').equals('0709019-2');

		debug.assert( fin_id.ytunnus._with_sum('2092540-6') ).is('string').equals('2092540-6');
		debug.assert( fin_id.ytunnus._with_sum('2256931-0') ).is('string').equals('2256931-0');
		debug.assert( fin_id.ytunnus._with_sum('0709019-2') ).is('string').equals('0709019-2');
		debug.assert( fin_id.ytunnus._with_sum( '709019-2') ).is('string').equals('0709019-2');

	});

	it('.parse() can parse without checksum', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.ytunnus ).is('object');
		debug.assert( fin_id.ytunnus.parse ).is('function');

		debug.assert( fin_id.ytunnus.parse('2092540') ).is('string').equals('2092540-6');
		debug.assert( fin_id.ytunnus.parse('2256931') ).is('string').equals('2256931-0');
		debug.assert( fin_id.ytunnus.parse('0709019') ).is('string').equals('0709019-2');
		debug.assert( fin_id.ytunnus.parse( '709019') ).is('string').equals('0709019-2');

	});

	it('.parse() can parse with checksum', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.ytunnus ).is('object');
		debug.assert( fin_id.ytunnus.parse ).is('function');

		debug.assert( fin_id.ytunnus.parse('2092540-6') ).is('string').equals('2092540-6');
		debug.assert( fin_id.ytunnus.parse('2256931-0') ).is('string').equals('2256931-0');
		debug.assert( fin_id.ytunnus.parse('0709019-2') ).is('string').equals('0709019-2');
		debug.assert( fin_id.ytunnus.parse( '709019-2') ).is('string').equals('0709019-2');

	});

	it('.check() requires checksum', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.ytunnus ).is('object');
		debug.assert( fin_id.ytunnus.check ).is('function');

		debug.assert( fin_id.ytunnus.check('2092540') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus.check('2256931') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus.check('0709019') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus.check( '709019') ).is('boolean').equals(false);

	});

	it('.check() accepts valid IDs', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.ytunnus ).is('object');
		debug.assert( fin_id.ytunnus.check ).is('function');
		debug.assert( fin_id.ytunnus.check('2092540-6') ).is('boolean').equals(true);
		debug.assert( fin_id.ytunnus.check('2256931-0') ).is('boolean').equals(true);
		debug.assert( fin_id.ytunnus.check('0709019-2') ).is('boolean').equals(true);
		debug.assert( fin_id.ytunnus.check( '709019-2') ).is('boolean').equals(true);
	});

	it('.check() rejects invalid IDs', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.ytunnus ).is('object');
		debug.assert( fin_id.ytunnus.check ).is('function');
		debug.assert( fin_id.ytunnus.check('2092540-4') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus.check('2256931-7') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus.check('0709019-3') ).is('boolean').equals(false);
		debug.assert( fin_id.ytunnus.check( '709019-5') ).is('boolean').equals(false);
	});

});

/* EOF */
