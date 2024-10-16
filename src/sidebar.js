import { taskData, userData } from "./data.js";
import { scroll } from "./utils/shortcut.js";
import { navigateTo } from "./route.js";
import { logout } from "./logout.js";
import { getProfilePic, getUserName } from "./profile/profile.js";
import { ripple } from "./ripple-effect.js";
import { popup } from "./utils/popup.js";

 export const sidebar = {
  init() {
    const el = document.querySelector('#sidebar');
    this.el = el;
    this.bg = document.querySelector('#sidebar-bg');
    this.sidebarHeader = el.querySelector('.sidebar-header');
    this.tasks = el.querySelector('.sidebar-tasks');
    this.taskCount = el.querySelector('.task-count');
    this.countNum = el.querySelector('.task-count-number');
    this.tooltipNum = el.querySelector('.sidebar-tooltip span');
    this.add = el.querySelector('.sidebar-add');
    this.purge = el.querySelector('.sidebar-purge');
    this.ctgry = el.querySelector('.sidebar-ctgry');
    this.transfer = el.querySelector('.sidebar-transfer');
    this.github = el.querySelector('.sidebar-github');
    this.issue = el.querySelector('.sidebar-issue');
    this.install = el.querySelector('.sidebar-install');
    this.logout = el.querySelector('.sidebar-logout');
    this.settings = el.querySelector('.sidebar-settings');
    this.user = el.querySelector('.sidebar-user');
    this.userNm = el.querySelector('.user-name');

    this.renderUserContent();

    logout.init();
    this.logout.addEventListener('click', async () => {
      this.close();
      
      const timeoutId = setTimeout(()=> {
        logout.open();
        clearTimeout(timeoutId);
      }, 300)
    });

    
    //Add ripple effect
    [this.tasks, this.add, this.purge, this.ctgry, this.transfer, this.github, this.issue, this.install, this.logout, this.settings, this.user].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e);
      });
    });

    //Handle click events
    this.bg.addEventListener('click', () => {
      this.close();
    });

    this.sidebarHeader.addEventListener('click', () => {
      this.close();
    });

    this.tasks.addEventListener('click', () => {
      if (location.pathname !== '/') {
        navigateTo('/');
      }
      this.close();
    });

    this.add.addEventListener('click', () => {
      if (location.pathname !== '/add-task') {
        navigateTo('/add-task');
      }
      this.close();
    });

    this.purge.addEventListener('click', () => {
      // if (location.pathname !== '/purge') {
      //   navigateTo('/purge');
      // }
      popup.info('The Purge Task feature is under development.');
      this.close();
    });

    this.ctgry.addEventListener('click', () => {
      if (location.pathname !== '/categories') {
        navigateTo('/categories');
      }
      this.close();
    });

    this.transfer.addEventListener('click', () => {
      if (location.pathname !== '/transfer') {
        navigateTo('/transfer');
      }
      this.close();
    });

    this.github.addEventListener('click', () => {
      window.open('https://github.com/shahadad-shishir/TodoApp');
    });

    this.issue.addEventListener('click', () => {
      window.open('https://github.com/shahadad-shishir/TodoApp/issues/new')
    });

    this.install.addEventListener('click', () => {   
      popup.info('Install App feature is coming soon.');
      this.close();
    });

    this.settings.addEventListener('click', () => {   
      popup.info('Settings are coming soon.');
      this.close();
    });

    this.user.addEventListener('click', () => {
      if (location.pathname !== '/profile') {
        navigateTo('/profile');
      }
      this.close();
    });

    //update user name
    let name = userData.name;
    if (name === '') name = 'User';
    this.userNm.innerHTML = name;
  },

  open() {
    this.el.classList.add('active');
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    this.showNotDoneTask();
    scroll.disable();
  },

  close() {
    this.el.classList.remove('active');
    this.bg.style.opacity = 0;

    const timeoutId = setTimeout(()=> {
      this.bg.style.removeProperty('bottom');
      scroll.enable();
      clearTimeout(timeoutId);
    }, 300)
  },

  showNotDoneTask: function() {
    const num = taskData.countNotDoneTask();
    if (num > 0) {
      this.taskCount.style.display = 'flex';
      this.countNum.innerHTML = num;
      this.tooltipNum.innerHTML = num;
    } else {
      this.taskCount.style.display = 'none';
    }
  },

  renderUserContent() {
    this.el.querySelector('.js-profile-pic').innerHTML = getProfilePic();

    this.el.querySelector('.js-user-name').innerHTML = getUserName();
  }
}
