//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var CLASSNAMES = {
  listItem: 'todo__item',
  task: 'task',
  taskInput: 'task__edit_mod-add',
  editInput: 'task__edit',
  checkBox: 'task__checkbox',
  label: 'task__text',
  button: 'btn',
  img: 'btn__icon',
  completedTasks: 'todo__list_mod-completed',
  incompleteTasks: 'todo__list_mod-incomplete',
  editButton: 'btn_mod-edit',
  deleteButton: 'btn_mod-delete',
  addButton: 'btn_mod-add',
}

var taskInput=document.querySelector(`.${CLASSNAMES.taskInput}`);//Add a new task.
var addButton=document.querySelector(`.${CLASSNAMES.addButton}`);//first button//add button
var incompleteTaskHolder=document.querySelector(`.${CLASSNAMES.incompleteTasks}`);//ul of #incomplete-tasks
var completedTasksHolder=document.querySelector(`.${CLASSNAMES.completedTasks}`);//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");
  listItem.classList.add(CLASSNAMES.listItem);
  listItem.classList.add(CLASSNAMES.task);

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
  //label
  var label=document.createElement("span");//label
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  label.innerText=taskString;
  label.className = CLASSNAMES.label;

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className = CLASSNAMES.checkBox;
  editInput.type="text";
  editInput.className = CLASSNAMES.editInput;

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = CLASSNAMES.button + " " + CLASSNAMES.editButton;

  deleteButton.className = CLASSNAMES.button + " " + CLASSNAMES.deleteButton;
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.alt = 'remove image';
  deleteButtonImg.className = CLASSNAMES.img;
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector('input[type=text]');
  var label=listItem.querySelector(`.${CLASSNAMES.label}`);
  var editBtn=listItem.querySelector(`.${CLASSNAMES.editButton}`);
  var containsClass=listItem.classList.contains("task_state-edit");
  //If class of the parent is .task_state-edit
  if(containsClass){

    //switch to .task_state-edit
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .task_state-edit on the parent.
  listItem.classList.toggle("task_state-edit");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  var checkBox=taskListItem.querySelector("input[type=checkbox]");
  var editButton=taskListItem.querySelector(`button.${CLASSNAMES.editButton}`);
  var deleteButton=taskListItem.querySelector(`button.${CLASSNAMES.deleteButton}`);


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
