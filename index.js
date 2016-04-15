var _bind = require ('underbind')

module.exports = entype

function entyped(fn, context, checks) {
  var args = Array.prototype.slice.call(arguments, 3)
  for(var i = 0; i< checks.length; i++){
     checks[i](args[i], 'arguments[',i,']')
  }
  return fn.apply(this || context, args)
}
entyped._bind = _bind

function returns(fn, checker) {
  return function() {
    return checker(fn.apply(this, arguments))
  }
}
returns._bind = _bind

function entype() {
  var fn = arguments[0]
  var args = Array.prototype.slice.call(arguments, 1)
  var fnWithArgChecks = entyped._bind(fn, this, args)
  fnWithArgChecks.returns = returns._bind(fnWithArgChecks)
  return fnWithArgChecks
}

entype.number = number.bind(number)

function number(val) {
  if(typeof val === 'number') return val
  throwOnFail.apply(this, arguments)
}

function throwOnFail(val) {
  var leader = Array.prototype.slice.call(arguments, 1) || []
  var words = leader.concat(
    '(',(typeof val), JSON.stringify(val),')'
  , 'fails check "'+this.name+'"'
  ).join(' ')
  throw new Error(words)
}

entype.any = any
function any(val) { return val }