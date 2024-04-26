pokemon_dict = {
    "1":"bulbasaur",
    "2":"ivysaur",
    "3":"venusaur",
    "4":"charmander",
    "5":"charmeleon",
    "6":"charizard",
    "7":"squirtle",
    "8":"wartortle",
    "9":"blastoise",
    "10":"caterpie",
    "11":"metapod",
    "12":"butterfree",
    "13":"weedle",
    "14":"kakuna",
    "15":"beedrill",
    "16":"pidgey",
    "17":"pidgeotto",
    "18":"pidgeot",
    "19":"rattata",
    "20":"raticate",
    "21":"spearow",
    "22":"fearow",
    "23":"ekans",
    "24":"arbok",
    "25":"pikachu",
    "26":"raichu",
    "27":"sandshrew",
    "28":"sandslash",
    "29":"nidoran",
    "30":"nidorina",
    "31":"nidoqueen",
    "32":"nidoran",
    "33":"nidorino",
    "34":"nidoking",
    "35":"clefairy",
    "36":"clefable",
    "37":"vulpix",
    "38":"ninetales",
    "39":"jigglypuff",
    "40":"wigglytuff",
    "41":"zubat",
    "42":"golbat",
    "43":"oddish",
    "44":"gloom",
    "45":"vileplume",
    "46":"paras",
    "47":"parasect",
    "48":"venonat",
    "49":"venomoth",
    "50":"diglett",
    "51":"dugtrio",
    "52":"meowth",
    "53":"persian",
    "54":"psyduck",
    "55":"golduck",
    "56":"mankey",
    "57":"primeape",
    "58":"growlithe",
    "59":"arcanine",
    "60":"poliwag",
    "61":"poliwhirl",
    "62":"poliwrath",
    "63":"abra",
    "64":"kadabra",
    "65":"alakazam",
    "66":"machop",
    "67":"machoke",
    "68":"machamp",
    "69":"bellsprout",
    "70":"weepinbell",
    "71":"victreebel",
    "72":"tentacool",
    "73":"tentacruel",
    "74":"geodude",
    "75":"graveler",
    "76":"golem",
    "77":"ponyta",
    "78":"rapidash",
    "79":"slowpoke",
    "80":"slowbro"
}

/**
 *  Note: the checkboxes do not have any current functionality when checked or unchecked
 */

// Variables based on HTML ID tags
const taskList = document.getElementById("task_list_items");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");

// Function that loads JSON file for webpage to display task list
function loadTasks() {
    fetch('task-list/hard-coded-tasks.JSON')
        .then(response => response.json())
        .then(data => {
            data.forEach(task => {
                renderTask(task);
            });
            displayRandomImage();
        });
}

// Main function that "renders" or displays task list from JSON file
function renderTask(taskItem) {
    // Create a div element for each task
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("task-id", taskItem.id);
    taskDiv.classList.add("task");
    taskDiv.setAttribute("pokemon-number", randomNumberGenerator());
    
    // Create checkbox (NEW)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskItem.completed;
    checkbox.classList.add("task-checkbox");
    //checkbox.onchange = () => updateTaskCompletion(taskItem.id, checkbox.checked);
    
    // Create header element for task title
    const taskDescription = document.createElement("span");
    taskDescription.textContent = taskItem.task;
    taskDescription.style.fontWeight = "bold";
    taskDescription.setAttribute("name", "taskDescription");

    // Create due date for task item
    const dueDate = document.createElement("span");
    dueDate.textContent = ` Due: ${new Date(taskItem.due).toLocaleString()}`;
    dueDate.setAttribute("name", "dueDate");
    
    // Create a "container" to hold edit/delete button
    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class","buttons");

    // Create a edit button element for each task 
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "edit-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(taskDiv, taskItem.id));

    // Create a delete button for each task
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(taskDiv, taskItem.id));

    // Put edit & delete button into "container"
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Create image container with an image element
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    image.id = "random-image" + taskItem.id; 
    image.src = ""; 
    image.alt = "";
    image.style.width = "100px";
    image.style.height = "100px";

    // Put image into a "container"
    imageContainer.appendChild(image);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(dueDate);
    taskDiv.appendChild(buttonContainer);
    taskDiv.appendChild(imageContainer);

    taskList.appendChild(taskDiv);
}

// // Function that adds a new task
// function addNewTask(title) {
//     // Update tasks data & re-render list
//     fetch('task-list/hard-coded-tasks.json')
//         .then(response => response.json())
//         .then(data => {
//             const newID = data.length + 1; // this is a bug!
//             const newTask = {
//                 "id": newID,
//                 "task": title,
//                 "completed": false,
//                 "priority": "Low",     // filler
//                 "due": "filler date" // filler
//             }

//             const divItem = renderTask(newTask);
//             //taskDivElement.innerHTML = "";
//             // loadTasks();
//         });
// }

// Function that deletes a task
function deleteTask(divItem, taskId) {
    fetch('task-list/hard-coded-tasks.json')
    .then(response => response.json())
        .then(data => {
            divItem.remove();
        });
}

