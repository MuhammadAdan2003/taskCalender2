// console.log("Adan khan");



/*
 * $targetEl (required)
 * options (optional)
 * instanceOptions (optional)
 */
// Drawer setup
const $drawerEl = document.getElementById('drawer-js-example');

const drawerOptions = {
    placement: 'right',
    backdrop: true, // or false based on your need
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
    onHide: () => {
        console.log('drawer is hidden');
    },
    onShow: () => {
        console.log('drawer is shown');
    },
    onToggle: () => {
        console.log('drawer has been toggled');
    },
};

const drawerInstanceOptions = {
    id: 'drawer-js-example',
    override: true
};

// Assuming you have a Drawer constructor or class
const drawer = new Drawer($drawerEl, drawerOptions, drawerInstanceOptions);

// Modal setup
const $modalEl = document.getElementById('modalEl');

const modalOptions = {
    placement: 'bottom-right',
    backdrop: true, // boolean true or false for showing backdrop
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    }
};

// Assuming you have a Modal constructor or class
const modal = new Modal($modalEl, modalOptions);

// Initialize modal behavior (optional if using dynamic backdrop)
// modal.show(); // or modal.toggle();



var date = new Date()

function renderCalender() {
    // document.querySelector("#TodayDate").innerHTML = date.toDateString()

    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    var CurrMonths = date.getMonth()
    var CurrYear = date.getFullYear()
    date.setDate(1)
    var endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    var lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    var today = new Date()
    //  console.log(today.getDate());
    //  console.log(today.getMonth());

    document.querySelector("#CurrMonth").innerHTML = `${monthsArray[CurrMonths]} ${CurrYear}`
    var days = ""

    for (let x = date.getDay(); x > 0; x--) {

        days += ` <div  class="text-gray-400 border border-gray-200 p-2 flex items-start justify-center bg-gray-300 cursor-pointer">${lastDay - x + 1}</div>`

    }



    for (let i = 1; i <= endMonth; i++) {

        let tasksForDate = [];
        let data = JSON.parse(localStorage.getItem('task'));
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(i).padStart(2, '0');
        let dayString = `${year}-${month}-${day}`;



        tasksForDate = data.filter(task => task.date === dayString);

        let taskSpans = tasksForDate.map(task =>
            `<span id="${task.id}" onclick="getSpanValue(this); ShowModal(this);" data-task='${JSON.stringify(task)}' 
              
             class="text-sm z-30 ${i == today.getDate() && date.getMonth() == today.getMonth() ? 'bg-gray-300 text-black hover:bg-gray-600' : task.Status == "Completed" ? 'bg-[#0b8043] hover:bg-green-900 text-white' : 'bg-purple-800 text-white hover:bg-purple-950'} w-full 
             bottom-0 left-0 appTask  cursor-pointer spans border border-gray-400 font-semibold"> 
             ${task.task}
             </span>`
        ).join('');


        if (i == today.getDate() && date.getMonth() == today.getMonth()) {
            days += ` 
                <div class="border relative flex flex-col justify-center items-start bg-white">
                    <div 
                         onclick="LogDays('${dayString}'); drawer.show()" 
                         class="text-sm w-[100%] h-[100%] p-2 bg-purple-800 text-white flex font-semibold justify-center items-start cursor-pointer">
                         ${i}
                    </div>
                    <div class="flex flex-col w-[100%]">${taskSpans}</div>
                </div>`;
        } else {

            days += ` 
                <div class="border relative h-[100px] overflow-auto flex flex-col justify-center items-start bg-gray-300">
                    <div onclick="LogDays('${dayString}'); drawer.show()"
                         class="text-sm w-[100%] h-[100%] p-2 bg-white flex font-semibold justify-center items-start cursor-pointer">
                         ${i}
                    </div>
                    <div class="flex flex-col w-[100%]">${taskSpans}</div>
                </div>`;
        }
    }

    let nextMonthStartDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay();
    let nextMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= (7 - nextMonthStartDay) % 7; i++) {
        days += ` <div class="text-gray-400 border border-gray-200 p-2 flex items-center justify-center bg-gray-300 cursor-pointer">${i}</div>`;
    }


    document.querySelector("#AppendDays").innerHTML = days;
}


if (!localStorage.getItem("task")) {
    localStorage.setItem('task', JSON.stringify([]))
}

