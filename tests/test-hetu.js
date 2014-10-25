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

	//it('', function(){
	//});

});

/* EOF */
