const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.addButton');

if (window.localStorage.getItem('tasks') == undefined) {
  let tasks = [];
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

var tasksEX = window.localStorage.getItem('tasks');
var tasks = JSON.parse(tasksEX);

class task {
  constructor(name) {
    this.createItem(name);
  }
  createItem(name) {
    var itemBox = document.createElement('div');
    itemBox.classList.add('item-container');

    var input = document.createElement('input');
    input.type = 'text';
    input.disabled = true;
    input.value = name;
    input.classList.add('input');

    var edit = document.createElement('button');
    edit.classList.add('editButton');
    edit.innerHTML = 'EDIT';
    edit.addEventListener('click', () => this.edit(input, name));

    var remove = document.createElement('button');
    remove.classList.add('deleteButton');
    remove.innerHTML = 'REMOVE';
    remove.addEventListener('click', () => this.remove(itemBox, name));

    container.appendChild(itemBox);

    itemBox.appendChild(input);
    itemBox.appendChild(edit);
    itemBox.appendChild(remove);
  }

  edit(input, name) {
    if (input.disabled == true) {
      input.disabled = !input.disabled;
    } else {
      input.disabled = !input.disabled;
      let indexof = tasks.indexOf(name);
      tasks[indexof] = input.value;
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  remove(itemBox, name) {
    itemBox.parentNode.removeChild(itemBox);
    let index = tasks.indexOf(name);
    tasks.splice(index, 1);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
  if (e.which == 13) {
    check();
  }
});

function check() {
  if (inputValue.value != '') {
    new task(inputValue.value);
    tasks.push(inputValue.value);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    inputValue.value = '';
  }
}

for (var v = 0; v < tasks.length; v++) {
  new task(tasks[v]);
}

new task('sport');
