# DEPRECATED

ES6 arrow functions with implicit returns, argument destructuring and object literal enhancements make it easy to keep your action creators compact without helper functions.

## ES6 Alternative

```js
import types from './action-types'

export let addLesson = () => ({type: types.ADD_LESSON})

export let importLessons = (lessons) => ({type: types.IMPORT_LESSON, lessons})

export let updateLesson = ({id, update}) => ({type: types.UPDATE_LESSON, id, update})
```

# Redux Action Utils

Factory functions for reducing action creator boilerplate.

```
npm install --save redux-action-utils
```

## Before

```js
var types = require('./action-types')

function addLesson() {
  return {
    type: types.ADD_LESSON
  }
}

function importLessons(lessons) {
  return {
    type: types.IMPORT_LESSONS,
    lessons
  }
}

function updateLesson(options) {
  return {
    type: types.SELECT_LESSON,
    id: options.id,
    update: options.update
  }
}

module.exports = {addLesson, importLessons, updateLesson}
```

## After

```js
var types = require('./action-types')
var {actionCreator, optionsActionCreator} = require('redux-action-utils')

module.exports = {
  addLesson: actionCreator(types.ADD_LESSON),
  importLessons: actionCreator(types.IMPORT_LESSONS, 'lessons'),
  updateLesson: optionsActionCreator(types.UPDATE_LESSON, 'id', 'update')
}
```

## API

### `actionCreator(type: String)`

Creates an action creator which will create an action object with the given type.

```js
var ac = actionCreator(types.ADD_LESSON)
ac()
// → {type: 'ADD_LESSON'}
```

### `actionCreator(type: String, props: Array<String>)`
### `actionCreator(type: String, ...props: String)`

Creates an action creator which will create an action object with the given type and use the given property names to pass any positional arguments given to it.

```js
var ac = actionCreator(types.IMPORT_LESSONS, 'lessons')
ac(['lesson 1', 'lesson 2'])
// → {type: 'IMPORT_LESSONS', lessons: ['lesson 1', 'lesson 2']}
```

### `optionsActionCreator(type: String)`

Creates an action creator which takes a single object argument and adds its properties to the action object.

### `optionsActionCreator(type: String, props: Array<String>)`
### `optionsActionCreator(type: String, ...props: String)`

Creates an action creator which takes a single object argument and adds only the specified properties from it to the action object.

```js
var ac = optionsActionCreator(types.UPDATE_LESSON, 'id', 'update')
ac({
  id: 1
  update: {
    text: '## Lesson 1'
  }
})
/* →
{
  type: 'UPDATE_LESSON',
  id: 1,
  update: {
    text: '## Lesson 1'
  }
}
*/
```

## MIT Licensed
