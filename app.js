document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const taskWidget = document.getElementById('task_list_items');
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');

    // Function to load tasks from JSON and display them
    function loadTasks() {
        fetch('task-list/hard-coded-tasks.json')
            .then(response => response.json())
            .then(tasks => {
                taskWidget.innerHTML = ''; // Clear existing tasks
                tasks.forEach(task => {
                    renderTask(task);
                });
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    // Function to render a single task
    function renderTask(task) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // Creating a checkbox input for the task completion status
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.classList.add('task-checkbox');
        checkbox.onchange = () => updateTaskCompletion(task.id, checkbox.checked);

        // Create elements for task details
        const taskDescription = document.createElement('span');
        taskDescription.textContent = task.task;

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = ` Priority: ${task.priority}`;

        const dueSpan = document.createElement('span');
        dueSpan.textContent = ` Due: ${new Date(task.due).toLocaleString()}`;

        // Append elements to taskDiv
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(prioritySpan);
        taskDiv.appendChild(dueSpan);

        taskWidget.appendChild(taskDiv);
    }

    // Event listener for adding new tasks
    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            const taskTitle = newTaskInput.value.trim();
            if (taskTitle) {
                const newTask = {
                    id: Date.now(), // unique identifier for the new task
                    task: taskTitle,
                    completed: false,
                    priority: 'Low',
                    due: new Date().toISOString()
                };
                renderTask(newTask);
                newTaskInput.value = ''; // Clear the input after adding
            }
        });
    }

    // Load initial tasks
    loadTasks();
});

// Function to update task completion status
function updateTaskCompletion(taskId, isCompleted) {
    console.log(`Task ${taskId} completion status updated to ${isCompleted}`);
    // Update the task completion in local storage or server
}

