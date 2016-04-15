var e = require('..')

function area(length, width) { return length * width }
var area = e(area
            , e.number, e.number
            ).returns(e.number)


assertEqual(area(4,5), 20, 'works as expected with correct params')

try {
  area(4,'5')
  fail('should not have gotten here')
} catch(e) {
  releaseUnless(e, 'arguments[ 1 ] ( string "5" ) fails check "number"')
  pass()
}

try {
  area(4)
  fail('should not have gotten here')
} catch(e) {
  releaseUnless(e, 'arguments[ 1 ] ( undefined  ) fails check "number"')
  pass()
}


function _returnsString() { return 'asdf' }

try {
  var returnsString = e(_returnsString).returns(e.number)
  returnsString()
  fail('should not have gotten here')
} catch(e) {
  releaseUnless(e, '( string "asdf" ) fails check "number"')
  pass()
}

try {
  var returnsString = e(_returnsString).returns(e.any)
  returnsString()
  pass()
} catch(e) {
  fail('should not have gotten here')
}

function release(err, message) { if(err.message.indexOf(message) >= 0) { throw err } }
function releaseUnless(err, message) { if(err.message.indexOf(message) === -1) { throw err } }
function pass() { assert(true) }
function fail(m) { assert(false, m || 'fail') }
function assert(bool, message) {
  if(!bool) { throw new Error(message) }
}

function assertEqual(actual, expected, message) {
  assert(
    JSON.stringify(actual) === JSON.stringify(expected)
  , [ ''
    , 'actual:', JSON.stringify(actual)
    , 'expected:', JSON.stringify(expected)
    , message ? 'message: '+message : ''
    , ''
    ].join('\n  ')
  )
}
