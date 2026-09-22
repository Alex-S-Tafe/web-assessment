let taskList = [];
let consultantList = [
    "Alice",
    "Bob",
    "Chuck",
    "Dave"
];

taskList.push(new Task(
    "Result Panels",
    "2026-10-13",
    "2",
    "Bob",
    "use class in CSS",
    true
));

taskList.push(new Task(
    "Finished tasks get strike-through",
    "2026-10-13",
    "2",
    "Bob",
    "gotta research that",
    true
));

taskList.push(new Task(
    "Individual delete",
    RandomDate(),
    "1",
    "Bob",
    "",
    true
));

taskList.push(new Task(
    "JSDoc",
    RandomDate(),
    "1",
    "Bob",
    "Also comment code",
    true
));

taskList.push(new Task(
    "Debug Code",
    RandomDate(),
    "1",
    "Bob",
    "Use online linter and what not",
    false
));

taskList.push(new Task(
    "CSS task toggler",
    RandomDate(),
    "1",
    "Bob",
    "On complete, toggle off",
    true
));

taskList.push(new Task(
    "Complete software test report",
    RandomDate(),
    "1",
    "Bob",
    "",
    false
));

taskList.push(new Task(
    "Darkmode toggler",
    RandomDate(),
    "1",
    "Bob",
    "",
    true
));

taskList.push(new Task(
    "Personalized form submission",
    RandomDate(),
    "1",
    "Bob",
    "",
    true
));

taskList.push(new Task(
    "Pretty up task display",
    RandomDate(),
    "1",
    "Bob",
    "",
    false
));

taskList.push(new Task(
    "Uniform form displays",
    RandomDate(),
    "1",
    "Bob",
    "",
    true
));

/**
 * Creates a task from provided arguments
 * @param {string} name - Name of the task
 * @param {string} due - Tasks due date
 * @param {string} priority - Priority, 1, 2 or 3
 * @param {string} consultant - Name of assigned consultant
 * @param {string} notes - Notes relevant to the task
 * @param {bool} done - Indicates if task is completed
 * @returns Task
 */

function Task(name, due, priority, consultant, notes, done){
    this.name = name;
    this.dueDate = due;
    this.priority = priority;
    this.consultant = consultant;
    this.notes = notes;
    this.isDone = done
}


/**
 * Push random dummy data onto the task list for testing purposes
 * @param {int} num 
 */
function AddDummyTasks(num){
    for (let i = 0; i < num; i++){
        taskList.push(new Task(
            RandomString(10),
            RandomDate(),
            `${Math.floor(Math.random() * 3) + 1}`,
            consultantList[i % consultantList.length],
            RandomString(30),
            false
        ));
    }
    LoadTasks();
}

AddDummyTasks(6);

/**
 * Generates a random date in format YYYY-MM-DD
 * @returns string
 */
function RandomDate(){
    let yr = 2026 + Math.floor(Math.random() * 2);
    let mt = Math.floor(Math.random() * 12 + 1);
    if (mt < 10) mt = `0${mt}`;
    let dy = Math.floor(Math.random() * 28 + 1);
    if (dy < 10) dy = `0${dy}`;
    return `${yr}-${mt}-${dy}`;
}

/**
 * Generates a random string of length 'num'
 * @param {int} num 
 * @returns string
 */
function RandomString(num){
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let randString = "";
    for (let i = 0; i < num; i++){
        randString += chars.charAt(Math.floor(Math.random() * (chars.length + 1)));
    }
    return randString;
}

function SubmitTask(){
    let isDone = document.getElementById("newTaskInDone").checked;
    taskList[taskList.length] = new Task(
        document.getElementById("newTaskInName").value,
        document.getElementById("newTaskInDueDate").value,
        document.getElementById("newTaskInPriority").value,
        document.getElementById("newTaskInConsultant").value,
        document.getElementById("newTaskInNotes").value,
        isDone
    );

    //console.log(taskList);

    document.getElementById("newTaskForm").reset();
    LoadTasks();
    alert(`Task added to list: ${taskList[taskList.length - 1].name}`);
    return false;
}

