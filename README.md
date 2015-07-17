# Redux Action Utils

Factory functions for reducing action creator boilerplate.

```
npm install --save redux-action-utils
```

## Before

```
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
var {action, optionsAction} = require('redux-action-utils')

module.exports = {
  addLesson: action(types.ADD_LESSON),
  importLessons: action(types.IMPORT_LESSONS, 'lessons'),
  updateLesson: optionsAction(types.UPDATE_LESSON, 'id', 'update')
}
```

## API

### `action(type: String)`

Creates an action creator which will create an action object with the given type.

```js
var ac = action(types.ADD_LESSON)
ac()
// → {type: 'ADD_LESSON'}
```

### `action(type: String, props: Array<String>)`
### `action(type: String, ...props: String)`

Creates an action creator which will create an action object with the given type and use the given property names to pass any positional arguments given to it.

```js
var ac = action(types.IMPORT_LESSONS, 'lessons')
ac(['lesson 1', 'lesson 2'])
// → {type: 'IMPORT_LESSONS', lessons: ['lesson 1', 'lesson 2']}
```

### `optionsAction(type: String)`

Creates an action creator which takes a single object argument and adds its properties to the action object.

### `optionsAction(type: String, props: Array<String>)`
### `optionsAction(type: String, ...props: String)`

Creates an action creator which takes a single object argument and adds only the specified properties from it to the action object.

```js
var ac = optionsAction(types.UPDATE_LESSON, 'id', 'update')
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
