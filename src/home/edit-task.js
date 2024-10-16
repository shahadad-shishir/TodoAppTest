import { taskData, userData } from "../data.js";
import { arraysEqual, scroll } from "../utils/shortcut.js";
import { CategorySelector } from "../category-selector/category-selector.js";
import { ColorPicker } from "../color-picker/color-picker.js";
import { EmojiPicker } from "../emoji-picker/emoji-picker.js";
import { tasks } from "./tasks.js";
import { search } from "./search.js";
import { ctgryFilter } from "./category-filter.js";
import { popup } from "../utils/popup.js";
import { ripple } from "../ripple-effect.js";
import { theme } from "../profile/theme.js";

export const editTask = {
  taskId: undefined,

  init() {
    const el = document.querySelector('.edit-task');
    this.el = el;
    this.saveBtn = document.querySelector('#save-btn');
    this.bg = document.querySelector('#editTask-bg');
    this.cancelBtn = el.querySelector('#cancel-btn');
    this.nameInput = el.querySelector('#name-input');
    this.desInput = el.querySelector('#description');
    this.dateInput = el.querySelector('#date-input');
    this.nm = el.querySelector('.name');
    this.des = el.querySelector('.description');
    this.nmLabel = el.querySelector('.name label');
    this.desLabel = el.querySelector('.description label');
    this.nmCount = el.querySelector('span.nm-count');
    this.desCount = el.querySelector('span.des-count');
    this.formEmojiIcon = document.querySelector('#emoji-picker .emoji');

    //Add ripple effect
    [this.saveBtn, this.cancelBtn].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e);
      });
    });

    //Handle click events
    this.bg.addEventListener('click', () => {
      this.hideEditTask();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });

    this.nameInput.addEventListener('input', () => {
      this.mngNmCount();
      this.updateSaveBtnState();
    });

    this.desInput.addEventListener('input', () => {
      this.mngDesCount();
      this.updateSaveBtnState();
    });

    this.dateInput.addEventListener('input', () => {
      this.updateSaveBtnState();
    });

    this.cancelBtn.addEventListener('click', () => {
      this.hideEditTask();
    });

    this.saveBtn.addEventListener('click', () => {
      if (this.saveBtn.classList.contains('enable')) {
        this.saveEditedData();
      }
    });

    if (theme.themes[userData.theme].mode === 'dark') {
      this.dateInput.style.colorScheme = 'dark';
    } else {
      this.dateInput.style.removeProperty('color-scheme');
    }

    this.emojiPicker = new EmojiPicker('#emoji-picker', () => {
      this.updateSaveBtnState();
    });

    this.ctgrySelector = new CategorySelector('#ctgry-selector', () => {
      this.updateSaveBtnState();
    });

    this.colorPicker = new ColorPicker('#color-picker', (clr) => {
      this.formEmojiIcon.style.backgroundColor = clr;
      this.updateSaveBtnState();
    });
  },

  showEditTask(taskId) {
    this.taskId = taskId;
    this.oldData = taskData.getTask(this.taskId);
    this.resize();
    this.el.classList.add('active');
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    scroll.disable();
    this.showEditableData();
    this.updateSaveBtnState();
  },

  hideEditTask() {
    this.ctgrySelector.clearText();
    this.colorPicker.close();
    this.emojiPicker.close();

    this.bg.style.removeProperty('bottom');
    this.bg.style.removeProperty('opacity');
    this.el.classList.remove('active');
    scroll.enable();
  },

  showEditableData() {
    const data = taskData.getTask(this.taskId);
    const {name, emoji, description, color, deadline, category} = data;
    
    this.nameInput.value = name;
    this.nmCount.style.display = 'block';
    this.nmCount.innerHTML = `${this.nameInput.value.length}/40`;
    this.desInput.value = description;
    if (description !== '') {
      this.desCount.style.display = 'block';
      this.desCount.innerHTML = `${this.desInput.value.length}/250`;
    } else {
      this.desCount.style.display = 'none';
    }
    this.dateInput.value = deadline;

    this.colorPicker.select(color);
    this.ctgrySelector.render(category);

    if (emoji) {
      this.emojiPicker.select(emoji);
    } else {
      this.emojiPicker.removeEmoji();
    }
  },

  saveEditedData() {
    const updates = this.getUpdates();
    taskData.update(this.taskId, { ...updates });
    this.hideEditTask();
    tasks.render();
    ctgryFilter.handle();
    search.clear();
    const msg = `Task <b>${updates.name}</b> updated.`;
    popup.success(msg);
  },

  getUpdates() {
    return  {
      emoji: this.emojiPicker.getEmoji(),
      name: this.nameInput.value,
      description: this.desInput.value,
      deadline: this.dateInput.value,
      category: this.ctgrySelector.getAllSelected(),
      color: this.colorPicker.getSelectedClr(),
    };
  },

  mngNmCount() {
    const value = this.nameInput.value;
    if (value !== '') {
      this.nmCount.style.display = 'block';
    } else {
      this.nmCount.style.display = 'none';
      return;
    }

    const length = value.length;
    if (length < 41) {
      this.nmCount.style.color = 'var(--text)';
      this.nm.style.borderColor = '#ddd';
      this.nmLabel.style.color = 'var(--text-min6)';
      this.nmCount.innerHTML = `${length}/40`;
    } else {
      this.nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      this.nm.style.borderColor = 'rgb(255, 49, 49)';
      this.nmLabel.style.color = 'rgb(255, 49, 49)';
      this.nmCount.innerHTML = 'Name is too long (maximum 40 characters)';
    }
  },

  mngDesCount() {
    const value = this.desInput.value;
    if (value !== '') {
      this.desCount.style.display = 'block';
    } else {
      this.desCount.style.display = 'none';
      return;
    }

    const length = value.length;
    if (length < 251) {
      this.desCount.style.color = 'var(--text)';
      this.des.style.borderColor = '#ddd';
      this.desLabel.style.color = 'var(--text-min6)';
      this.desCount.innerHTML = `${length}/250`;
    } else {
      this.desCount.style.color = 'rgba(255, 49, 49, 0.8)';
      des.style.borderColor = 'rgb(255, 49, 49)';
      this.desLabel.style.color = 'rgb(255, 49, 49)';
      this.desCount.innerHTML = 'Description is too long (maximum 250 characters)';
    }
  },

  updateSaveBtnState() {
    const {name, emoji, description, color, deadline, category} = this.getUpdates();

    const oldnm = this.oldData.name;
    const oldEmj = this.oldData.emoji;
    const oldClr = this.oldData.color;
    const oldDes = this.oldData.description;
    const oldDdl = this.oldData.deadline;
    const oldCtgry = this.oldData.category;

    if ((oldnm !== name || oldEmj !== emoji || oldClr !== color || oldDes !== description || oldDdl !== deadline || !arraysEqual(oldCtgry, category)) && (this.nameInput.value.length < 41 && this.desInput.value.length < 251)) {
      this.saveBtn.classList.add('enable');
    } else {
      this.saveBtn.classList.remove('enable');
    }
  },

  resize() {
    const width = tasks.container.offsetWidth;
    this.el.style.width = (width - 64) + 'px';
  },
};