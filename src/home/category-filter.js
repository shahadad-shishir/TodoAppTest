import { taskData, ctgryData } from "../data.js";

let categories, srcRsltCount;

function initCtgryFilter() {
  categories = document.querySelector('.main .categories');
  srcRsltCount = document.querySelector('.search-result .count');
  handleCategoryFilter();
}

function handleCategoryFilter() {
  let allCategories = [];

  const addCategories = task => {
    const categories = task.category;
    const added = allCategories.concat(categories);
    allCategories = added;
  }

  taskData.items.forEach(task => {
    const taskId = task.id;
    const taskEl = document.querySelector(`.task[data-id='${taskId}']`);
    if (taskEl.style.display !== 'none') {
      addCategories(task);
    }
  });

  const createCategory = id => {
    const category = ctgryData.getCtgry(id);
    const {name, emoji, color} = category;

    const div = document.createElement('div');
    div.dataset.id = id;
    div.style.backgroundColor = color;
    div.innerHTML = 
    `
      <span class="category-emoji">${emoji}</span>
      <span>${name} (<span class="count">1</span>)</span>
      <span class="x-btn"><i class="fa-solid fa-circle-xmark"></i></span>
    `
    return div;
  }

  categories.innerHTML = '';
  const done = [];
  allCategories.forEach(id => {
    if (done.includes(id)) {
      const countEl = document.querySelector(`.categories div[data-id='${id}']  .count`);
      const value = Number(countEl.innerText);
      countEl.innerText = value + 1;
      return;
    }

    done.push(id);
    const category = createCategory(id);
    categories.appendChild(category);
  });

  addEventListener(taskData.items);
}

function addEventListener(taskData) {
  const allCategories = document.querySelectorAll('.categories div');
  for (let category of allCategories) {
    category.addEventListener('click', () => {
      mngClick(category, taskData);
    });
  }
}

function mngClick(category, taskData) {
  const id = category.dataset.id;
  const xBtn = document.querySelector(`.categories div[data-id="${id}"] .x-btn`);

  if (xBtn.style.display === 'block') {
    xBtn.style.display = 'none';

    const allCtgry = document.querySelectorAll('.categories div');
    for (let ctgry of allCtgry) {
        ctgry.style.display = 'flex';
        mngAnim(ctgry, 'opacityAnim');
    }

    const allRmvedTask = document.querySelectorAll('.task[data-rmv-from="ctgry"]');

    for (let task of allRmvedTask) {
      task.style.display = 'flex';
      task.dataset.rmvFrom = '';
      mngAnim(task, 'opacityAnim');
    }

    if (srcRsltCount.dataset.rmvFrom === 'ctgry') {
      srcRsltCount.style.display = 'flex';
      srcRsltCount.dataset.rmvFrom = '';
    }

    return;
  }

  taskData.forEach(task => {
    const taskId = task.id;
    const thisTask = document.querySelector(`.task[data-id="${taskId}"]`);
    if (thisTask.style.display !== 'none') {
      if (!task.category.includes(id)) {
        thisTask.style.display = 'none';
        thisTask.dataset.rmvFrom = 'ctgry';
      }
    }
  });

  xBtn.style.display = 'block';
  const allCtgry = document.querySelectorAll('.categories div');
  for (let ctgry of allCtgry) {
    if (ctgry.dataset.id !== id) {
      ctgry.style.display = 'none';
    }
  }

  if (srcRsltCount.style.display !== 'none') {
    srcRsltCount.style.display = 'none';
    srcRsltCount.dataset.rmvFrom = 'ctgry';
  }
}

function mngAnim(element, anim) {
  element.style.animation = `${anim} 1s ease`;

  const timeoutId = setTimeout(() => {
    element.style.removeProperty('animation');
    clearTimeout(timeoutId);
  }, 1000)
}

export const ctgryFilter = {
  init: initCtgryFilter,
  handle: handleCategoryFilter,
};