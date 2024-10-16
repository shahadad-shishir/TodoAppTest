export function ctgrySelectorHtml(className) {
  if (!className) className = '';
  
  const html = 
  `
    <div id="ctgry-selector" class="${className}">
    <div class="selected">
      <ul>
        <!-- <li>
          <span class="selected-emoji">🏢</span>
          <span>Home</span>
        </li> -->
      </ul>
      <spna class="arrow-icon">
        <i class="fa-solid fa-angle-down"></i>
      </spna>
    </div>

    <div class="select">
      <h3>Select Categories (max 3)</h3>
      <p></p>
      <ul>
        <!-- <li>
          <i class="fa-regular fa-circle-dot"></i>
          <span class="select-emoji">📚️</span>
          <span>Home</span>
        </li> -->
      </ul>
    </div>
  </div>
  <div id="ctgry-selector-bg"></div>       
  `
  return html;
}