import { generateRandomId } from "./utils/number.js";

function getDataFormat() {
  return {
    name: '',
    createdAt: new Date(),
    profilePic: null,
    theme: 0,
    tasks: [],
    categories: [
      { id: '1', name: 'Home', emoji: '🏠️', color: '#b624ff' },
      { id: '2', name: 'Work', emoji: '🏢', color: '#5061ff' },
      { id: '3', name: 'Personal', emoji: '👤', color: '#fb34ff' },
      { id: '4', name: 'Fitness', emoji: '💪', color: '#ffea28' },
      { id: '5', name: 'Education', emoji: '📚️', color: '#ff9518' },
    ]
  };
}

let appData = JSON.parse(localStorage.getItem('todoAppData')) || getDataFormat();

function updateStorage() {
  localStorage.setItem('todoAppData', JSON.stringify(appData));
}

export const taskData = {
  items: appData.tasks,

  loadFromStorage() {
    this.items = appData.tasks;
  },

  add({ emoji, name, description, deadline, category, color, id, done = false, pinned = false, createDate = new Date(), sharedBy }) {

    if (id) {
      this.items.some(task => task.id === id) ? id = this.generateId() : id = id;
    } else {
      id = this.generateId();
    }

    const task = {id, name, description, deadline, emoji, color, category, done, pinned, createDate};
    if (sharedBy) task.sharedBy = sharedBy;
    this.items.push(task);
    updateStorage();
  }, 

  generateId() {
    let id;
    do {
      id = String(generateRandomId());
    } while (this.items.some(task => task.id === id));
    return id;
  },

  delete(taskId) {
    const index = this.getIndex(taskId);
    this.items.splice(index, 1);
    updateStorage();
  },

  dublicate(taskId) {
    const task = this.getTask(taskId);
    this.add({ ...task, id: this.generateId(), createdAt: new Date() });
  },

  update(taskId, updates) {
    const index = this.getIndex(taskId);
    this.items[index] = { ...this.items[index], ...updates };
    updateStorage();
  },

  toggleDone(taskId) {
    const task = this.getTask(taskId);
    task.done = !task.done;
    updateStorage();
  },

  togglePin(taskId) {
    const task = this.getTask(taskId);
    task.pinned = !task.pinned;
    updateStorage();
  },

  removeCtgryFromTasks(ctgryId) {
    this.items.forEach(task => {
      task.category = task.category.filter(id => id !== ctgryId);
    });
    updateStorage();
  },

  getTask(taskId) {
    return this.items.find(task => task.id === taskId);
  },

  getIndex(taskId) {
    return this.items.findIndex(task => task.id === taskId);
  },
  
  countNotDoneTask() {
    return this.items.reduce((count, task) => count + !task.done, 0);
  },

  getCtgryInfo() {
    const allCtgryIds = this.items.flatMap(task => task.category);
    const doneCtgryIds = this.items.filter(task => task.done).flatMap(task => task.category);

    const countOccurrences = (arr) => arr.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    return {all: countOccurrences(allCtgryIds), done: countOccurrences(doneCtgryIds)};
  },
}

export const ctgryData = {
  items: appData.categories,

  loadFromStorage() {
    this.items = appData.categories;
  },

  getCtgry(ctgryId) {
    return this.items.find(ctgry => ctgry.id === ctgryId);
  },

  getIndex(ctgryId) {
    return this.items.findIndex(ctgry => ctgry.id === ctgryId);
  },

  update(ctgryId, updates) {
    const index = this.getIndex(ctgryId);
    this.items[index] = { ...this.items[index], ...updates };
    updateStorage();
  },

  delete(id) {
    const index = this.getIndex(id);
    this.items.splice(index, 1);
    updateStorage();
  },

  create({name, emoji, color}) {
    const id =  String(generateRandomId(8));
    const newCtgry = { id, name, emoji, color };
    this.items.push(newCtgry);
    updateStorage();
    return id;
  },

  matchId({ name, emoji, color }) {
    return this.items.find(ctgry => ctgry.name === name && ctgry.emoji === emoji && ctgry.color === color)?.id;
  }
}

export const userData = {
  loadFromStorage() {
    this.name = appData.name;
    this.createdAt = appData.createdAt;
    this.profilePic = appData.profilePic;
    this.theme = appData.theme;
  },

  cngTheme(themeId) {
    if (themeId !== this.theme) {
      appData.theme = themeId;
      updateStorage();
      this.loadFromStorage();
    }
  },

  cngProfile(profileLink) {
    appData.profilePic = profileLink;
    updateStorage();
    this.loadFromStorage();
  },

  deleteProfile() {
    appData.profilePic = null;
    updateStorage();
    this.loadFromStorage();
  },

  setUserName(name) {
    appData.name = name;
    updateStorage();
    this.loadFromStorage();
  },
}

userData.loadFromStorage();

export function removeAppData() {
  localStorage.removeItem('todoAppData');
  appData = getDataFormat();
  taskData.loadFromStorage();
  ctgryData.loadFromStorage();
  userData.loadFromStorage();
}