function LoadConsultants(){
    let consultantOptions = `<option value="">Choose</option>\n`
    for (let i = 0; i < consultantList.length; i++){
        consultantOptions += `<option value="${consultantList[i]}">${consultantList[i]}</option>\n`;
    }
    document.getElementById("newTaskInConsultant").innerHTML = consultantOptions;
}

LoadConsultants();

/**
 * Serves to load or refresh the task list from taskList array
 */
function LoadTasks(){
    //SortByName();
    //console.log(taskList);
    let taskDisplay = `
        <table width="100%">
            <tr>    
                <th>Name</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Consultant</th>
                <th>Done</th>
            </tr>
    `;
    if (taskList != null){
        for (let i = 0; i < taskList.length; i++){
            let isChecked = "";
            if (taskList[i].isDone) isChecked = " checked";
            taskDisplay += `
                <tr>
                    <td>${taskList[i].isDone? "<del>":""}${taskList[i].name}${taskList[i].isDone? "</del>":""}</td>
                    <td>${taskList[i].isDone? "<del>":""}${taskList[i].dueDate}${taskList[i].isDone? "</del>":""}</td>
                    <td>${taskList[i].isDone? "<del>":""}${taskList[i].priority}${taskList[i].isDone? "</del>":""}</td>
                    <td>${taskList[i].isDone? "<del>":""}${taskList[i].consultant}${taskList[i].isDone? "</del>":""}</td>
                    <td><input id="taskCheckbox${i}" type="checkbox"${isChecked}></td>
                </tr>
            `;
        }
    }
    if (taskList.length == 0) {
        taskDisplay += `
            <tr>
                <td>No Tasks</td>
            </tr>
        `;
    }
    taskDisplay += `</table>`;
    document.getElementById("taskView").innerHTML = taskDisplay;
    document.getElementById("sreachbox").focus();
    AttachCheckboxListeners();
}



LoadTasks();

// js weirdness bug
function AttachCheckboxListenersBugged(){
    for (let i = 0; i < taskList.length; i++){
        document.getElementById(`taskCheckbox${i}`).addEventListener('change', TaskDoneChange(i));
    }
}

// js weirdness fixed
function AttachCheckboxListeners(){
    for (let i = 0; i < taskList.length; i++){
        document.getElementById(`taskCheckbox${i}`).addEventListener('change', function(){
            TaskDoneChange(i)
        });
    }
}

/**
 * Toggles isDone field of index i in taskList
 * @param {int} i 
 */
function TaskDoneChange(i){
    //console.clear();
    //console.log(i + " before: " + taskList[i].isDone);
    taskList[i].isDone = document.getElementById(`taskCheckbox${i}`).checked;
    LoadTasks();
    //console.log(i + " after: " + taskList[i].isDone);
}

/**
 * Deletes all tasks marked as completed (isDone == true)
 */
function DeleteCompleted() {
    for (let i = taskList.length - 1; i >= 0; i--){
        if (taskList[i].isDone) {
            taskList.splice(i, 1);
        }
    }
    LoadTasks();
}


/**
 * Sorts tasks by field "name"
 */
function SortByName(){
    taskList.sort(function(a, b){
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });
    LoadTasks();
}

/**
 * Sorts tasks by field "consultant"
 */
function SortByConsultant(){
    taskList.sort(function(a, b){
        if (a.consultant > b.consultant) return 1;
        if (a.consultant < b.consultant) return -1;
        return 0;
    });
    LoadTasks();
}


/**
 * Sorts by name then searches tasks by name for exact match
 * @param {string} target 
 * @returns Task
 */
