export const template = 
`
  <main class="main">
    <div class="card">
      <div class="profile">
        <div class="js-profile-pic profile-pic">
        </div>
        <div class="icon">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2z"></path><circle cx="13" cy="14" r="3"></circle><path d="M21 6h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65h-6.4c.17.3.28.63.28 1 0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"></path></svg>
        </div>
        <span class="tooltip">Add profile picture</span>
      </div>
      <span class="nm js-user-name">User</span>
      <div class="register">
        <i class="fa-solid fa-calendar-day"></i>
        <span>Registered on ...</span>
      </div>
      <ul class="themes">
      </ul>
      <div class="nm-input">
        <input placeholder="Change Name" type="text">
        <span class="nm-count">1/14</span>
      </div>
      <button class="save-btn">Save Name</button>
      <button class="logout">
      <i class="fa-solid fa-sign-out"></i> Logout
      </button>
      </div>

      <div class="cng-profile">
        <h3 class="header">Profile Picture</h3>
        <div class="form">
          <div class="link">
            <label class="label1" for="link-input">Link to the profile picture</label>
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M17 7h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c2.76 0 5-2.24 5-5s-2.24-5-5-5m-9 5c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1m2 3H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h3c.55 0 1-.45 1-1s-.45-1-1-1H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3c.55 0 1-.45 1-1s-.45-1-1-1"></path></svg>
            <input type="text" id="link-input" placeholder="Enter link to profile picture..." autocomplete="off">
          </div>
          <span class="nm-count">2/20</span>

          <button class="delete">
            <i class="fa-solid fa-trash"></i> Delete Image
          </button>
        </div>
        <div class="fotter">
          <button id="cancel-btn">cancel</button>
          <button id="save-btn"><i class="fa-solid fa-floppy-disk"></i>save</button>
        </div>
      </div>

      <div id="cngProfile-bg" class="blur-bg"></div>
  </main>
`;