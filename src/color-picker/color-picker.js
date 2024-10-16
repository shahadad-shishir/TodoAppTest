export class ColorPicker {
  allColors = ['#ff69b4', '#fb34ff', '#ff22b4', '#c6a7ff', '#7accfa', '#4a9dff', '#5061ff', '#50b5cb', '#3ae836', '#b7ff42', '#ffea28', '#ff9518', '#ffc3a0', '#ff5018', '#3dff7f', '#ff2f2f', '#7e30e1', '#b624ff'];

  constructor(elSelector, handleClrCng) {
    if(handleClrCng) {
      this.handleClrCng = handleClrCng;
    }
    this.init(elSelector);
  }

  init(elSelector) {
    const el = document.querySelector(elSelector);
    this.selectedClr = el.querySelector('.selected-clr');
    this.angleIcon = el.querySelector('.selected-clr .right i');
    this.selectClr = el.querySelector('.select-clr');
    this.clrOptions = el.querySelector('.clr-options');
    this.clrCode = el.querySelector('.clr-code');
    this.selectedClrEl = el.querySelector('.selected-clr .color');
    this.clrPicker = el.querySelector('.picker span');
    this.clrInput = el.querySelector('input');
    this.randomClrBtn = el.querySelector('#random-clr');

    this.renderColors();

    this.clrInput.addEventListener('input', () => {
      this.select(this.clrInput.value);
    });

    this.randomClrBtn.addEventListener('click', () => {
      const randomClr = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      this.select(randomClr());
    });

    this.selectedClr.addEventListener('click', () => {
      if (this.selectClr.classList.contains('active')) {
        this.close();
      } else {
        this.open();
      }
    });
  }

  renderColors() {
    this.allColors.forEach(color => {
      const btn = document.createElement('button');
      btn.dataset.id = color;
      btn.classList.add('clr-btn');
      btn.style.backgroundColor = color;
      this.clrOptions.prepend(btn);
      this.addShadowOnHover(btn, color);

      btn.addEventListener('click', () => {
        this.select(color);
      });
    });
  }

  addShadowOnHover(el, clr) {
    el.addEventListener('mouseover', () => {
      el.style.boxShadow = `${clr} 0px 0px 12px`;
    });
    el.addEventListener('mouseout', () => {
      el.style.boxShadow = '';
    });
  }

  select(color) {
    const checkIcon = this.clrOptions.querySelector('i.fa-check');
    if (checkIcon) {
      checkIcon.remove();
    }
      
    this.allColors.forEach(clr => {
      if (clr === color) {
        const clrBtn = this.clrOptions
          .querySelector(`.clr-btn[data-id='${color}']`);
        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-check');
        clrBtn.appendChild(checkIcon);
        return;
      }
    });

    this.clrCode.style.backgroundColor = color;
    this.clrCode.innerText = color.toUpperCase();
    this.selectedClrEl.style.background = color;
    this.clrPicker.style.backgroundColor = color;
    this.addShadowOnHover(this.clrPicker, color);
    this.clrInput.value = color;

    if (this.handleClrCng) {
      this.handleClrCng(color);
    }
  }

  open() {    
    this.angleIcon.classList.add('rotate');  
    this.selectClr.classList.add('active');
    this.selectClr.style.height = this.clrOptions.clientHeight + this.clrCode.clientHeight + 82 + 'px';
    this.selectedClrEl.style.display = 'none';
  }

  close() {
    this.angleIcon.classList.remove('rotate');  
    this.selectClr.classList.remove('active');
    this.selectClr.style.height = '0px';
    this.selectedClrEl.style.display = 'initial';
  }

  getSelectedClr() {
    return this.clrInput.value;
  }
}