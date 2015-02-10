[![Build Status](https://secure.travis-ci.org/Sendanor/node-fin-id.png?branch=master)](http://travis-ci.org/Sendanor/node-fin-id)

Finnish Identity Number Library
===============================

Description
-----------

This library is a collection of functions dealing with Finnish specific 
identification numbers.

Features
--------

* hetu -- Check Finnish HETU numbers
* ytunnus -- Check Finnish corporate IDs

Installation for Node.js
------------------------

Simplest way to install is to use [npm](http://npmjs.org/), just simply `npm install fin-id`.

Authors
-------

* Jaakko-Heikki Heusala <jheusala@iki.fi>
* Mux F-productions  <contact@mux.fi>
* Juho Vähäkangas <juhov@iki.fi>

License
-------

MIT-style license, see [INSTALL.txt](http://github.com/jheusala/node-fin-id/blob/master/LICENSE.txt).

Initializing
------------

Each feature is a property:

    var hetu = require('fin-id').hetu;

See [examples/](http://github.com/jheusala/node-fin-id/tree/master/examples) for full examples.

Hetu
----

The call `hetu.check(hetu)` returns `true` if the argument is valid ID:

	if(hetu.check('010171-1234')) console.log("valid");
	else console.log("invalid");

The call `hetu.parse(hetu)` returns an object with additional information:

	var parsed = hetu.parse('010171-1234');
	if(parsed) {
		console.log("birthday is " + parsed.date());  // Fri, 01 Jan 1971
		console.log("sex is " + parsed.sex());        // 'female'
	}


Reference number (viitenumero)
------------------------------

	var refnum = require('fin-id').refnum;

To create reference number use `.create(num)`

	refnum.create(1234);
	=> '12344'

To check reference number use `.check(num)`

	refnum.check('12344');
	=> true

TODO
----

* IBAN bank numbers: See [International bank number (Finnish)](http://tarkistusmerkit.teppovuori.fi/tarkmerk.htm#iban)
