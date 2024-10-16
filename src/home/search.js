import { taskData } from "../data.js";
import { mngAnim } from "../utils/shortcut.js";
import { ctgryFilter } from "./category-filter.js";
import { tasks } from "./tasks.js";

export const search = {
  init() {
    this.searchInput = document.querySelector('#search-input');
    this.searchBtn = document.querySelector('.search-bar button');
    this.searchResult = document.querySelector('.search-result');
    this.srcRsltCount = document.querySelector('.search-result .count');
    this.srcRsltEmpty = document.querySelector('.search-result .empty');

    this.searchInput.addEventListener('keyup', () => {
      const searchTxt = this.searchInput.value;
      this.searchBtn.style.display = 'flex';
      this.mngHighliting(searchTxt);
      ctgryFilter.handle();
    });

    this.searchBtn.addEventListener('click', () => {
      tasks.render();
      ctgryFilter.handle();
      this.clear();
    });
  },

  mngHighliting(searchTxt) {
    let foundTasks = 0;

    if (searchTxt === '') {
      this.searchResult.style.display = 'none';
      this.searchBtn.style.display = 'none';
      tasks.render();
      return;
    }

    taskData.items.forEach(task => {
      const id = task.id;
      const name = task.name;
      const des = task.description;

      const highlightedNm = this.highlightText(name, searchTxt);
      const highlightedDes = this.highlightText(des, searchTxt);

      const taskEl = document.querySelector(`.task[data-id='${id}']`);
      const nameEl = document.querySelector(`.task[data-id='${id}'] .top-left h3`);
      const desEl = document.querySelector(`.task[data-id='${id}'] .bottom-area p`);

      if (!highlightedNm && !highlightedDes) {
        taskEl.style.display = 'none';
      } else {
        if (taskEl.style.display === 'none') {
          taskEl.style.display = 'flex';
          mngAnim(taskEl, 'opacityAnim', 1);
        }
      }

      if (highlightedNm) {
        nameEl.innerHTML = highlightedNm;
      } else {
        nameEl.innerHTML = name;
      }

      if (highlightedDes) {
        if (desEl) {
          desEl.innerHTML = highlightedDes;
        }
      } else {
        if (desEl) {
          desEl.innerHTML = des;
        }
      }

      if (highlightedNm || highlightedDes) {
        foundTasks += 1;
      }
    });

    if (foundTasks > 0) {
      this.searchResult.style.display = 'flex';
      this.srcRsltCount.style.display = 'flex';
      this.srcRsltEmpty.style.display = 'none';
      this.searchBtn.style.color = 'white';
    } else if (foundTasks == 0) {
      this.srcRsltCount.style.display = 'none';
      this.searchResult.style.display = 'flex';
      this.srcRsltEmpty.style.display = 'flex';
      mngAnim(this.srcRsltEmpty, 'opacityAnim', 1);
      this.searchBtn.style.color = 'red';
    }

    if (foundTasks == 1) {
      this.srcRsltCount.innerText = 'Found 1 task'
    } else {
      this.srcRsltCount.innerText = `Found ${foundTasks} tasks`;
    }
  },

  highlightText(originalTxt, searchTxt) {
    const regex = new RegExp(searchTxt, 'gi');
    const highlightedTxt = originalTxt.replace(regex, match => {
      return `<span class ="highlighted-text">${match}</span>`;
    });
  
    if (highlightedTxt === originalTxt) {
      return false;
    }
  
    return highlightedTxt;
  },

  clear() {
    if (this.searchResult.style.display === 'flex') {
      this.searchInput.value = '';
      this.searchResult.style.display = 'none';
      this.searchBtn.style.display = 'none';
    }
  }
};