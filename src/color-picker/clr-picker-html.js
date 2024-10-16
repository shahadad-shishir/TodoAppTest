export function clrPickerHtml(className) {
  if (!className) className = '';
  
  const html = 
  `
    <div class="${className}" id="color-picker">
      <div class="selected-clr">
        <div class="left">
          <span class="color"></span>
          Color
        </div>
        <div class="right">
          <i class="fa-solid fa-angle-down"></i>
        </div>
      </div>
      <div class="select-clr">
        <span class="clr-code">var(--secondary)</span>
        <div class="clr-options">
          <!-- <button>
            <i class="fa-solid fa-check"></i>
          </button> -->
          <label for="clr-input${className}" class="picker">
            <input type="color" id="clr-input${className}">
            <span>
              <i class="fa-solid fa-eye-dropper"></i>
            </span>
          </label>
          <button id="random-clr">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18m0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9m4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  return html;
}

