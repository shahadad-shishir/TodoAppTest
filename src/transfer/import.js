import { ctgryData, taskData } from "../data.js";
import { navbar } from "../navbar.js";
import { sidebar } from "../sidebar.js";
import { popup } from "../utils/popup.js";
import { ripple } from "../ripple-effect.js";
import { exportTask } from "./export.js";
import { navigateTo } from "../route.js";

export const importTask = {
  init() {
    const  el = document.querySelector('.import');
    this.el = el;
    this.dropZone = el.querySelector('.drop-file');
    this.selectFile = el.querySelector('.select-json-file');
    this.fileInput = el.querySelector('input[type="file"]');
    this.clipboardBtn = el.querySelector('.import-from-clipboard');
    this.linkBtn = el.querySelector('.import-from-link');

    //Adding ripple effect on all buttons
    [this.selectFile, this.clipboardBtn, this.linkBtn].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e);
      });
    });

    //Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      this.dropZone.addEventListener(event, e => e.preventDefault());
    });

    //Highlight the drop zone when a file is dragged over it
    ['dragenter', 'dragover'].forEach(event => {
      this.dropZone.addEventListener(event, () => {
        this.dropZone.style.boxShadow = 'var(--secondary) 0px 0px 32px 0px';
      });
    });

    //Remove the highlight when dragging leaves the drop zone
    ['dragleave', 'drop'].forEach(event => {
      this.dropZone.addEventListener(event, () => {
        this.dropZone.style.removeProperty('box-shadow');
      });
    });

    //Handle the drop event
    this.dropZone.addEventListener('drop', e => {
      const file = e.dataTransfer.files[0];
      this.handleFile(file);
    })

    //Handle input file change event
    this.fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      this.handleFile(file);
      this.fileInput.value = null;
    });

    //Handle import JSON from clipboard
    this.clipboardBtn.addEventListener('click', () => {
      this.getJsonFromClipboard();
    });

    //Handle import task from link
    this.linkBtn.addEventListener('click', () => {
      this.getFromLink();
    });
  },

  handleFile(file) {
    const fileNm = file.name;
    
    if (file && file.type === 'application/json') {
      const reader = new FileReader();

      reader.onload = e => {
        const jsonData = e.target.result;
        const data = JSON.parse(jsonData);
        
        if (!this.validateJsonStructure(data)) {
          const msg = 'JSON structure does not match the expected format.';
          popup.error(msg);
          return;
        }

        const msg = `Tasks sucessfully imported from <b>${fileNm}</b>`;
        this.import(data, msg);
      };

      reader.readAsText(file);
    } else {
      popup.error('Please choose a valid JSON file.');
    }
  },

  async getJsonFromClipboard() {
    //Read the clipboard contents
    const clipboardItems = await navigator.clipboard.read();
    let data;

    for (const clipboardItem of clipboardItems) {
      //Check if clipboard item contains JSON data
      if (clipboardItem.types.includes('application/json')) {
        const blob = await clipboardItem.getType('application/json');
        const jsonData = await blob.text();
        data = JSON.parse(jsonData);

      } else if (clipboardItem.types.includes('text/plain')) {
        const blob = await clipboardItem.getType('text/plain');
        const text = await blob.text();
    
        try {
          data = JSON.parse(text);
        } catch {
          const msg = 'Clipboard text is not valid JSON.';
          popup.error(msg);
          return;
        }
      }
    }

    if (!data) return;

    if (!this.validateJsonStructure(data)) {
      const msg = 'JSON structure does not match the expected format.';
      popup.error(msg);
      return;
    }

    const msg = 'Tasks successfully imported from clipboard.';
    this.import(data, msg);
  },

  async getFromLink() {
    const clipboardItems = await navigator.clipboard.read();

    try {
      const blob = await clipboardItems[0].getType('text/plain');
      const link = await blob.text();

      if (link.includes(`${location.origin}/share?`)) {
        const url = new URL(link);
        const search = url.search;
        history.pushState(null, null, `share${search}`);
        navigateTo('/');
      } else {
        popup.error('There are no valid link on the clipboard.');
        return;
      }
    } catch (err) {
      popup.error('There are no valid link on the clipboard.');
      return;
    }
  },

  validateJsonStructure(data) {
    const expectedStructure = {
        id: 'string',
        done: 'boolean',
        pinned: 'boolean',
        name: 'string',
        emoji: 'string',
        color: 'string',
        description: 'string',
        createDate: 'string',
        deadline: 'string',
        category: 'object'
      };
    
    return data.every(item => {
      for (const key in expectedStructure) {
        if (!(key in item) 
          || typeof(item[key]) !== expectedStructure[key]) {
            return false;
        }
      }

      return true;
    });
  },

  import(tasks, msg) {
    tasks.forEach(task => {
      task.category = task.category.map(ctgry => {
        return (ctgryData.matchId(ctgry) || ctgryData.create(ctgry));
      });
      taskData.add(task);
    });

    exportTask.renderTasks();
    sidebar.showNotDoneTask();
    navbar.showNotDoneTask();
    navbar.removeAnim();
    popup.success(msg);
  },
};