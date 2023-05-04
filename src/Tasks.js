export default class Tasks {
  constructor() {
    this.list = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
  }

  add = (data) => {
    this.list.push(data);
    this.updateLocalStorage();
  }

  remove = (id) => {
    this.list = this.list.filter((value) => value.index !== id);
    this.updateIndex();
    this.updateLocalStorage();
  };

  update = (index, description) => {
    this.list[index - 1].description = description;
    this.updateLocalStorage();
  }

  updateIndex = () => {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].index = i + 1;
    }
    this.updateLocalStorage();
  }

  updateCheck = (index) => {
    this.list[index - 1].completed = !this.list[index - 1].completed;
    this.updateLocalStorage();
  }

  updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  clean = () => {
    this.list = this.list.filter((task) => task.completed !== true);
    this.updateIndex();
  }
}