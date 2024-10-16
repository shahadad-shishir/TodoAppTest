import { taskData, ctgryData } from "../data.js";
import { dltCnfrm } from "./delete-ctgry.js";
import { editCtgry } from "./edit-ctgry.js";
import { ripple } from "../ripple-effect.js";

export const oldCategories = {
  init() {
    this.el = document.querySelector('.old-categories');

    this.render();
    editCtgry.init();
    dltCnfrm.init();
  },

  render() {
    let html = '';
    ctgryData.items.forEach(ctgry => {
      const {id, name, emoji, color} = ctgry;      
      html +=
        `
        <div class="item" data-id="${id}"  style="background-color: ${color};">
          <div class="item-left">
            <span class="item-emoji">${emoji}
            </span>
            <span class="name">${name}</span>
            <span class="percent">${this.calculatePercent(id)}</span>
          </div>
          <div class="item-right">
            <span data-id="${id}" class="edit"><i class="fa-solid fa-pen"></i></span>
            <span data-id="${id}" class="delete"><i class="fa-solid fa-trash"></i></span>
          </div>
        </div>
      `
    });

    this.el.innerHTML = html;

    document.querySelectorAll('.old-categories .item .edit')
      .forEach(el => {
        const id = el.dataset.id;
        el.addEventListener('click', e => {
          ripple.add(el, e);
          editCtgry.show(id);
        });
      });

    document.querySelectorAll('.old-categories .item .delete')
    .forEach(el => {
      el.addEventListener('click', e => {
        ripple.add(el, e);

        const id = el.dataset.id;
        dltCnfrm.open(id);
      });
    });

    this.el.style.display = 'flex';
  },

  calculatePercent(id) {
    const allCtgryIds = taskData.getCtgryInfo().all;
    const doneCtgryIds = taskData.getCtgryInfo().done;

    if (!allCtgryIds[id]) {
      return '';
    }

    const total = allCtgryIds[id];
    const done = doneCtgryIds[id] || 0;
    const percent = (done / total) * 100;
    return `(${Math.round(percent)}%)`;
  }
};