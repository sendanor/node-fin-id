/* Foreach examples */

var hetu = require('fin-id').hetu,
    sys = require('sys');

console.log(sys.inspect( hetu.check('010171-1000') )); // true
console.log(sys.inspect( hetu.check('010171-1234') )); // false
console.log(sys.inspect( hetu.check('010171-1985') )); // true

var parsed = hetu.parse('010171-1000');
console.log(sys.inspect( parsed.date() ));  // Fri, 01 Jan 1971
console.log(sys.inspect( parsed.sex() ));   // 'female'

/* EOF */
