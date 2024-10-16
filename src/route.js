import { home } from "./home/home.js"
import { addTask } from "./add-task/add-task.js"
import { categories } from "./categories/categories.js"
import { task} from "./task/task.js"
import { transfer} from "./transfer/transfer.js"
import { profile} from "./profile/profile.js"
import { header } from "./header.js";
import { navbar } from "./navbar.js";
import { scroll } from "./utils/shortcut.js"
import { popup } from "./utils/popup.js"

const loading = document.querySelector('.loading');
const root = document.querySelector('#root');

export const routes = {
  '/': {
    html: home.template,
    css: './style/home/home.css',
    initJs: home.init,
    title: 'Todo App',
  },

  '/add-task': {
    html: addTask.template,
    css: './style/add-task/add-task.css',
    initJs: addTask.init,
    heading: 'Add New Task',
    title: 'Todo App  - Add Task'
  },

  '/categories': {
    html: categories.template,
    css: 'style/categories/categories.css',
    initJs: categories.init,
    heading: 'Categories',
    title: 'Todo App - Categories',
  },

  '/task': {
    html: task.template,
    css: 'style/task/task.css',
    initJs: task.init,
    heading: 'Task Details',
    title: 'Todo App - Task',
  },

  '/transfer': {
    html: transfer.template,
    css: 'style/transfer/transfer.css',
    initJs: transfer.init,
    heading: 'Transfer Tasks',
    title: 'Todo App - Transfer Tasks',
  },

  '/profile': {
    html: profile.template,
    css: 'style/profile/profile.css',
    initJs: profile.init,
    heading: 'User Profile',
    title: 'Todo App - User Profile',
  },

  lastPathname: '/',
}

export function navigateTo(pathname) {
  if (!routes[pathname]) pathname = '/';

  if (pathname !== location.pathname  && location.pathname !== '/share') {
    routes.lastPathname = location.pathname;
    history.pushState(null, null,  pathname);
  }

  const route = routes[pathname];

  handleRouteCng(pathname, route.title, route.heading);
  loadContent(route);
}

async function loadContent(route) {
  root.style.visibility = 'hidden';
  loading.style.display = 'flex';
  root.style.opacity = 0;

  try {
    await loadCSS(route.css);
    root.innerHTML = route.html;
    loading.style.display = 'none';
    root.style.visibility = 'visible';
    root.style.opacity = 1;
    route.initJs();  
  } catch (error) {
    console.error('Error during initialization:', error);
    popup.error('Error during loading content.');
  }
}

function loadCSS(url) {
  return new Promise((resolve, reject) => {
      const oldLink = document.querySelector('head link#style');
      if (oldLink) {
        oldLink.parentNode.removeChild(oldLink);
      }
      
      const link = document.createElement('link');
      link.id = 'style';
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
      document.head.appendChild(link);
  });
}

function handleRouteCng(pathname, title, heading) {
  const titleEl = document.querySelector('title');

  if (pathname !== '/' && pathname !== '/index.html') {
    titleEl.innerText = title;
    header.show();
    header.cngHeading(heading);
    navbar.showNotDoneTask();
    home.header.clearInterval();
  } else {
    titleEl.innerText = title;
    header.hide();
    navbar.hideNotDoneTask();
  }

  navbar.selectPage(pathname);
  scroll.enable();
}