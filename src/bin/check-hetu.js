#!/usr/bin/env node
/* Simple shell tool to check HETU(s) */

"use strict";

var hetu = require('fin-id').hetu;
var argv = require('minimist')(process.argv.slice(2));
var foreach = require('snippets').foreach;

foreach(argv._).each(function(value) {
	var parsed = hetu.parse(value);
	var d = parsed.date();
	if(parsed.check()) {
		console.log(value + ': born ' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ', ' + parsed.sex() );
	} else {
		console.log(value + ': Failed to parse hetu');
	}
});

/* EOF */
