let todo = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");


function getTodoListFromLocalStorage(){
  let stringifiedTodoList = localStorage.getItem("todolist");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if(parsedTodoList === null){
    return [];
    }else{
      return parsedTodoList;
    }
}

let todolist = getTodoListFromLocalStorage();

saveTodoButton.onclick = function(){
  localStorage.setItem("todolist", JSON.stringify(todolist));
}


addTodoButton.onclick = function(){
    onAddTodo();

}

function onTodoStatusChange(checkboxId, labelId, todoId){
    checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todolist.findIndex(function(eachTodo){
      let eachTodoId = "todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }else{
        return false;
      }

    });
    let todoObject = todolist[todoObjectIndex];

    if(todoObject.isChecked === true){
      todoObject.isChecked = false;
    }else{
      todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todo.removeChild(todoElement);
    console.log(todolist);
    console.log(todoId);
    let deleteIndex = todolist.findIndex(function(eachTodo){
      let eachTodoId = "todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }else{
        return false;
      }
    });
    todolist.splice(deleteIndex, 1);
    console.log(todolist);
  
}
function createAndAppendTodo(Todo){
  let checkboxId = "checkbox" + Todo.uniqueNo;
  let labelId = "label" + Todo.uniqueNo;
  let todoId = "todo" + Todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("todo-item-container","d-flex","flex-row");
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = Todo.isChecked;

  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function(){
    onTodoStatusChange(checkboxId, labelId,todoId);

  }

  todoElement.appendChild(inputElement);

  let labelcontainer = document.createElement("div");
  labelcontainer.classList.add("label-container","d-flex","flex-row");
  todoElement.appendChild(labelcontainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = Todo.text;
  if(Todo.isChecked === true){
    labelElement.classList.add("checked");
  }
  labelcontainer.appendChild(labelElement);

  let deleteIconcontainer = document.createElement("div");
  deleteIconcontainer.classList.add("delete-icon-container");
  labelcontainer.appendChild(deleteIconcontainer);

  let deleteicon = document.createElement("i");
  deleteicon.classList.add("far","fa-trash-alt","delete-icon");
  deleteicon.onclick = function(){
    onDeleteTodo(todoId); 
  }

  deleteIconcontainer.appendChild(deleteicon);
}


function onAddTodo(){
    let todosCount = todolist.length;

    todosCount = todosCount + 1;

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if(userInputValue == ""){
        alert("Enter valid input");
        return;

    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };

    todolist.push(newTodo);

    createAndAppendTodo(newTodo);
    userInputElement.value = ""

}

for(let todo of todolist){
  createAndAppendTodo(todo);
}