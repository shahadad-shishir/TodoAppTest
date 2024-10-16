import { navigateTo, routes } from "./route.js";
import { sidebar } from "./sidebar.js";
import { getProfilePic, getUserName } from "./profile/profile.js";

export const header = {
  init() {
    const el = document.querySelector('#header');
    this.el = el;
    this.backBtn = el.querySelector('.angle');
    this.headerText = el.querySelector('.text');
    this.userIcon = el.querySelector('.user');

    this.renderUserContent();

    this.backBtn.addEventListener('click', () => {
      navigateTo(routes.lastPathname);
    });

    this.userIcon.addEventListener('click', () => {
      sidebar.open();
    });
  },

  cngHeading(heading) {
    this.headerText.innerText = heading;
  },

  show() {
    this.el.style.display = 'flex';
  },

  hide() {
    this.el.style.display = 'none';
  },

  renderUserContent() {
    this.el.querySelector('.js-profile-pic').innerHTML = getProfilePic();

    this.el.querySelector('.js-user-name').innerHTML = getUserName();
  }
};