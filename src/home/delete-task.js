import { taskData, ctgryData } from "../data.js";
import { scroll } from "../utils/shortcut.js";
import { mngAnim } from "../utils/shortcut.js";
import { string } from "../utils/string.js";
import { menubar } from "./menubar.js";
import { ripple } from "../ripple-effect.js";

export const dltCnfrm = {
  taskId: undefined,

  init() {
    const el = document.querySelector('.dlt-task');
    this.el = el;
    this.cnclBtn = el.querySelector('#cncl-btn');
    this.dltBtn = el.querySelector('#dlt-btn');
    this.nmEl = el.querySelector('.nm');
    this.desEl = el.querySelector('.des');
    this.ctgryEl = el.querySelector('.ctgry');
    this.bg = document.querySelector('#dltTask-bg');

    //Add ripple effect
    [this.dltBtn, this.cnclBtn].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e);
      });
    });

    //Handle click events
    this.bg.addEventListener('click', () => {
      this.close();
    });

    this.cnclBtn.addEventListener('click', () => {
      this.close();
    });

    this.dltBtn.addEventListener('click', () => {
      this.close();      
      menubar.dltTask();
    });
  },

  open(taskId) {
    this.taskId = taskId;
    this.updateData(taskId)
    this.el.style.display = 'block';
    mngAnim(this.el, 'opacityAnim', 0.3);
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    scroll.disable();
  },

  close() {
    this.bg.style.removeProperty('bottom');
    this.bg.style.removeProperty('opacity');
    this.el.style.display = 'none';
    scroll.enable();
  },

  updateData(taskId) {
    const {name, description, category} = taskData.getTask(taskId);

    this.nmEl.innerHTML = '';
    this.desEl.innerHTML = '';
    this.ctgryEl.innerHTML = '';

    if (name) {
      this.nmEl.innerHTML = `<b>Task Name: </b><span>${name}</span>`;
    }

    if (description !== '') {
      this.desEl.innerHTML = `<b>Task Description: </b><span>${description}</span>`;
    }

    if (category.length > 0) {
      const array = [];
      category.forEach(id => {
        array.push(ctgryData.getCtgry(id).name);
      });
      const ctgry = string.combineStrings(array);
      this.ctgryEl.innerHTML = `<b>Categories: </b><span>${ctgry}</span>`;
    }
  }
}