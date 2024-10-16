import { taskData, ctgryData } from "../data.js";
import { dateTime } from "../utils/dateTime.js";
import { menubar } from "./menubar.js";
import { navbar } from "../navbar.js";
import { ripple } from "../ripple-effect.js";
import { makeEl } from "../utils/shortcut.js";

let taskContainer, emptyTask, progress, searchBar, addBtnIcon, ctgryFilter;

function initTasks() {
  taskContainer = document.querySelector('.tasks-container');
  emptyTask = document.querySelector('.empty-task');
  progress = document.querySelector('.main .progress');
  searchBar = document.querySelector('.main .search-bar');
  addBtnIcon = document.querySelector('.add-btn .icon');
  ctgryFilter = document.querySelector('.main .categories');

  tasks.container = taskContainer;

  renderTasks();
}

function renderTasks() {
  taskContainer.innerHTML = '';

  if (taskData.items.length == 0) {
    mngEmptyTask(true);
    return;
  } else {
    mngEmptyTask(false);
  }

  taskData.items.forEach(task => {
    const {pinned} = task;
    const createdTask = createATask(task);
    
    if (pinned) {
      taskContainer.prepend(createdTask);
    } else {
      taskContainer.appendChild(createdTask);
    }
  });
}

function mngEmptyTask(condition) {
  if (condition) {
    emptyTask.style.display = 'block';
    progress.style.display = 'none';
    searchBar.style.display = 'none';
    ctgryFilter.style.display = 'none';
    addBtnIcon.style.animation = '1.2s ease 0s infinite normal none running addAnim';
    navbar.addAnim();
  } else {
    emptyTask.style.display = 'none';
    progress.style.display = 'flex';
    searchBar.style.display = 'flex';
    ctgryFilter.style.display = 'flex';
    addBtnIcon.style.removeProperty('animation');
    navbar.removeAnim();
  }
}

function createATask(taskData) {
  const {id, name, description, deadline, emoji, color, category, done, pinned, createDate, sharedBy} = taskData;

  const taskDiv = makeEl('div', ['task']);
  taskDiv.dataset.id = id;
  taskDiv.style.backgroundColor = color;
  taskDiv.style.boxShadow = `${color} 0px 0px 128px -20px`;

  taskDiv.innerHTML =
  ` 
    <div class="task-details">
      <div class="pinned">
        <i class="fa-solid fa-thumbtack"></i>
        Pinned
      </div>
      <div class="top-area">
        <div class="top-left">
          <h3>${name}</h3>
        </div>
        <div class="top-right">
          <span class="create-time">${formatCreateTime(new Date(createDate))}</span>
        </div>
      </div>

      <div class="bottom-area">
        <p>${description}</p>
        <div class="deadline">
          <span>
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="m22 5.72-4.6-3.86-1.29 1.53 4.6 3.86zM7.88 3.39 6.6 1.86 2 5.71l1.29 1.53zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9m0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7">
              </path>
            </svg>
          </span>
          <span class="date">${formatDeadline(deadline, done)}</span>
        </div>

        <div class="shared">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M17 7h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c2.76 0 5-2.24 5-5s-2.24-5-5-5m-9 5c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1m2 3H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h3c.55 0 1-.45 1-1s-.45-1-1-1H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3c.55 0 1-.45 1-1s-.45-1-1-1">
            </path>
          </svg>
          <span>Shared by <span> ${sharedBy}</span></span>
        </div>

        <div class="task-categories"></div>     
      </div>
    </div>
    <div class="menu">
      <button>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
    </div>
  `

  if (done) {
    const doneDiv = makeEl('div', ['check-icon']);
    doneDiv.innerHTML = '<i class="fa-solid fa-check"></i>';
    
    taskDiv.prepend(doneDiv);
    taskDiv.classList.add('done');

  } else if (emoji) {
    const emojiDiv = makeEl('div', ['task-emoji']);
    emojiDiv.innerHTML = `<span>${emoji}</span>`

    taskDiv.prepend(emojiDiv);
  }

  if (!pinned) taskDiv.querySelector('.pinned').remove();
  if (!description) taskDiv.querySelector('.bottom-area p').remove();
  if (!deadline) taskDiv.querySelector('.deadline').remove();
  if (!sharedBy) taskDiv.querySelector('.shared').remove();

  if (category.length !== 0) {
    category.forEach(item => {
      if (typeof(item) !== 'object') item = ctgryData.getCtgry(item);
      const {name, emoji, color} = item;

      const itemDiv = makeEl('div', ['item'], name);
      itemDiv.dataset.id = id;
      itemDiv.style.backgroundColor = color;
      itemDiv.innerHTML = 
      `
        <span class="category-emoji">${emoji}</span> ${name}
      `;

      taskDiv.querySelector('.task-categories').append(itemDiv);
    });
  } else {
    taskDiv.querySelector('.task-categories').remove();
  }

  if (!description && !deadline && !sharedBy && category.length == 0) {
    taskDiv.querySelector('.bottom-area').remove();
  }

  const menuBtn =  taskDiv.querySelector('.menu button');
  menuBtn.addEventListener('click', e => {
    ripple.add(menuBtn, e);
    menubar.open(id);
  });

  return taskDiv;
}