function BinSearchByName(target){
    lastSearchType = "binary"
    SortByName();
    if (taskList.length == 0) return null;
    let start = 0;
    let end = taskList.length - 1;
    while (start <= end){
        let mid = Math.floor((start + end) / 2);
        let midTask = taskList[mid];
        if (midTask.name === target) return midTask;
        if (midTask.name < target) start = mid + 1;
        else end = mid - 1;
    }
    return null;
}

/**
 * Calls the binary search function and displays the results in
 * their own individual panels
 * @returns void
 */
function DisplayBinSearchResult(){
    target = document.getElementById("searchbox").value;
    result = BinSearchByName(target);
    if (result == null) {
        document.getElementById("searchResult").innerHTML = `${target} not found`;
        //console.log("not found");
        return;
    }
    document.getElementById("searchResult").innerHTML = 
        `<div class="searchResult">
        <p>${target} found.<br>
        ${result.isDone? "<del>":""}<br>
        Task Name: ${result.name}<br>
        ${result.isDone? "</del>":""}
        ${InsertDeleteButton(result.name)}<br>
        Due Date: ${result.dueDate}<br>
        Priority: ${result.priority}<br>
        Consultant: ${result.consultant}<br>
        Done: ${result.isDone}<br>
        Notes: ${result.notes}</p>
        </div>`;
    document.getElementById("sreachbox").focus();

    //console.log("found")
}

/**
 * Searches taskList names, consultants and notes for target
 * returns a list of unique finds
 * @param {string} target 
 * @returns Task[]
 */
function SequSearchByName(target){
    let results = [];
    // search names
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].name.includes(target)){
            AddUnique(taskList[i], results);
            continue;
        }
        if (taskList[i].consultant.includes(target)){
            AddUnique(taskList[i], results);
            continue;
        }
        if (taskList[i].notes.includes(target)){
            AddUnique(taskList[i], results);
            continue;
        }
    }
    if (results.length == 0){
        return null;
    }
    return results;
}


/**
 * Displays the results found by the sequential search
 * Each result displayed in it's own panal (div with classname)
 */
function DisplaySequSearchResults(){
    lastSearchType = "sequential"
    let target = document.getElementById("searchbox").value;
    let textDisplay = "";
    let results = SequSearchByName(target);
    if (results == null) {
        textDisplay = `<div class="searchResult">No results found for ${target}</div>`;
    } else {
        textDisplay += `<div class="searchResult"><p>Found: ${results.length}</p></div>`
        for (let i = 0; i < results.length; i++){
            textDisplay += `<div class="searchResult">
            <p>Result ${i + 1}<br>
            ${results[i].isDone? "<del>":""}
            Name: ${results[i].name}
            ${results[i].isDone? "</del>":""}
            ${InsertDeleteButton(results[i].name)}<br>
            Due Date: ${results[i].dueDate}<br>
            Priority: ${results[i].priority}<br>
            Consultant: ${results[i].consultant}<br>
            Done: ${results[i].isDone}<br>
            Notes: ${results[i].notes}</p>
            </div>`;
        }
    }
    document.getElementById("searchResult").innerHTML = textDisplay;
    document.getElementById("sreachbox").focus();

}


/**
 * Pushes element on array provided the element does not already exist in the array
 * @param {element} element 
 * @param {array} array 
 * @returns void
 */
function AddUnique(element, array){
    if (!array.includes(element)){
        array.push(element);
    }
}

/**
 * Clears search results and search box
 */
function ClearResults(){
    document.getElementById("searchResult").innerHTML = "";
    document.getElementById("searchbox").value = "";
}


function InsertDeleteButton(taskID){
    return `<button onclick="DeleteTask('${taskID}')">Delete</button>`;
}

let lastSearchType = "";
function DeleteTask(taskID){
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].name === taskID){
            taskList.splice(i, 1);
            break;
        }
    }
    LoadTasks();
    if (lastSearchType == "binary"){
        DisplayBinSearchResult();
    }
    else if (lastSearchType == "sequential"){
        DisplaySequSearchResults();
    }
    else {
        console.log("How did you get here? This branch should be unreachable");
    }
}
