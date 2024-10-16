import { taskData, ctgryData } from "../data.js";
import { template } from "./template.js";
import { dateTime } from "../utils/dateTime.js";

function initTask() {
  const heading = document.querySelector('.heading span');
  const emojiEl = document.querySelector('#emoji td');
  const idEl = document.querySelector('#id td');
  const descriptionEl = document.querySelector('#description td');
  const colorEl = document.querySelector('#color td');
  const createdEl = document.querySelector('#created td');
  const deadlineEl = document.querySelector('#deadline td');
  const doneEl = document.querySelector('#done td');
  const pinnedEl = document.querySelector('#pinned td');
  const categoryEl = document.querySelector('#category ul');

  renderTaskData();

  function renderTaskData() {
  const taskId = new URLSearchParams(location.search).get('id');
  let {name, emoji, id, description, color, createDate, deadline, done, pinned, category} = taskData.getTask(taskId);

  heading.innerText = name;

  if(emoji) {
    emojiEl.innerText = emoji;
  }

  idEl.innerText = id;
  descriptionEl.innerText = description;

  colorEl.innerText = color;
  const clrSpan = document.createElement('span');
  clrSpan.style.backgroundColor = color;
  colorEl.prepend(clrSpan);

  createdEl.innerText = formateDate(createDate);

  if (deadline) {
    deadlineEl.innerText = formateDate(deadline);
  }

  const createIcon = type => {
    const i = document.createElement('i');
    if (type) {
      i.classList.add('fa-solid', 'fa-check');
    } else {
      i.classList.add('fa-solid', 'fa-xmark');
    }

    return i;
  }

  if (done) {
    doneEl.innerText = 'true';
    doneEl.prepend(createIcon(true));
  } else {
    doneEl.innerText = 'false';
    doneEl.prepend(createIcon(false));
  }

  if (pinned) {
    pinnedEl.innerText = 'true';
    pinnedEl.prepend(createIcon(true));
  } else {
    pinnedEl.innerText = 'false';
    pinnedEl.prepend(createIcon(false));
  }

  const addCategory = () => {
    category.forEach(id => {
      const dataObj = ctgryData.getCtgry(id);
      const {name, emoji, color} = dataObj;
      const li = document.createElement('li');
      li.style.backgroundColor = color;
      li.innerText = name;
      const span = document.createElement('span');
      span.classList.add('emoji');
      span.innerText = emoji;
      li.prepend(span); 
      categoryEl.append(li);
    });
  }
  addCategory();
  }

  function formateDate(createDate) {
  //3/13/2024, 11:37:17 AM
  createDate = new Date(createDate);
  const {date, time} = dateTime.formateDateTime(createDate);
  return `${date}, ${time}`;
  }
}

export const task = {
  init: initTask,
  template: template,
};