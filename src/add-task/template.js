import { emojiPickerHtml } from '../emoji-picker/emoji-picker-html.js';
import {clrPickerHtml} from '../color-picker/clr-picker-html.js'
import { ctgrySelectorHtml } from '../category-selector/ctgry-selector-html.js';

export const template = 
`
  <main class="main">
    <div class="form" id="form">
      ${emojiPickerHtml()}  

      <div class="name">
        <label class="label1" for="">Task name*</label>
        <input type="text" id="name-input" placeholder="Enter task name"> 
      </div>
      <span class="nm-count"></span>

      <div class="description">
        <label class="label1" for="">Text Description (optional)</label>
        <textarea id="description" rows="4" placeholder="Enter task description" res></textarea>
      </div>
      <span class="des-count"></span>

      <div class="date-time">
        <label class="label1" for="">Task deadline(optional)</label>
        <input type="datetime-local" id="date-input">
      </div>
      
      <div class="category">
        <span class="heading">Category</span>
        ${ctgrySelectorHtml()}

        <div class="modify-category">
          <i class="fa-solid fa-pen"></i>
          Modify categories
        </div>           
      </div>

      ${clrPickerHtml()}
      
      <button class="enable" id="create-btn">Create Task</button>
    </div>
  </main>
`;