import { template } from "./template.js";
import { ctgryData } from "../data.js";
import { EmojiPicker } from "../emoji-picker/emoji-picker.js";
import { ColorPicker } from "../color-picker/color-picker.js";
import { oldCategories } from "./old-categories.js";
import { popup } from "../utils/popup.js";
import { ripple } from "../ripple-effect.js";

function initCategories() {
  const nmEl = document.querySelector('.new-ctgry .category-name');
  const nmLabel = document.querySelector('.new-ctgry .label1');
  const nmInput = document.querySelector('.new-ctgry #name-input');
  const nmCount = document.querySelector('.new-ctgry .nm-count');
  const createBtn = document.querySelector('.new-ctgry #create-btn');
  const formEmojiIcon = document.querySelector('.EP1 .emoji');

  const emojiPicker = new EmojiPicker('#emoji-picker.EP1');
  const handleClrCng = (clr) => {
    formEmojiIcon.style.backgroundColor = clr;
  }
  const colorPicker = new ColorPicker('#color-picker.CP1', handleClrCng);
  colorPicker.select('#b624ff');
  oldCategories.init();

  createBtn.addEventListener('click', e => {
    if (createBtn.classList.contains('enable')) {
      ripple.add(createBtn, e);
      createCtgry();
    }
  });

  function createCtgry() {
    const name = nmInput.value;

    if (name === '') {
      popup.error('Category name is required.');
      return;
    }

    const emoji = emojiPicker.getEmoji();
    const color = colorPicker.getSelectedClr();
    ctgryData.create({name, emoji, color});
    oldCategories.render();
    emojiPicker.removeEmoji();
    emojiPicker.close();
    colorPicker.select('#7e30e1');
    nmInput.value = '';
    if (nmCount.style.display === 'block') {
      nmCount.style.display = 'none';
      nmEl.style.borderColor = 'var(--secondary)';
      nmLabel.style.color = 'var(--secondary)';
    }

    const msg = `Added category - <b>${name}</b>`;
    popup.success(msg);
  }

  nmInput.addEventListener('input', () => {
    mngNmCount();
  });


  function mngNmCount() {
    const value = nmInput.value;
    if (value !== '') {
      nmCount.style.display = 'block';
    } else {
      nmCount.style.display = 'none';
    }

    const length = value.length;
    if (length < 21) {
      nmCount.style.color = 'var(--text)';
      nmEl.style.borderColor = 'var(--secondary)';
      nmLabel.style.color = 'var(--secondary)';
      nmCount.innerHTML = `${length}/20`;
      createBtn.classList.add('enable');
    } else {
      nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      nmEl.style.borderColor = 'rgb(255, 49, 49)';
      nmLabel.style.color = 'rgb(255, 49, 49)';
      nmCount.innerHTML = 'Name is too long (maximum 20 characters)';
      createBtn.classList.remove('enable');
    }
  }
}

export const categories = {
  template: template,
  init: initCategories,
};