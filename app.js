function displayTasks() {
    // fetching from the hardcoded JSON 
    fetch('task-list/hard-coded-tasks.json')
        .then(response => response.json()) 
        .then(tasks => {
            const taskWidget = document.getElementById('task_list_items'); // getting the container where tasks will be displayed
            taskWidget.innerHTML = ''; // clearing any existing content in the container

            // looping through each task in the JSON array
            tasks.forEach(task => {
                const taskDiv = document.createElement('div'); // new div created for each task
                taskDiv.classList.add('task'); // adding a task class for styling if needed

                // Creating a checkbox input for the task completion status
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox'; // setting the type of input to checkbox
                checkbox.checked = task.completed; // setting the checked status based on the task's completion status
                checkbox.classList.add('task-checkbox'); // adding a class for styling if needed

                // formatting the due date
                const dueDate = new Date(task.due).toLocaleString(); // converting ISO date to a local string format

                // setting the inner HTML of the task div to display task details
                taskDiv.innerHTML = `
                    <label class="task-label">
                        ${checkbox.outerHTML} 
                        ${task.task} 
                        <span class="task-priority">Priority: ${task.priority}</span>
                        <span class="task-due">Due: ${dueDate}</span>
                    </label>
                `;

                taskWidget.appendChild(taskDiv); // appending the new task div to the container
            });
        })
        .catch(error => console.error('Error fetching tasks:', error)); // error logging
}

document.addEventListener('DOMContentLoaded', displayTasks);
