var GLOBAL_TASKS_NUMBER = 0

function addTask(addStorage = true, text = '', done = false) {
  const taskText = (text === '' ? document.getElementById('input-new-task').value : text)
  console.log(taskText)

  if (taskText === '') return

  const divNewItem = document.createElement('div')
  divNewItem.className = 'task-item'
  const newTask = document.createElement('input')
  newTask.type = 'checkbox'
  newTask.name = `task_${GLOBAL_TASKS_NUMBER}`
  newTask.id = `task_${GLOBAL_TASKS_NUMBER}`
  newTask.ariaLabel = taskText
  newTask.checked = done;
  newTask.addEventListener('change', handleCheckTask)
  const newTaskSpan = document.createElement('span')
  newTaskSpan.className = "check"
  const newTaskLabel = document.createElement('label')
  newTaskLabel.htmlFor = `task_${GLOBAL_TASKS_NUMBER}`
  newTaskLabel.textContent = taskText
  newTaskLabel.className = 'task-text'
  const newTaskTrashWrapper = document.createElement('div')
  newTaskTrashWrapper.className = 'trash-wrapper'
  const newTaskTrash = document.createElement('img')
  newTaskTrash.src = '../images/trash.svg';
  newTaskTrash.className = 'trash'
  newTaskTrash.alt = 'Exclude item'
  newTaskTrashWrapper.addEventListener('click', removeTask)
  newTaskTrashWrapper.appendChild(newTaskTrash)

  divNewItem.append(newTask)
  divNewItem.append(newTaskSpan)
  divNewItem.append(newTaskLabel)
  divNewItem.append(newTaskTrashWrapper)
  const tasksList = document.getElementById('tasks-list')
  tasksList.append(divNewItem)

  GLOBAL_TASKS_NUMBER++

  if (addStorage)
    addLocalStorage(taskText);
}

function addTaskKey(event, addStorage = true, text = '', done = false){
  console.log(event.keyCode);
  if(event.key === 'Enter'){
    addTask(addStorage,text, done);
  }
}

function handleCheckTask(event){
  console.log(event.target.checked);
  const task = event.target.parentElement;
  const taskText = task.children[2].innerHTML;
  let tasksJson = window.localStorage.getItem('tasks');
  tasksJson = JSON.parse(tasksJson);
  tasksJson.forEach(task => {
    if(task.task === taskText) {
      task.done = event.target.checked;
    }
  })
  window.localStorage.setItem('tasks', JSON.stringify(tasksJson));
}

function removeTask(event){
  const task = event.target.parentElement.parentElement;
  const tasksList = document.getElementById('tasks-list');
  tasksList.removeChild(task);
  removeLocalStorage(task.children[2].innerHTML);
}

function addLocalStorage(taskText) {
  let tasksJson = window.localStorage.getItem('tasks');
  tasksJson === null ? tasksJson = [] : tasksJson = JSON.parse(tasksJson);

  tasksJson.push({ task: taskText, done: false, date: new Date() });
  window.localStorage.setItem('tasks', JSON.stringify(tasksJson));
}

function removeLocalStorage(taskText) {
  let tasksJson = window.localStorage.getItem('tasks');
  tasksJson = JSON.parse(tasksJson);

  tasksJson.forEach(task => {
    if(task.task === taskText) {
      tasksJson.splice(tasksJson.indexOf(task), 1);
    }
  }
  );

  window.localStorage.setItem('tasks', JSON.stringify(tasksJson));
}

window.onload = () => {
  let tasksJson = window.localStorage.getItem('tasks');

  if(tasksJson !== null) {
    const today = new Date();
    tasksJson = JSON.parse(tasksJson)

    tasksJson.forEach(task => {
      if(today.toDateString() === new Date(task.date).toDateString()) {
        addTask(false, task.task, task.done);
      }else{
        tasksJson.splice(tasksJson.indexOf(task), 0);
      }
    });
    
    window.localStorage.setItem('tasks', JSON.stringify(tasksJson));
  }else{
    return
  }
}