renderCalender()

function moveCalender(toggle) {
    if (toggle == 'prev') {
        date.setMonth(date.getMonth() - 1)
    }
    else if (toggle == 'next') {
        date.setMonth(date.getMonth() + 1)
    }

    renderCalender()

}

function LogDays(dayString) {
    var setDate = document.querySelector("#date")
    setDate.value = dayString

}


function logDAta() {
    var id = Math.floor(10000 + Math.random() * 90000);
    var task = document.querySelector("#task").value
    var date = document.querySelector("#date").value
    var text = document.querySelector("#message").value
    var addTaskDate = new Date()
    var taskDate = new Date(date);

    addTaskDate.setHours(0, 0, 0, 0)
    // console.log(date2);

    if (task == "" || date == "") {
        alert("please insert a task")
        return

    }

    else if (taskDate < addTaskDate) {
        alert("you cannot choose privious date to add a new task")
        return
    }

    const taskObj = {
        task: task,
        date: date,
        text: text,
        id: id,
        Status: "Incomplete"
    }
    console.log(taskObj);

    var val = JSON.parse(localStorage.getItem('task'))

    val.push(taskObj)

    localStorage.setItem('task', JSON.stringify(val))

}

function renderTable() {

    let data = JSON.parse(localStorage.getItem('task'))
    let output = ""

    data.forEach((elem, index) => {

        output +=
            `<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            
            <td class="px-6 py-4 text-center">
              ${elem.task}  
    </td>
            <td class="px-6 py-4 text-center">          
              ${elem.date}
            </td>
              <td class="px-6 py-4 text-center">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>                                 
                <td class="px-6 py-4 text-center ">
              <button onclick="deleteTask(${index})" class="bg-red-500 delBtn text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
                Delete
            </button>
          </td>
          </tr>`
        renderCalender()
    });

    document.querySelector("#tBody").innerHTML = output
}

renderTable()

function deleteTask(index) {
    let data = JSON.parse(localStorage.getItem('task')) || []

    data.splice(index, 1)
    localStorage.setItem('task', JSON.stringify(data))
    renderTable()
    renderCalender()

}

document.querySelector("#submit-btn").addEventListener('click', () => {
    renderTable();
    renderCalender()
    initializeDrawer();
})

renderCalender()

function ShowModal(element) {

    let task = JSON.parse(element.dataset.task);
    let name = task.task
    let date = task.date
    let text = task.text

    var appTask = document.querySelector("#showTask")
    var appDate = document.querySelector("#showDate")
    var appDescription = document.querySelector("#ShowMessage")

    appTask.value = name
    appDate.value = date
    appDescription.value = text

    console.log(task);
    // const modal = document.getElementById('crud-modal');
    // modal.classList.remove('hidden');
    modal.show()
}

let spanText;
let taskData;
let taskObject;
let spanTextHTML;


function getSpanValue(spanElement) {
    spanTextHTML = spanElement
    spanText = spanElement.innerText;
    console.log("Span Text:", spanText);
    taskData = spanElement.getAttribute("data-task");
    taskObject = JSON.parse(taskData);
}

document.querySelector("#compBTN").addEventListener('click', () => {
    if (taskObject.Status === "Incomplete") {

        taskObject = {
            ...taskObject,
            Status: "Completed"

        };

    }
    let tasks = JSON.parse(localStorage.getItem('task')) || []; // default to an empty array if nothing is in localStorage

    const taskIndex = tasks.findIndex(t => t.id === taskObject.id); // Assuming `id` is the unique identifier for each task
    if (taskIndex !== -1) {
        tasks[taskIndex] = taskObject;
    }

    localStorage.setItem('task', JSON.stringify(tasks));

    renderCalender()
    renderTable()
});

document.querySelector("#DelBTN").addEventListener('click', () => {


    let data = JSON.parse(localStorage.getItem('task'));
    const taskIndex = data.findIndex(t => t.date === taskObject.date && t.task === taskObject.task); // Find task index
    if (taskIndex !== -1) {
        data.splice(taskIndex, 1);
        localStorage.setItem('task', JSON.stringify(data));

        spanTextHTML.remove();
        renderCalender()
        renderTable()
        console.log(spanTextHTML);
    }

});

renderTable()
renderCalender()   
