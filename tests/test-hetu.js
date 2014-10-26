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
	});

	it('.check() works', function(){
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
	});

});

/* EOF */
