import { taskData, userData } from "../data.js";
import { scroll } from "../utils/shortcut.js";
import { popup } from "../utils/popup.js";
import { ripple } from "../ripple-effect.js";
import { exportTask } from "../transfer/export.js";

export const shareTask = {
  taskId: undefined,

  init() {
    const el = document.querySelector('.share-task');
    this.el = el;
    this.bg = document.querySelector('#shareTask-bg');
    this.closeBtn = el.querySelector('#close-btn');
    this.xBtn = el.querySelector('i.fa-xmark');
    this.shareBtn = el.querySelector('#share-btn');
    this.taskNm = el.querySelector('.task-nm span');
    this.linkBtn = el.querySelector('.link-btn');
    this.qrBtn = el.querySelector('.qr-code-btn');
    this.link = el.querySelector('.link');
    this.linkInput = el.querySelector('#link-input');
    this.copyBtn = el.querySelector('.copy');
    this.qrCode = el.querySelector('.qr-code');
    this.QRcanvas = el.querySelector('.qr-code canvas');
    this.downloadBtn = el.querySelector('.qr-code .download');

    //Add ripple effect
    [this.closeBtn, this.xBtn, this.shareBtn, this.copyBtn, this.downloadBtn].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e);
      });
    });

    //Handle click events
    [this.bg, this.closeBtn, this.xBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        this.close();
      });
    });

    this.shareBtn.addEventListener('click', () => {
      this.shareLink();
    });

    [this.linkBtn, this.qrBtn].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e, 'var(--secondary-min5)')
        this.cngOption(btn);
      });
    });

    this.copyBtn.addEventListener('click', () => {
      this.copyLink();
    });

    this.downloadBtn.addEventListener('click', () => {
      this.downloadQRCode();
    });
  },

  open(taskId) {
    this.taskId = taskId;
    this.el.classList.add('active');
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    scroll.disable();
    this.showData();
    this.cngOption(this.linkBtn);
  },

  close() {
    this.bg.style.removeProperty('bottom');
    this.bg.style.removeProperty('opacity');
    this.el.classList.remove('active');
    scroll.enable();
  },

  showData() {
    const {id, name, emoji} = taskData.getTask(this.taskId);

    if (emoji === '') {
      this.taskNm.innerHTML = name;
    } else {
      this.taskNm.innerHTML = `${emoji} ${name}`;
    }

    //Create link
    const task = exportTask.makeExportableTask(id);
    const taskJSON = JSON.stringify(task);
    const encodedTask = encodeURIComponent(taskJSON);

    const userName = userData.name || 'user';
    const baseURL = location.origin;
    const link = `${baseURL}/share?task=${encodedTask}&user=${encodeURIComponent(userName)}`;
    
    this.linkInput.value = link;

    //Generate QR Code
    const qr = new QRious({
      element: this.QRcanvas,
      value: link,
      size: 250
    });
  },

  cngOption(btn) {
    if (btn.classList.contains('selected')) return;

    const id = btn.dataset.id;

    if (id === 'link') {
      this.qrBtn.classList.remove('selected');
      this.linkBtn.classList.add('selected');

      this.qrCode.style.display = 'none';
      this.link.style.display = 'flex';
    } else {
      this.linkBtn.classList.remove('selected');
      this.qrBtn.classList.add('selected');

      this.link.style.display = 'none';
      this.qrCode.style.display = 'flex';
    }
  },

  copyLink() {
    const link = this.linkInput.value;
    navigator.clipboard.writeText(link).then(() => {
      popup.success('Copied link to clipboard.');
    }).catch(() => {
      popup.error('Failed to copy link');
    });
  },
  
  downloadQRCode() {
    const canvas = document.createElement('canvas');

    const qr = new QRious({
      element: canvas,
      value: this.linkInput.value,
      size: 300
    });

    const pngUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `QRcode-${taskData.getTask(this.taskId).name}.png`;
    
    link.click();
  },

  shareLink() {
    if (!navigator.share) {
      popup.error('Web Share API is not supported in your browser.');
      return;
    }

    navigator.share({
      title: 'Share Task',
      text: `Check out this task: ${taskData.getTask(this.taskId).name}`,
      url: this.linkInput.value
    })
  }
};