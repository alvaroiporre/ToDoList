/**
 * @jest-environment jsdom
 */

import Tasks from '../Tasks.js';
import Task from '../Task.js';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Update Description', () => {
  test('it should update the description of a given task', () => {
    const task = new Task('task1', 1);
    const tasks = new Tasks();
    tasks.add(task);
    tasks.update(1, 'task1 updated');
    expect(tasks.list[0].description).toEqual('task1 updated');
  });
});

describe('Update completed', () => {
  test('it should update the completed state of a given task', () => {
    const task = new Task('task1', 1);
    const tasks = new Tasks();
    tasks.add(task);
    tasks.updateCheck(1);
    expect(tasks.list[0].completed).toEqual(true);
  });
});

describe('Clear function', () => {
  test('it should remove all the completed tasks and update the index of each element', () => {
    const task1 = new Task('task1', 1);
    const task2 = new Task('task2', 2);
    const task3 = new Task('task3', 3);
    const task4 = new Task('task4', 4);
    const tasks = new Tasks();

    tasks.add(task1);
    tasks.add(task2);
    tasks.add(task3);
    tasks.add(task4);

    tasks.updateCheck(1);
    tasks.updateCheck(3);

    tasks.clean();
    expect(tasks.list.length).toEqual(2);
    expect(tasks.list[0].index).toEqual(1);
    expect(tasks.list[1].index).toEqual(2);
    expect(tasks.list[0].description).toEqual('task2');
    expect(tasks.list[1].description).toEqual('task4');
  });
});