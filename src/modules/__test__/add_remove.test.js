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

describe('Add function', () => {
  test('it should add a task to the tasks class', () => {
    const task = new Task('task1', 1);
    const arr = [];
    arr.push(task);
    const tasks = new Tasks();
    expect(tasks.add(task)).toEqual(arr);
  });
  test('it should increase the tasks length', () => {
    const task1 = new Task('task1', 1);
    const task2 = new Task('task2', 2);
    const tasks = new Tasks();
    tasks.add(task1);
    tasks.add(task2);
    expect(tasks.list.length).toEqual(2);
  });
});

describe('Delete function', () => {
  test('it should remove the first element and update the index in the next elements', () => {
    const task1 = new Task('task1', 1);
    const task2 = new Task('task2', 2);
    const tasks = new Tasks();

    tasks.add(task1);
    tasks.add(task2);

    tasks.remove(1);
    expect(tasks.list[0].description).toEqual('task2');
    expect(tasks.list[0].index).toEqual(1);
  });
  test('it should remove a task and update the tasks length', () => {
    const task1 = new Task('task1', 1);
    const task2 = new Task('task2', 2);
    const tasks = new Tasks();
    tasks.add(task1);
    tasks.add(task2);
    tasks.remove(2);
    expect(tasks.list.length).toEqual(1);
  });
});