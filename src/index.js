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
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'row task flex-around');
    listItem.setAttribute('id', `list-${task.index}`);
    const divItem = document.createElement('div'); 
    
    const checkItem = document.createElement('input');
    checkItem.className = 'checkbox';
    checkItem.setAttribute('type', 'checkbox');
    checkItem.setAttribute('name', `check-${task.index}`);
    checkItem.setAttribute('id', `check-${task.index}`);
    checkItem.addEventListener('change', () => {
      check(task.index);
    });
    
    const textItem = document.createElement('input');
    textItem.setAttribute('type', 'text');
    textItem.className = 'text-task';
    textItem.setAttribute('id', task.index);
    if(task.completed) textItem.classList.add('check');
    textItem.setAttribute('value', task.description);
    textItem.addEventListener('input', () => {
      update(task.index);
    });
    textItem.addEventListener('focus', () => {
      appearDelete(task.index)
    });
    textItem.addEventListener('blur', () => {
      appearDelete(task.index)
    });

    divItem.appendChild(checkItem);
    divItem.appendChild(textItem);
    listItem.appendChild(divItem);

    const trashBtn = document.createElement('img');
    trashBtn.className = 'icon-trash';
    trashBtn.classList.add('hide');
    trashBtn.setAttribute('src', trash);
    trashBtn.setAttribute('id', `trash-${task.index}`);
    trashBtn.addEventListener('click', () => {
      sendTrash(task.index);
    });

    const moreBtn = document.createElement('img');
    moreBtn.className = 'icon-more';
    moreBtn.setAttribute('src', more);
    moreBtn.setAttribute('id', `more-${task.index}`);

    listItem.appendChild(trashBtn);
    listItem.appendChild(moreBtn);

    list.appendChild(listItem);

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
  const deleteItem = document.getElementById(`list-${index}`);
  deleteItem.remove();
};

window.appearDelete = (index) => {
  setTimeout(() => {
    document.getElementById(`trash-${index}`)?.classList.toggle('hide');
    document.getElementById(`more-${index}`)?.classList.toggle('hide');
  }, 200);
};

window.update = (index) => {
  tasks.update(index, document.getElementById(index).value);
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
