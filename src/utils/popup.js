export const popup = {
  popupEl: undefined,
  
  init() {
    const popupEl = document.createElement('div');
    popupEl.id = 'popup';
    document.body.prepend(popupEl);
    this.popupEl = popupEl;

  },

  success(msg) {
    const template = this.create(msg, 'circle-check', 'var(--secondary)');
    this.render(template);
  },

  error(msg) {
    const template = this.create(msg, 'circle-xmark', 'rgb(255, 49, 49)', 'rgb(255, 49, 49)');
    this.render(template);
  },

  info(msg) {
    const template = this.create(msg, 'circle-info', 'rgb(255, 193, 7)');
    this.render(template);
  },

  create(text, icon, mainClr, txtClr, bgClr) {
    const msgArea = document.createElement('div');
    msgArea.classList.add('msg-area');
    msgArea.style.border = `2px solid ${mainClr}`;
    if (bgClr) {
      msgArea.style.backgroundColor = bgClr;
    }

    const i = document.createElement('i');
    i.classList.add('fa-solid', `fa-${icon}`);
    i.style.color = mainClr;

    const msg = document.createElement('span');
    msg.classList.add('msg');
    if (txtClr) {
      msg.style.color = txtClr;
    }
    msg.innerHTML = text;
    msgArea.appendChild(i);
    msgArea.appendChild(msg);

    return msgArea;
  },

  render(msgArea) {
    this.popupEl.appendChild(msgArea);
    this.popupEl.style.visibility = 'visible';
    msgArea.style.animation = 'popupAddAnim 0.3s ease';
    const timeoutId1 = setTimeout(() => {
      msgArea.style.removeProperty('animation');
      clearTimeout(timeoutId1);
    }, 300)
    this.vibrate();

    const timeoutId2 = setTimeout(() => {
      if (msgArea) {
        this.rmvPopup(msgArea);
      }
      clearTimeout(timeoutId2);
    }, 4000)

    msgArea.addEventListener('click', () => {
      this.rmvPopup(msgArea);
    });
  },

  rmvPopup(msgArea) {
    msgArea.style.animation = 'popupRmvAnim 0.23s ease';
    const timeoutId = setTimeout(() => {
      msgArea.remove();
      if (this.popupEl.innerHTML === '') {
        this.popupEl.style.visibility = 'hidden';
      }
      clearTimeout(timeoutId);
    }, 200)
  },

  vibrate() {
    window.navigator.vibrate([130, 50, 60]);
  }
};