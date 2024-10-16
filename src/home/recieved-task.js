import { taskData, ctgryData } from "../data.js";
import { scroll } from "../utils/shortcut.js";
import { popup } from "../utils/popup.js";
import { ripple } from "../ripple-effect.js";
import { tasks } from "./tasks.js";
import { dateTime } from "../utils/dateTime.js";
import { home } from "./home.js";

export const recievedTask = {
  task: {},
  userName: '',

  init() {
    const el = document.querySelector('.recieved-task');
    this.el = el;
    this.bg = document.querySelector('#recievedTask-bg');
    this.declineBtn = el.querySelector('#decline-btn');
    this.addBtn = el.querySelector('#add-btn');
    this.userNameEl = el.querySelector('.user-nm span');
    this.body = el.querySelector('.recieved-body');

    //Add ripple effect
    [this.declineBtn, this.addBtn].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e);
      });
    });

    //Handle click events
    [this.bg, this.declineBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        this.close();
      });
    });

    this.addBtn.addEventListener('click', () => {
      this.addTask();
    });
  },

  open(taskData, userName) {
    document.querySelector('title').innerText = 'Todo App - Recieved Task';
    this.renderData(taskData, userName);

    this.el.classList.add('active');
    this.bg.style.display = 'block';
    scroll.disable();
  },

  close() {
    this.bg.style.removeProperty('display');
    this.el.classList.remove('active');
    this.body.querySelector('.task').remove();
    scroll.enable();

    document.querySelector('title').innerText = 'Todo App';
    history.replaceState(null, '',  '/');
  },

  renderData(taskData, userName) {
    this.userNameEl.innerHTML = userName;

    //Create a task to show as a sample
    const {createDate, deadline, sharedBy} = taskData;
    const task = tasks.create(taskData);

    task.querySelector('.menu').remove();
    task.querySelector('.create-time').innerHTML = 
      dateTime.formateDateTime(new Date(createDate)).date;
    
    if (deadline) {
      task.querySelector('.deadline .date').innerHTML = 
      `${dateTime.formateDateTime(new Date(deadline)).date} • ${dateTime.formateDateTime(new Date(deadline)).time}`;
    }
    if (sharedBy) task.querySelector('.shared').remove();
 
    this.body.appendChild(task);
  },

  validateData() {
    //Get data from URL
    const urlParams = new URLSearchParams(window.location.search);

    //Validate data
    const taskParam = urlParams.get('task');
    const userNameParam = urlParams.get('user');
    let decodedTask, taskObj;

    if (!taskParam || !userNameParam) {
      history.replaceState(null, '',  '/');
      
      popup.error("The shared link isn't valid.");
      return;
    }

    try {
      decodedTask = decodeURIComponent(taskParam);
      taskObj = JSON.parse(decodedTask);
    } catch (err) {
      history.replaceState(null, '',  '/');

      popup.error("The shared link isn't valid.");
      return;
    }

    if (!validateJsonStructure(taskObj)) {
      history.replaceState(null, '',  '/');

      popup.error("The shared task structure does not match the expected format.");
      return;
    }

    this.task = taskObj;
    this.userName = userNameParam;
    this.open(taskObj, userNameParam);

    function validateJsonStructure(task) {
      const expectedStructure = {
          id: 'string',
          done: 'boolean',
          pinned: 'boolean',
          name: 'string',
          emoji: 'string',
          color: 'string',
          description: 'string',
          createDate: 'string',
          deadline: 'string',
          category: 'object'
        };
      
      let result = true;

      for (const key in expectedStructure) {
        if (!(key in task) 
          || typeof(task[key]) !== expectedStructure[key]) {
            result = false;
            break;
        }
      };

      return result;
    }
  },

  addTask() {
    this.task.category = this.task.category.map(ctgry => {
      return (ctgryData.matchId(ctgry) || ctgryData.create(ctgry));
    });
    taskData.add({...this.task, sharedBy: this.userName});

    this.close();
    home.render();

    const msg = `Added shared task - ${this.task.name}`;
    popup.success(msg);
  }
};