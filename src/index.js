import './index.css';
import Task from './Task.js';
import Tasks from './Tasks.js';
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

let tasks = new Tasks();

window.check = (index) => {
  document.getElementById(index).classList.toggle('check');
};

window.sendTrash = (index) => {
  console.log(index);
  tasks.remove(index);
  drawTasks(tasks.list);
}

window.appearDelete = (id) => {
  setTimeout(() => {
    document.getElementById('trash-' + id).classList.toggle('hide');
    document.getElementById('more-' + id).classList.toggle('hide');
  }, 100);
}

window.update = (index) => {
  tasks.update(index, document.getElementById(index).value);
  drawTasks(tasks.list);
}



const drawTasks = (tasks) => {
  list.innerHTML = '';
  tasks.forEach((task) => { 
    list.innerHTML += `
        <li class="row task flex-around" >
          <div>
            <input class="checkbox" onclick=check(${task.index}) type="checkbox" name="" id="check-${task.index}">
            <input type="text" class="text-task" 
              onchange=update(${task.index}) value)
              onfocus=appearDelete(${task.index}) 
              onblur=appearDelete(${task.index}) id="${task.index}" value="${task.description}">
          </div>
          <img class="icon-trash hide" onclick=sendTrash(${task.index}) src='${trash}' id='trash-${task.index}'>
          <img class="icon-more" src='${more}' id='more-${task.index}'>
        </li>
        `;
  });
};

inputText.addEventListener('keypress',(event) => {
    if(event.key == 'Enter'){
      const newTask = new Task(inputText.value, tasks.list.length + 1);
      tasks.add(newTask);
      drawTasks(tasks.list);
      inputText.value = '';
    }
});

drawTasks(tasks.list);
