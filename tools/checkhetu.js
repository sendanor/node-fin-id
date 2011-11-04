#!/usr/bin/env node
/* Simple shell tool to check HETU(s) */

var hetu = require('fin-id').hetu,
    sys = require('sys'),
    argv = require('optimist').argv,
    foreach = require('snippets').foreach;

foreach(argv._).each(function(value) {
	var parsed = hetu.parse('010171-1000'),
	    d = parsed.date();
	if(parsed) {
		console.log(value + ': born ' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ', ' + parsed.sex() );
	} else {
		console.log(value + ': Failed to parse hetu');
	}
});

/* EOF */
