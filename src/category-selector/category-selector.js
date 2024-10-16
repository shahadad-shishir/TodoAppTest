import { ctgryData } from '../data.js';
import { string } from '../utils/string.js';
import { scroll } from '../utils/shortcut.js';
import { ripple } from '../ripple-effect.js';

export class CategorySelector {
  constructor(elSelector, handleSelectCtgry) {
    if(handleSelectCtgry) {
      this.handleSelectCtgry = handleSelectCtgry;
    }
    this.init(elSelector);
  }

  init(elSelector) {
    this.el = document.querySelector(elSelector);
    const el = this.el;
    this.selected = el.querySelector('.selected');
    this.select = el.querySelector('.select');
    this.arrowIcon = el.querySelector(".arrow-icon")
    this.selectP = el.querySelector('.select p');
    this.selectUl = el.querySelector('.select ul');
    this.selectedUl = el.querySelector('.selected ul');
    this.bg = document.querySelector('#ctgry-selector-bg');

    this.selected.addEventListener('click', ()=> {   
      if (this.select.classList.contains('visible')) {
        this.close();
      } else {
        this.open();      
      }
    });

    this.bg.addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    this.arrowIcon.classList.add('rotate');
    this.select.classList.add('visible');
    this.bg.style.display = 'block';
  }

  close() {
    this.arrowIcon.classList.remove('rotate');
    this.select.classList.remove('visible');
    this.bg.style.display = 'none';
  }

  render(preSelected) {
    this.selectUl.innerHTML = '';
    this.selectedUl.innerHTML = '';

    ctgryData.items.forEach(category => {
      const {id, name, emoji, color} = category;
      const li = document.createElement('li');
      li.dataset.selected = 'false';
      li.style.background = color;
      li.innerHTML = 
      `
        <i class="fa-regular fa-circle-dot"></i>
        <span class="select-emoji">${emoji}</span>
        <span>${name}</span>
      `
      this.selectUl.appendChild(li);

      li.addEventListener('click', e => {
        ripple.add(li, e);

        if (li.dataset.selected !== 'true') {
          this.selectItem(li, id);
        } else {
          this.unselectItem(li, id);
        }

        if (this.handleSelectCtgry) {
          this.handleSelectCtgry();
        }
      });

      //When task has already selected-category.
      if (preSelected) {
        preSelected.forEach(ctgryId => {
        if (ctgryId == id) { 
          this.selectItem(li, id);
        }
      })
      }
    });

    if (preSelected) {
      this.updateItemState();
    }
  }

  getTotalSelected() {
    return this.selectedUl.querySelectorAll('li').length;
  }

  selectItem(li, id) {
    if (this.getTotalSelected() == 3) {
      return;
    }  

    li.dataset.selected = 'true';
    this.selectedUl.appendChild(this.createSelectedItem(id));
    this.updateText();
    this.updateItemState();
  }

  createSelectedItem(id) {
    const {name, color, emoji} = ctgryData.getCtgry(id);
    const li = document.createElement('li');
    li.style.backgroundColor = color;
    li.dataset.id = id;
    li.innerHTML = 
    `
      <span class="selected-emoji">${emoji}</span>
      <span>${name}</span>
    `;
    return li;
  }

  unselectItem(li, id) {
    li.dataset.selected = 'false';
    this.selectedUl.querySelector(`li[data-id="${id}"]`).remove();
    this.updateText();
    this.updateItemState();
  }

  updateItemState() {
    this.selectUl.querySelectorAll("li").forEach(item => {
      if (item.dataset.selected === 'false' && 
          this.getTotalSelected() === 3) { 
        //Disable items 
        item.style.opacity = '0.6';
        item.style.cursor = 'no-drop';
        item.classList.add('disable');
      } else {
        //Enable items 
        item.style.opacity = '1';
        item.style.cursor = 'pointer';
        item.classList.remove('disable');
      }
    });
  }

  updateText() {
    const text = [];

    for (let li of this.selectedUl.children) {
      text.push(li.children[1].innerText);
    }

    if (text.length === 0) {
      this.clearText();
    } else {
      this.selectP.innerText = `Selected ${string.combineStrings(text)}`;
    }
  }

  clearText() {
    this.selectP.innerText = '';
  }

  getAllSelected() {
    const ids = [];
    this.selectedUl.querySelectorAll("li").forEach(item => {
      ids.push(String(item.dataset.id));
    });
  
    return ids;
  }
}

export class CtgrySelectorWithTglScroll extends CategorySelector {
  constructor(elSelector, handleSelectCtgry) {
    super(elSelector, handleSelectCtgry);
  }

  open() {
    super.open();
    scroll.disable();
  }

  close() {
    super.close();
    scroll.enable();
  }
} 