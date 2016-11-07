"use strict";

var is = require('nor-is');
var assert = require('assert');
var debug = require('nor-debug');
var fin_id = require('../src/');

/* */
describe('pankkiviivakoodi', function(){

	it('.parse() is callable', function(){
		debug.assert(fin_id).is('object');
		debug.assert(fin_id.pankkiviivakoodi).is('object');
		debug.assert(fin_id.pankkiviivakoodi.parse).is('function');
	});

	it('.check() is callable', function(){
		debug.assert(fin_id).is('object');
		debug.assert(fin_id.pankkiviivakoodi).is('object');
		debug.assert(fin_id.pankkiviivakoodi.check).is('function');
	});

	it('.create() is callable', function(){
		debug.assert(fin_id).is('object');
		debug.assert(fin_id.pankkiviivakoodi).is('object');
		debug.assert(fin_id.pankkiviivakoodi.create).is('function');
	});

	it('.create() works', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.pankkiviivakoodi ).is('object');
		debug.assert( fin_id.pankkiviivakoodi.create ).is('function');

		var barcode = fin_id.pankkiviivakoodi.create({
			'iban': 'FI9814283500171141',
			'refnum': '13',
			'duedate': '2016-05-01',
			'euros': 100,
			'cents': 10
		});

		debug.assert( barcode ).is('string').equals('498142835001711410001001000000000000000000000013160501');

	});

	it('.check() works', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.pankkiviivakoodi ).is('object');
		debug.assert( fin_id.pankkiviivakoodi.check ).is('function');

		debug.assert( fin_id.pankkiviivakoodi.check('498142835001711410001001000000000000000000000013160501') ).is('boolean').equals(true);
		debug.assert( fin_id.pankkiviivakoodi.check('010171-1234') ).is('boolean').equals(false);
		debug.assert( fin_id.pankkiviivakoodi.check('198142835001711410001001000000000000000000000013160501') ).is('boolean').equals(false);
	});

	it('.parse() works', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.pankkiviivakoodi ).is('object');
		debug.assert( fin_id.pankkiviivakoodi.parse ).is('function');

		var parsed = fin_id.pankkiviivakoodi.parse('498142835001711410001001000000000000000000000013160501');

		//debug.log('parsed = ', parsed);

		debug.assert( parsed.iban ).is('string').equals('FI9814283500171141');

		debug.assert( parsed.refnum ).is('string').equals('13');

		var duedate = parsed.duedate;
		debug.assert( duedate ).is('date');
		debug.assert( duedate.getFullYear() ).is('number').equals(2016);
		debug.assert( duedate.getMonth() ).is('number').equals(4);
		debug.assert( duedate.getDate() ).is('number').equals(1);

		debug.assert( parsed.euros ).is('number').equals(100);
		debug.assert( parsed.cents ).is('number').equals(10);

	});

	it('.parse() works with zero cents', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.pankkiviivakoodi ).is('object');
		debug.assert( fin_id.pankkiviivakoodi.parse ).is('function');

		var parsed = fin_id.pankkiviivakoodi.parse('421123456000007850000100000000000000000000000013150301');

		//debug.log('parsed = ', parsed);

		debug.assert( parsed.iban ).is('string').equals('FI2112345600000785');

		debug.assert( parsed.refnum ).is('string').equals('13');

		var duedate = parsed.duedate;
		debug.assert( duedate ).is('date');
		debug.assert( duedate.getFullYear() ).is('number').equals(2015);
		debug.assert( duedate.getMonth() ).is('number').equals(2);
		debug.assert( duedate.getDate() ).is('number').equals(1);

		debug.assert( parsed.euros ).is('number').equals(10);
		debug.assert( parsed.cents ).is('number').equals(0);

	});

	it('.parse() works with version 5', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.pankkiviivakoodi ).is('object');
		debug.assert( fin_id.pankkiviivakoodi.parse ).is('function');

		var parsed = fin_id.pankkiviivakoodi.parse('558101710000001220004829906000000559582243294671100131');

		//debug.log('parsed = ', parsed);

		debug.assert( parsed.iban ).is('string').equals('FI5810171000000122');

		debug.assert( parsed.refnum ).is('string').equals('559582243294671');

		var duedate = parsed.duedate;
		debug.assert( duedate ).is('date');
		debug.assert( duedate.getFullYear() ).is('number').equals(2010);
		debug.assert( duedate.getMonth() ).is('number').equals(0);
		debug.assert( duedate.getDate() ).is('number').equals(31);

		debug.assert( parsed.euros ).is('number').equals(482);
		debug.assert( parsed.cents ).is('number').equals(99);

	});

});

/* EOF */