function formatDeadline(deadline, done) {
  if(!deadline) return;

  //'3/15/2024 • 11:04:00 AM • tomorrow'
  deadline = new Date(deadline);
  const date = dateTime.formateDateTime(deadline).date;
  const time = dateTime.formateDateTime(deadline).time;

  if (done) {
    return `${date} • ${time}`;
  }

  let day = dateTime.getDay(deadline);
  if (!day) {
    const weekDay = dateTime.getWeekDay(deadline);
    const daysDiffer = dateTime.getDaysDiff(deadline);
    if (daysDiffer > 0) {
      day = `${weekDay} (in ${daysDiffer} days)`;
    } else if (daysDiffer < 0) {
      day = `Not completed on time (${Math.abs(daysDiffer)} days ago)`;
    }
  } else if (day === 'today') {
    const hourDiff = dateTime.getHoursDiff(deadline);
    const hourDiffInt = parseInt(hourDiff);
    const minDiff = dateTime.getMinutesDiff(deadline);
    const minDiffInt = parseInt(minDiff);
    
    if (hourDiff >= 0) {
      if (hourDiff < 1) {
        day = `in ${minDiffInt} minutes`;
      } else if (hourDiff >= 1 && hourDiff < 2) {
        day = `in ${hourDiffInt} hour`;
      } else if (hourDiff >= 2 ) {
        day = `in ${hourDiffInt} hours`;
      }
    } else if (hourDiff < 0) {
      if (hourDiff > -1) {
        day = `Not completed on time (${Math.abs(minDiffInt)} minutes ago)`;
      } else if (hourDiff <= -1 && hourDiff > -2) {
        day = `Not completed on time (${Math.abs(hourDiffInt)} hour ago)`;
      } else if (hourDiff <= -2) {
        day = `Not completed on time (${Math.abs(hourDiffInt)} hours ago)`;
      }
    }
  }  else if (day === 'yesterday') {
    day = 'Not completed on time (yesterday)';
  } else if (day === 'tomorrow') {
    day = 'tomorrow';
  }

  const formatedDate = `${date} • ${time} • ${day}`
  return formatedDate;
};

function formatCreateTime(createDate) {
  //yesterday 11:35 AM
  createDate = new Date(createDate);
  const day = dateTime.getDay(createDate);
  const {date, time} = dateTime.formateDateTime(createDate);
  let formatedDate;

  if (day) {
    formatedDate = `${day} ${time}` 
  } else {
    formatedDate = date;
  }

  return formatedDate;
}

export const tasks = {
  container: taskContainer,
  init: initTasks,
  render: renderTasks,
  create: createATask,
};