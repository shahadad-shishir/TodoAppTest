import { ctgryData } from "../data.js";
import { popup } from "../utils/popup.js";
import { scroll } from "../utils/shortcut.js";
import { ColorPicker } from "../color-picker/color-picker.js";
import { EmojiPicker } from "../emoji-picker/emoji-picker.js";
import { oldCategories } from "./old-categories.js";
import { ripple } from "../ripple-effect.js";

export const editCtgry = {
  ctgryId: undefined,
  oldData: undefined,
  
  init() {
    const el = document.querySelector('.edit-category');
    this.el = el;
    this.bg = document.querySelector('#editCtgry-bg');
    this.cancelBtn = el.querySelector('#edit-cancel-btn');
    this.saveBtn = el.querySelector('#edit-save-btn');
    this.nm = el.querySelector('.edit-name');
    this.nmLabel = el.querySelector('.edit-label1');
    this.nmInput = el.querySelector('.edit-category input');
    this.nmCount = el.querySelector('.edit-nm-count');
    this.formEmojiIcon = el.querySelector('.EP2 .emoji');

    this.bg.addEventListener('click', () => {
      this.hide();
    });
    
    this.nmInput.addEventListener('input', () => {
      this.mngNmCount();
      this.updateSaveBtnState();
    });

    this.cancelBtn.addEventListener('click', e => {
      ripple.add(this.cancelBtn, e);
      this.hide();
    });

    this.saveBtn.addEventListener('click', e => {
      if (this.saveBtn.classList.contains('enable')) {
        ripple.add(this.saveBtn, e);
        this.saveEditedData();
      }
    });

    this.colorPicker = new ColorPicker('#color-picker.CP2', (clr) => {
      this.formEmojiIcon.style.backgroundColor = clr;
      this.updateSaveBtnState();
    });
    this.emojiPicker = new EmojiPicker('#emoji-picker.EP2', () => {
      this.updateSaveBtnState();
    });
  },

  show(id) {
    this.ctgryId = id;
    this.oldData = ctgryData.getCtgry(this.ctgryId);
    this.el.classList.add('active');
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    scroll.disable();
    this.showEditableData();
    this.updateSaveBtnState();
  },

  hide() {
    this.colorPicker.close();
    this.emojiPicker.close();

    this.bg.style.removeProperty('bottom');
    this.bg.style.removeProperty('opacity');
    this.el.classList.remove('active');
    scroll.enable();
  },

  showEditableData() {
    const data = ctgryData.getCtgry(this.ctgryId);
    const {name, emoji, color} = data;
    
    this.nmInput.value = name;
    this.nmCount.style.display = 'block';
    this.nmCount.innerHTML = `${this.nmInput.value.length}/20`;

    this.colorPicker.select(color);
    if (emoji) {
      this.emojiPicker.select(emoji);
    } else {
      this.emojiPicker.removeEmoji();
    }
  },

  mngNmCount() {
    const value = this.nmInput.value;
    if (value !== '') {
      this.nmCount.style.display = 'block';
    } else {
      this.nmCount.style.display = 'none';
    }

    const length = value.length;
    if (length < 21) {
      this.nmCount.style.color = 'var(--text)';
      this.nm.style.borderColor = '#ddd';
      this.nmLabel.style.color = 'var(--text-min6)';
      this.nmCount.innerHTML = `${length}/20`;
    } else {
      this.nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      this.nm.style.borderColor = 'rgb(255, 49, 49)';
      this.nmLabel.style.color = 'rgb(255, 49, 49)';
      this.nmCount.innerHTML = 'Name is too long (maximum 20 characters)';
    }
  },

  saveEditedData() {
    const name = this.nmInput.value;
  
    ctgryData.update(this.ctgryId, {
      name,
      emoji: this.emojiPicker.getEmoji(),
      color: this.colorPicker.getSelectedClr(),
    });
    
    this.hide();
    oldCategories.render();
    const msg = `Updated category - <b>${name}</b>`;
    popup.success(msg)
  },

  updateSaveBtnState() {
    const oldNm = this.oldData.name;
    const oldEmj = this.oldData.emoji;
    const oldClr = this.oldData.color;

    const emoji = this.emojiPicker.getEmoji();
    const name = this.nmInput.value;
    const color = this.colorPicker.getSelectedClr();

    if ((oldNm !== name || oldEmj !== emoji || oldClr !== color) & name.length < 21) {
      this.saveBtn.classList.add('enable');
    } else {
      this.saveBtn.classList.remove('enable');
    }
  }
};