import { emojiPickerHtml } from '../emoji-picker/emoji-picker-html.js';
import { clrPickerHtml } from '../color-picker/clr-picker-html.js'

export const template = 
`
  <main class="main">
    <div class="old-categories"></div>

    <div class="new-ctgry">
      <h2>Add New Category</h2>
      ${emojiPickerHtml('EP1')}

      <div class="category-name">
        <label class="label1" for="">Category name*</label>
        <input type="text" id="name-input" placeholder="Enter category name">
      </div>
      <span class="nm-count"></span>

      ${clrPickerHtml('CP1')}

      <button class="enable" id="create-btn">Create Category</button>
    </div>  
  </main>

  <div class="edit-category">
    <h3 class="edit-header">Edit Category</h3>
    <div class="edit-form">
      ${emojiPickerHtml('EP2')}

      <div class="edit-name">
        <label class="edit-label1" for="">Enter category name</label>
        <input type="text" id="edit-name-input">
      </div>
      <span class="edit-nm-count">2/20</span>

      ${clrPickerHtml('CP2')}
    </div>
    <div class="fotter">
      <button id="edit-cancel-btn">cancel</button>
      <button id="edit-save-btn"><i class="fa-solid fa-floppy-disk"></i>save</button>
    </div>
  </div>
  <div id="editCtgry-bg" class="blur-bg"></div>

  <div class="dlt-ctgry">
    <h3>Confirm deletion of <b>Work</b></h3>
    <div class="info">
      This will remove the category from your list and associated tasks.
    </div>
    <div class="btns">
      <button id="cncl-btn">cancel</button>
      <button id="dlt-btn"><i class="fa-solid fa-trash"></i>Delete</button>
    </div>
  </div>
  <div id="dltCtgry-bg" class="blur-bg">></div>
`;