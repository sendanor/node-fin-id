"use strict";

var is = require('nor-is');
var assert = require('assert');
var debug = require('nor-debug');
var fin_id = require('../src/');

/* */
describe('hetu', function(){

	it('.parse() is callable', function(){
		debug.assert(fin_id).is('object');
		debug.assert(fin_id.hetu).is('object');
		debug.assert(fin_id.hetu.parse).is('function');
	});

	it('.check() is callable', function(){
		debug.assert(fin_id).is('object');
		debug.assert(fin_id.hetu).is('object');
		debug.assert(fin_id.hetu.check).is('function');
	});

	it('.check() works', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.hetu ).is('object');
		debug.assert( fin_id.hetu.check ).is('function');

		debug.assert( fin_id.hetu.check('010171-1000') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('010171-1234') ).is('boolean').equals(false);
		debug.assert( fin_id.hetu.check('010171-1985') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('010594Y9032') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('020594X903P') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('030594W903B') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('040594V9030') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('050594U903M') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('010516B903X') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('020516C903K') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('030516D9037') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('010501E9032') ).is('boolean').equals(true);
		debug.assert( fin_id.hetu.check('020503F9037') ).is('boolean').equals(true);
	});

	it('.parse() works', function(){
		debug.assert( fin_id ).is('object');
		debug.assert( fin_id.hetu ).is('object');
		debug.assert( fin_id.hetu.parse ).is('function');

		var parsed = fin_id.hetu.parse('010171-1000');

		var date = parsed.date();
		debug.assert( date ).is('date');
		debug.assert( date.getFullYear() ).is('number').equals(1971);
		debug.assert( date.getMonth() ).is('number').equals(0);
		debug.assert( date.getDate() ).is('number').equals(1);

		debug.assert( parsed.sex() ).is('string').equals('female');

		debug.assert( fin_id.hetu.parse('030516D9026').date().getFullYear() ).is('number').equals(2016);
		debug.assert( fin_id.hetu.parse('010501E9032').date().getFullYear() ).is('number').equals(2001);
		debug.assert( fin_id.hetu.parse('020502E902X').date().getFullYear() ).is('number').equals(2002);
		debug.assert( fin_id.hetu.parse('020503F9037').date().getFullYear() ).is('number').equals(2003);
		debug.assert( fin_id.hetu.parse('020504A902E').date().getFullYear() ).is('number').equals(2004);
		debug.assert( fin_id.hetu.parse('050594U902L').date().getFullYear() ).is('number').equals(1994);
	});

});

/* EOF */
