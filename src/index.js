import './index.css';

const tasks = [
  {
    description: 'descripsss',
    completed: false,
    index: 0,
  },
  {
    description: 'descripsss2',
    completed: true,
    index: 1,
  },
];

const list = document.querySelector('.list');
// const inputText = document.querySelector('.text-input');

window.check = (index) => {
  document.getElementById(index).classList.toggle('check');
};

const drawTasks = (tasks) => {
  tasks.forEach((task) => {
    list.innerHTML += `
        <li class="row task flex-around" id="${task.index}"><div><input class="checkbox" onclick=check(${task.index}) type="checkbox" name="" id="check-${task.index}">${task.description}</div><img src='../src/icons/tres-puntos.png'></li>
        `;
  });
};

drawTasks(tasks);