// // Function to edit a task
function editTask(divItem, taskId) {
    // Get current task title/description
    const taskTitle = divItem.querySelector("span[name='taskDescription']").textContent;
    
    // Create input text box to change task title
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskTitle;

    // Save due date & current date
    const dueDate = divItem.querySelector("span[name='dueDate']").textContent;
    var currentDueDate = new Date(dueDate.replace(' Due: ', ''));

    // Date Dropdown
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = currentDueDate.toISOString().split('T')[0];
    const originalDate = dateInput.value;

    // Time
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.value = currentDueDate.toTimeString().substring(0,5);
    const originalTime = timeInput.value;

    // Hide task title, edit/delete buttons
    divItem.querySelector("span[name='taskDescription']").style.display = "none";
    divItem.querySelector("span[name='dueDate']").style.display = "none";
    divItem.querySelector("div[class='buttons']").style.display = "none";
    divItem.querySelector("input[type='checkbox']").style.display = "none";
    
    // Wrap buttons for better query targeting
    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class","edit-buttons"); 
    
    // Create a save button to save changes
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => saveEdit(divItem, taskId, editInput.value, taskTitle, 
        dateInput.value, originalDate, timeInput.value, originalTime));

    // Create a cancel button to cancel changes
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => cancelEdit(divItem, taskTitle));
    
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    divItem.appendChild(editInput);
    divItem.appendChild(dateInput);
    divItem.appendChild(timeInput);
    divItem.appendChild(buttonContainer);
}

// // Function to save edited task
function saveEdit(divItem, taskId, newTitle, taskTitle, newDate, originalDate, newTime, originalTime) {
    let flag = false;
    let flag2 = false;
    var dateObj = new Date(newDate);
    
    if (newTitle != taskTitle && newTitle.length != 0) {
        divItem.querySelector("span[name='taskDescription']").textContent = newTitle;
    }

    if (newDate != originalDate) {
        flag = true;
    }
    if(newTime != originalTime) {
        flag2 = true;
    }

    if (flag || flag2) {
        if (flag) {
            dateObj.setDate(dateObj.getDate() + 1);   
        }
        if (flag2) {
            var time = newTime.split(":")
            dateObj.setHours(time[0], time[1]);
        }
        else {
            var time = originalTime.split(":");
            dateObj.setHours(time[0], time[1]);
        }

        divItem.querySelector("span[name='dueDate']").textContent = ` Due: ${dateObj.toLocaleString()}`;
    }
    cancelEdit(divItem, taskTitle); // revert to original title
}

// // Function to cancel editing a task
function cancelEdit(divItem, originalTitle) {
    // Unhides original task title, date, and edit/delete buttons
    divItem.querySelector("span[name='taskDescription']").removeAttribute("style");
    divItem.querySelector("span[name='taskDescription']").style.fontWeight = "bold";
    divItem.querySelector("span[name='dueDate']").removeAttribute("style");
    divItem.querySelector("div[class='buttons']").removeAttribute("style");
    divItem.querySelector("input[type='checkbox']").removeAttribute("style");
    
    // Deletes the input text box & container that contains save/cancel button
    divItem.querySelector("input[type='text']").remove();
    divItem.querySelector("div[class='edit-buttons']").remove();
    divItem.querySelector("input[type='date']").remove();
    divItem.querySelector("input[type='time']").remove();
}

function randomNumberGenerator () {
    var numPokemon = 80;
    var randomIndex = Math.floor(Math.random() * numPokemon)+1;
    var randomNumberString = randomIndex.toString();
    return randomNumberString;
}

// /** 
//  * When user presses the "Add" button, it reads the new task and sends that
//  * input to the addNewTask function
//  */
// addTaskButton.addEventListener("click", () => {
//     const newTaskTitle = newTaskInput.value.trim();
//     if (newTaskTitle) {
//         addNewTask(newTaskTitle);
//         newTaskTitle.value = "";
//     }
// });

loadTasks();

// Function to fetch and display tasks from JSON
function displayTasks() {
    fetch('task-list/hard-coded-tasks.json')
        .then(response => response.json())
        .then(tasks => {
            const taskWidget = document.getElementById('taskWidget');
            tasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');

                taskDiv.innerHTML = `
                    <div class="task-id">Task ID: ${task.id}</div>
                    <div>Task: ${task.task}</div>
                    <div class="task-completed">Completed: ${task.completed ? 'Yes' : 'No'}</div>
                    <div class="task-priority">Priority: ${task.priority}</div>
                    <div>Due: ${task.due}</div>
                `;
                taskWidget.appendChild(taskDiv);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Function to generate random number 1-80 
function genRandomNum() {
    var numPokemon = 80;
    var randomIndex = Math.floor(Math.random() * numPokemon)+1;
    var randomNumberString = randomIndex.toString();
    return randomNumberString;
}

// Function uses getRandomNum to generate an image URL to the corresponding pokémon
function getImageUrl() {
    var randPokemonNum = genRandomNum()
    while (randPokemonNum.length < 3) {
        randPokemonNum = '0' + randPokemonNum;
    }
    return "UI_src/imgs/pokemon/pokemon_icon_" + randPokemonNum + "_00.png";
}
 
/* 
    Function checks for completed tasks, and adds the pokémon associated with them to a list.

    To be used in the UI for the invetory bar under the 
*/
function addPokemonToInventory() {
    var caughtPokemon = []
    var tasks = document.querySelectorAll(".task");
    for (var task of tasks) {
        var checkbox = task.querySelector(".task-checkbox");
        if (checkbox && checkbox.checked) {
            var pokemonCaught = task.getAttribute("pokemon-number");
            caughtPokemon.push(pokemon_dict[pokemonCaught])
        }
    }
    console.log(caughtPokemon);
    return caughtPokemon;
}

function displayRandomImage() {
    for (var i = 1; i < 8; i++) {
        var randomImageUrl = getImageUrl();
        var imageElement = document.getElementById("random-image" + i);
        imageElement.src = randomImageUrl;
        imageElement.alt = randomImageUrl;
    }
}

// Call the function to display tasks when the page loads
displayTasks();
addPokemonToInventory();
