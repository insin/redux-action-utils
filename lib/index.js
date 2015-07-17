'use strict'

var slice = Array.prototype.slice

/**
 * Creates an action creator for the given action type, which optionally adds
 * positional arguments given to it to the action object using specified
 * property names.
 *
 * Property names can be specified as an Array of strings or as any number of
 * addiitonal String arguments; arguments passed to the action creator will
 * be assigned to property names in the same order the names were given in.
 */
function action(type) {
  var props = Array.isArray(arguments[1]) ? arguments[1] : slice.call(arguments, 1)
  return function() {
    if (!props.length) {
      return {type: type}
    }
    var args = slice.call(arguments)
    return props.reduce(function(action, prop, index) {
      return (action[prop] = args[index], action)
    }, {type: type})
  }
}

/**
 * Creates an action creator for the given action type which also takes an
 * options object argument, which will either have all of its properties
 * or only specified properties added to the action object.
 *
 * Property names can be specified as an Array of strings or as any number of
 * addiitonal String arguments.
 */
function optionsAction(type) {
  var props = Array.isArray(arguments[1]) ? arguments[1] : slice.call(arguments, 1)
  return function(options) {
    var copyProps = props.length === 0 ? Object.keys(options) : props
    return copyProps.reduce(function(action, prop) {
      return (action[prop] = options[prop], action)
    }, {type: type})
  }
}

module.exports = {
  action: action,
  optionsAction: optionsAction
}
