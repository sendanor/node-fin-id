/* Foreach examples */

var hetu = require('fin-id').hetu,
    util = require('util');

console.log(util.inspect( hetu.check('010171-1000') )); // true
console.log(util.inspect( hetu.check('010171-1234') )); // false
console.log(util.inspect( hetu.check('010171-1985') )); // true

var parsed = hetu.parse('010171-1000');
console.log(util.inspect( parsed.date() ));  // Fri, 01 Jan 1971
console.log(util.inspect( parsed.sex() ));   // 'female'

/* EOF */
