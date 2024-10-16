import { template } from "./template.js";
import { theme } from "./theme.js";
import { scroll } from "../utils/shortcut.js";
import { userData } from "../data.js";
import { dateTime } from "../utils/dateTime.js";
import { logout } from "../logout.js";
import { popup } from "../utils/popup.js";
import { ripple } from "../ripple-effect.js";

function initProfile() {
  const card = document.querySelector('.card');
  const profileEl = card.querySelector('.profile');
  const register = card.querySelector('.register span');
  const logoutBtn = card.querySelector('.logout');

  theme.init();

  //render name & profile pic
  card.querySelector('.js-profile-pic').innerHTML = getProfilePic();
  card.querySelector('.js-user-name').innerHTML = getUserName();

  //render register date and time
  const createDate = new Date(userData.createdAt);
  const date = dateTime.formateDateTime(createDate).date;

  register.innerHTML = `Registered on ${date}`;

  //Profile picture change 
  const cngProfilePic = {
    oldLink: null,

    init(callback) {
      this.el = document.querySelector('.cng-profile');
      this.bg = document.querySelector('#cngProfile-bg');
      const cnclBtn = this.el.querySelector('#cancel-btn');
      this.saveBtn = this.el.querySelector('#save-btn');
      this.input = this.el.querySelector('input');
      this.deleteBtn = this.el.querySelector('.delete');

      this.handleProfilePicCng = callback;

      this.bg.addEventListener('click', () => {
        this.hide();
      });

      cnclBtn.addEventListener('click', e => {
        ripple.add(cnclBtn, e);
        this.hide();
      });

      this.input.addEventListener('input', () => {
        this.updateSaveBtnState();
      });

      this.saveBtn.addEventListener('click', e => {
        if (this.saveBtn.classList.contains('enable')) {
          ripple.add(this.saveBtn, e);
          this.cngProfile();
          this.hide();
          popup.success('Changed profile picture');
        } else {
          return;
        }
      });

      this.deleteBtn.addEventListener('click', e => {
        ripple.add(this.deleteBtn, e);
        userData.deleteProfile();
        this.input.value = '';
        this.hide();
        this.handleProfilePicCng();
        popup.success('Deleted profile picture');
      });
    },

    show() {
      this.oldLink = userData.profilePic;
      this.updateSaveBtnState();

      this.el.classList.add('visible');

      scroll.disable();
      this.bg.style.bottom = 0;
      this.bg.style.opacity = 1;

      //display previous link
      if (this.oldLink !== null) {
        this.input.value = this.oldLink;
        this.deleteBtn.style.display = 'block';
      } else {
        this.deleteBtn.style.display = 'none';
      }
    },

    hide() {
      this.el.classList.remove('visible');

      this.bg.style.removeProperty('bottom');
      this.bg.style.removeProperty('opacity');
      scroll.enable();
    },

    updateSaveBtnState() {
      const newLink = this.input.value;

      if (newLink !== this.oldLink && newLink !== '') {
        this.saveBtn.classList.add('enable');
      } else {
        this.saveBtn.classList.remove('enable');
      }
    },

    cngProfile() {
      const newLink = this.input.value;
      userData.cngProfile(newLink);
      this.handleProfilePicCng();
    }
  }

  cngProfilePic.init(() => {
    renderProfilePic();
  });

  profileEl.addEventListener('click', () => {
    cngProfilePic.show();
  });

  //User name change
  const cngUserNm = {
    init(handleUserNmCng) {
      this.nmInput = document.querySelector('.card .nm-input input');
      this.saveBtn = document.querySelector('.card .save-btn');
      this.nmCount = document.querySelector('.nm-count');

      this.saveBtn.addEventListener('click', e => {
        if (this.saveBtn.classList.contains('enable')) {
          ripple.add(this.saveBtn, e);
          let name = this.nmInput.value;
          this.nmInput.value = '';
          userData.setUserName(name);      
          this.mngNmCount();
          handleUserNmCng();
          const msg = `Changed user name to <b>${name}</b>`;
          popup.success(msg);
        }
      });

      this.nmInput.addEventListener('input', () => {
        this.mngNmCount();
      });
    },

    mngNmCount() {
      const value = this.nmInput.value;
 
      if (value !== '') {
        this.nmCount.style.display = 'block';
      } else {
        this.nmCount.style.display = 'none';
        this.saveBtn.classList.remove('enable');
        this.nmInput.style.removeProperty('border-color');
        return;
      }
  
      const length = value.length;
      if (length < 15) {
        this.nmCount.style.color = 'var(--text)';
        this.nmInput.style.borderColor = 'var(--secondary)';
        this.nmCount.innerHTML = `${length}/14`;
        this.saveBtn.classList.add('enable');
      } else {
        this.nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
        this.nmInput.style.borderColor = 'rgb(255, 49, 49)';
        this.nmCount.innerHTML = 'Name is too long (maximum 14 characters)';
        this.saveBtn.classList.remove('enable');
      }
    }
  }

  cngUserNm.init(() => {
    renderUserName();

    const profilePic = userData.profilePic;
    if (!profilePic) renderProfilePic();
  });

  //logout
  logoutBtn.addEventListener('click', e => {
    ripple.add(logoutBtn, e);
    logout.open();
  });
}

export function renderProfilePic() {
  const profileContent = document.querySelectorAll('.js-profile-pic');
  const pic = getProfilePic();

  profileContent.forEach(el => {
    el.innerHTML = pic;
  });
}

export function getProfilePic() {
  let content;
  const img = userData.profilePic;
  const letter = userData.name.charAt(0);

  if (img !== null) {
    content = `<img src="${img}">`;
  } else {
    if (userData.name !== '') {
      content = `<span class="letter">${letter.toUpperCase()}</span>`;
    } else {
      content = `<i class="js-user-icon fa-solid fa-user"></i>`;
    }
  }

  return content;
}

export function renderUserName() {
  const name = getUserName();

  document.querySelectorAll('.js-user-name')
  .forEach(el => {
    el.innerHTML = name;
  });
}

export function getUserName() {
  let name = userData.name;
  name = name || 'User';
  return name;
}

export const profile = {
  template: template,
  init: initProfile,
};