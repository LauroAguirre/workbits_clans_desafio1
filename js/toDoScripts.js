var GLOBAL_TASKS_NUMBER = 0

function addTask() {
  const taskText = document.getElementById('input-new-task').value
  console.log(taskText)

  if (taskText === '') return

  const divNewItem = document.createElement('div')
  divNewItem.className = 'task-item'
  const newTask = document.createElement('input')
  newTask.type = 'checkbox'
  newTask.name = `task_${GLOBAL_TASKS_NUMBER}`
  newTask.id = `task_${GLOBAL_TASKS_NUMBER}`
  newTask.ariaLabel = taskText
  const newTaskSpan = document.createElement('span')
  newTaskSpan.className = "check"
  const newTaskLabel = document.createElement('label')
  newTaskLabel.htmlFor = `task_${GLOBAL_TASKS_NUMBER}`
  newTaskLabel.textContent = taskText

  divNewItem.append(newTask)
  divNewItem.append(newTaskSpan)
  divNewItem.append(newTaskLabel)
  const tasksList = document.getElementById('tasks-list')
  tasksList.append(divNewItem)

  GLOBAL_TASKS_NUMBER++
}