import { taskData, ctgryData } from "../data.js";
import { scroll } from "../utils/shortcut.js";
import { oldCategories } from "./old-categories.js";
import { popup } from "../utils/popup.js";

export const dltCnfrm = {
  ctgryId: undefined,

  init() {
    const el = document.querySelector('.dlt-ctgry');
    this.el = el;
    this.cnclBtn = el.querySelector('#cncl-btn');
    this.dltBtn = el.querySelector('#dlt-btn');
    this.nm = el.querySelector('h3 b');
    this.bg = document.querySelector('#dltCtgry-bg');

    this.bg.addEventListener('click', () => {
      this.close();
    });

    this.cnclBtn.addEventListener('click', () => {
      this.close();
    });

    this.dltBtn.addEventListener('click', () => {
      this.close();      
      this.dltCtgry();
    });
  },

  open(ctgryId) {
    this.ctgryId = ctgryId;
    this.nm.innerHTML = ctgryData.getCtgry(ctgryId).name;
    this.el.classList.add('active');
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    scroll.disable();
  },

  close() {
    this.bg.style.removeProperty('bottom');
    this.bg.style.removeProperty('opacity');
    this.el.classList.remove('active');
    scroll.enable();
  },

  dltCtgry() {
    const nm = ctgryData.getCtgry(this.ctgryId).name;
    taskData.removeCtgryFromTasks(this.ctgryId);
    ctgryData.delete(this.ctgryId);
    oldCategories.render();

    const msg = `Deleted category - <b>${nm}</b>`;
    popup.success(msg);
  }
}