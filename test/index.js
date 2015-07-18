'use strict'

var test = require('tape')

var utils = require('../lib')
var actionCreator = utils.actionCreator
var optionsActionCreator = utils.optionsActionCreator

test('basic type-passing action creator', function(t) {
  t.plan(2)
  var ac = actionCreator('test')
  t.deepEqual(ac(), {type: 'test'}, 'action type is passed')
  t.deepEqual(ac(1, 2, 3), {type: 'test'}, 'additional arguments are ignored')
})

test('action creator with positional arguments (specified as positional arguments)', function(t) {
  t.plan(2)
  var ac = actionCreator('test', 'foo', 'bar')
  t.deepEqual(ac(1, 2), {type: 'test', foo: 1, bar: 2}, 'action type and arguments are passed')
  t.deepEqual(ac(1, 2, 3), {type: 'test', foo: 1, bar: 2}, 'additional arguments are ignored')
})

test('action creator with positional arguments (specified as Array)', function(t) {
  t.plan(2)
  var ac = actionCreator('test', ['foo', 'bar'])
  t.deepEqual(ac(1, 2), {type: 'test', foo: 1, bar: 2}, 'action type and arguments are passed')
  t.deepEqual(ac(1, 2, 3), {type: 'test', foo: 1, bar: 2}, 'additional arguments are ignored')
})

test('action creator with unrestricted option object argument', function(t) {
  t.plan(2)
  var ac = optionsActionCreator('test')
  t.deepEqual(ac({foo: 1, bar: 2}), {type: 'test', foo: 1, bar: 2}, 'action type and all options are passed')
  t.deepEqual(ac({foo: 1, bar: 2, baz: 3}), {type: 'test', foo: 1, bar: 2, baz: 3}, 'action type and all options are passed')
})

test('action creator with restricted option object argument (specified as positional arguments)', function(t) {
  t.plan(2)
  var ac = optionsActionCreator('test', 'foo', 'bar')
  t.deepEqual(ac({foo: 1, bar: 2}), {type: 'test', foo: 1, bar: 2}, 'action type and options are passed')
  t.deepEqual(ac({foo: 1, bar: 2, baz: 3}), {type: 'test', foo: 1, bar: 2}, 'additional arguments are ignored')
})

test('action creator with restricted option object argument (specified as Array)', function(t) {
  t.plan(2)
  var ac = optionsActionCreator('test', ['foo', 'bar'])
  t.deepEqual(ac({foo: 1, bar: 2}), {type: 'test', foo: 1, bar: 2}, 'action type and options are passed')
  t.deepEqual(ac({foo: 1, bar: 2, baz: 3}), {type: 'test', foo: 1, bar: 2}, 'additional arguments are ignored')
})
