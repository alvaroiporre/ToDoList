import './index.css';
import Task from './modules/Task.js';
import Tasks from './modules/Tasks.js';
import reload from './reload.png';
import more from './more.png';
import returnI from './icon_return.svg';
import trash from './trash.png';

const list = document.querySelector('.list');
const inputText = document.querySelector('.text-input');
const iconReload = document.getElementById('icon-reload');
const iconReturn = document.getElementById('icon-return');
iconReload.src = reload;
iconReturn.src = returnI;

const tasks = new Tasks();

const drawTasks = (tasks) => {
  list.innerHTML = '';
  tasks.forEach((task) => {
    list.innerHTML += `
        <li class="row task flex-around" >
          <div>
            <input class="checkbox" onchange=check(${task.index}) type="checkbox" name="check-${task.index}" id="check-${task.index}">
            <input type="text" class="text-task ${(task.completed? 'check':'')}" 
              onchange=update(${task.index}) value)
              onfocus=appearDelete(${task.index})
              onblur=appearDelete(${task.index}) id="${task.index}" value="${task.description}">
          </div>
          <img class="icon-trash hide" onclick=sendTrash(${task.index}) src='${trash}' id='trash-${task.index}'>
          <img class="icon-more" src='${more}' id='more-${task.index}'>
        </li>
        `;
  });
  tasks.forEach((task) => {
    document.getElementById(`check-${task.index}`).checked = task.completed;
  });
};

window.check = (index) => {
  document.getElementById(index).classList.toggle('check');
  tasks.updateCheck(index);
};

window.sendTrash = (index) => {
  tasks.remove(index);
  drawTasks(tasks.list);
};

window.appearDelete = (index) => {
  setTimeout(() => {
    document.getElementById(`trash-${index}`)?.classList.toggle('hide');
    document.getElementById(`more-${index}`)?.classList.toggle('hide');
  }, 200);
};

window.update = (index) => {
  tasks.update(index, document.getElementById(index).value);
  drawTasks(tasks.list);
};

window.clean = () => {
  tasks.clean();
  drawTasks(tasks.list);
};
inputText.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const newTask = new Task(inputText.value, tasks.list.length + 1);
    tasks.add(newTask);
    drawTasks(tasks.list);
    inputText.value = '';
  }
});

drawTasks(tasks.list);
