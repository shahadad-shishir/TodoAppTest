import { emojiPickerHtml } from "../emoji-picker/emoji-picker-html.js";
import { clrPickerHtml } from "../color-picker/clr-picker-html.js";
import { ctgrySelectorHtml } from "../category-selector/ctgry-selector-html.js";

export const template =
  `
  <div class="container">
    <header class="header">
      <div class="message">
        <h2><img src="./assets/images/hand.png"> <span class="greeting"></span></h2>
        <p class="quote">Let's turn plans into accomplishments!</p>
      </div>
      <div class="user">
        <div class="js-profile-pic">
        </div>
        <span class="tooltip js-user-name">User</span>
      </div>
    </header>

    <main class="main">
      <div class="progress">
        <div class="circle-container">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle viewBox="0 0 50 50" cx="50" cy="50" r="37" fill="none" stroke="#F2EBD3" class="draw-circle"/>
          </svg>
          <span class="number"><!--50%--></span>
        </div>
        <div class="details">
          <h3><!--You've completed 1 out of 2 tasks.--></h3>
          <p><!--You're halfway there! Keep it up!--></p>
        </div>
      </div>

      <div class="search-bar">
        <i class="fa-solid fa-search"></i>
        <input type="text" id="search-input" placeholder="Search for task..." autocomplete="off">
        <button>
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="categories">
      <!--<div>
          <span class="category-emoji">🏠️</span>
          <span>Home (<span class="count">2</span>)</span>
          <span class="x-btn"><i class="fa-solid fa-circle-xmark"></i></span>
        </div>-->
      </div>

      <div class="search-result">
        <span class="count"></span>
        <div class="empty">
          <h3>No tasks found</h3>
          <p>Try searching with different keywords.</p>
          <svg width="172.8" height="347.20000000000005" viewBox="0 0 261 434" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="130.837" cy="34.2327" r="26.7209" stroke="var(--secondary)" stroke-width="14"></circle><rect y="51.7676" width="261" height="381.721" rx="45" fill="var(--secondary)" fill-opacity="0.6"></rect><rect x="26.9767" y="80.0928" width="207.047" height="325.07" rx="35" fill="white" fill-opacity="0.9"></rect><rect x="64.7442" y="176.535" width="132.186" height="132.186" rx="66.093" fill="var(--secondary)"></rect><rect x="95.0707" y="268.856" width="87.6744" height="13.4884" rx="6.74419" transform="rotate(-45 95.0707 268.856)" fill="#f0f0f0"></rect><rect x="104.608" y="206.861" width="87.6744" height="13.4884" rx="6.74419" transform="rotate(45 104.608 206.861)" fill="#f0f0f0"></rect><rect x="77.5581" y="36.9307" width="106.558" height="56.6512" rx="18" fill="var(--secondary)"></rect></svg>
        </div>
      </div>

      <div class="tasks-container">
      </div>
    </main>

    <div class="add-btn">
      <div class="icon">
        <i class="fa-solid fa-plus"></i>
      </div>
      <span class="tooltip">Add Task</span>
    </div>

    <div class="menubar no-select">
      <div class="top">
        <hr>
        <span class="task-name"></span>
      </div>
      <div class="options">
        <div id="mark-done">
          <i class="fa-solid fa-check"></i>
          <span>Mark as done</span>
        </div>
        <div id="pin">
          <i class="fa-solid fa-thumbtack"></i>
          <span>Pin</span>
        </div>
        <div id="select">
          <i class="fa-regular fa-circle-dot"></i>
          <span>Select</span>
        </div>
        <div id="details">
          <i class="fa-solid fa-circle-info"></i>
          <span>Task details</span>
        </div>
        <div id="share">
          <i class="fa-regular fa-share-from-square"></i>
          <span>Share</span>
        </div>
        <span class="break"></span>
        <div id="edit">
          <i class="fa-solid fa-pen"></i>
          <span>Edit</span>
        </div>
        <div  id="dublicate">
          <i class="fa-regular fa-copy"></i>
          <span>Dublicate</span>
        </div>
        <span class="break"></span>
        <div id="delete">
          <i class="fa-solid fa-trash"></i>
          <span>Delete</span>
        </div>
      </div>
    </div>

    <div class="edit-task">
      <h3 class="edit-header">Edit Task</h3>
      <div class="form">
        ${emojiPickerHtml()}
        <div class="name">
          <label class="label1" for="">Name</label>
          <input type="text" id="name-input">
        </div>
        <span class="nm-count">2/50</span>

        <div class="description">
          <label class="label1" for="">Description</label>
          <textarea id="description" rows="4"></textarea>
        </div>
        <span class="des-count">3/250</span>

        <div class="date-time">
          <label class="label1" for="">Deadline</label>
          <input type="datetime-local" id="date-input">
        </div>
        
        <div class="category">
          <span>Category</span>
          ${ctgrySelectorHtml()}
        </div>

        ${clrPickerHtml()}        

      </div>
      <div class="fotter">
        <button id="cancel-btn">cancel</button>
        <button id="save-btn"><i class="fa-solid fa-floppy-disk"></i>save</button>
      </div>
    </div>

    <div class="share-task">
      <div class="share-header">
        <div class="left">
          <i class="fa-regular fa-share-from-square"></i>
          <div class="heading">
          <h3>Share Task</h3>
          <span>Share your task with others.</span>
          </div>
        </div>
        <div class="right">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div class="share-body">
        <div class="task-nm">
          <span>Demo</span>
        </div>
        <div class="options">
          <button data-id="link" class="link-btn">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5"></path></svg>
            <span>Link</span>
          </button>
          <button data-id="qr" class="qr-code-btn">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M15 21h-2v-2h2zm-2-7h-2v5h2zm8-2h-2v4h2zm-2-2h-2v2h2zM7 12H5v2h2zm-2-2H3v2h2zm7-5h2V3h-2zm-7.5-.5v3h3v-3zM8 9H4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1m-3.5 7.5v3h3v-3zM8 21H4c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1m8.5-16.5v3h3v-3zM20 9h-4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1m-1 10v-3h-4v2h2v3h4v-2zm-2-7h-4v2h4zm-4-2H7v2h2v2h2v-2h2zm1-1V7h-2V5h-2v4zM6.75 5.25h-1.5v1.5h1.5zm0 12h-1.5v1.5h1.5zm12-12h-1.5v1.5h1.5z"></path></svg>
            <span>QR Code</span>
          </button>
        </div>

        <div class="link">
          <label class="label1" for="link-input">Shareable Link</label>
          <span class="svg">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M17 7h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c2.76 0 5-2.24 5-5s-2.24-5-5-5m-9 5c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1m2 3H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h3c.55 0 1-.45 1-1s-.45-1-1-1H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3c.55 0 1-.45 1-1s-.45-1-1-1"></path></svg>
          </span>
          <input type="text" id="link-input" autocomplete="off" disabled>
          <div class="copy">  
            <span>
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1m5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2m-2 0H9V4h9z"></path>
              </svg>
            </span>
            copy
          </div>
        </div>

        <div class="qr-code">
          <canvas></canvas>

          <button class="download">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"></path></svg>

            <span>Download Qr Code</span>
          </button>
        </div>

        <div class="info">
          <span>
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
          </span>
          <div>
            <span>Share Your Task</span>
            <p>Copy the link to share manually or use the share button to send it via other apps. You can also download the QR code for easy access.</p>
          </div>
        </div>
      </div>

      <div class="share-fotter">
        <button id="close-btn">close</button>
        <button id="share-btn"><i class="fa-solid fa-share"></i>share</button>
      </div>
    </div>

    <div class="recieved-task">
      <div class="recieved-header">
        <span class="svg">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="m21.29 5.89-10 10c-.39.39-1.02.39-1.41 0l-2.83-2.83a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l2.12 2.12 9.29-9.29c.39-.39 1.02-.39 1.41 0 .4.39.4 1.02.01 1.41M12 20c-4.71 0-8.48-4.09-7.95-8.9.39-3.52 3.12-6.41 6.61-6.99 1.81-.3 3.53.02 4.99.78.39.2.86.13 1.17-.18.48-.48.36-1.29-.24-1.6-1.47-.75-3.13-1.16-4.9-1.11-5.14.16-9.41 4.34-9.67 9.47C1.72 17.24 6.3 22 12 22c1.2 0 2.34-.21 3.41-.6.68-.25.87-1.13.35-1.65-.27-.27-.68-.37-1.04-.23-.85.31-1.77.48-2.72.48m7-5h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2v-2c0-.55-.45-1-1-1s-1 .45-1 1z">
            </path>
          </svg>
        </span>
        <div class="heading">
          <h3>Recieved Task</h3>
          <span>You can now include this task in your list</span>
        </div>
      </div>
      <div class="recieved-body">
        <div class="user-nm"><span>User</span> shared you a task.</div>
      </div>
      <div class="recieved-fotter">
        <button id="decline-btn">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2M4 12c0-4.4 3.6-8 8-8 1.8 0 3.5.6 4.9 1.7L5.7 16.9C4.6 15.5 4 13.8 4 12m8 8c-1.8 0-3.5-.6-4.9-1.7L18.3 7.1C19.4 8.5 20 10.2 20 12c0 4.4-3.6 8-8 8"></path></svg>
          
          Decline
        </button>
        <button id="add-btn">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="m21.29 5.89-10 10c-.39.39-1.02.39-1.41 0l-2.83-2.83a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l2.12 2.12 9.29-9.29c.39-.39 1.02-.39 1.41 0 .4.39.4 1.02.01 1.41M12 20c-4.71 0-8.48-4.09-7.95-8.9.39-3.52 3.12-6.41 6.61-6.99 1.81-.3 3.53.02 4.99.78.39.2.86.13 1.17-.18.48-.48.36-1.29-.24-1.6-1.47-.75-3.13-1.16-4.9-1.11-5.14.16-9.41 4.34-9.67 9.47C1.72 17.24 6.3 22 12 22c1.2 0 2.34-.21 3.41-.6.68-.25.87-1.13.35-1.65-.27-.27-.68-.37-1.04-.23-.85.31-1.77.48-2.72.48m7-5h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2v-2c0-.55-.45-1-1-1s-1 .45-1 1z">
            </path>
          </svg>
        
          Add Task
        </button>
      </div>
   </div>

  </div>
  
  <div class="empty-task">
  <h3>You don't have tasks yet</h3>
  <p>Click on the <b>+</b> button to add one</p>
  </div>

  <div class="dlt-task">
    <h3>Are you sure you want to delete the task?</h3>
    <div class="info">
      <div class="nm">
        <!-- <b>Task Name: </b><span>Demo</span> -->
      </div>
      <div class="des">
        <!-- <b>Task Description: </b><span>This is a description</span> -->
      </div>
      <div class="ctgry">
        <!-- <b>Categories: </b><span>Home and Work</span> -->
      </div>
    </div>
    <div class="btns">
      <button id="cncl-btn">cancel</button>
      <button id="dlt-btn"><i class="fa-solid fa-trash"></i>Delete</button>
    </div>
  </div>

  <div id="dltTask-bg" class="blur-bg"></div>
  <div id="editTask-bg" class="blur-bg"></div>
  <div id="shareTask-bg" class="blur-bg"></div>
  <div id="recievedTask-bg"></div>
  <div id="s-menubar-bg"></div>
  <div id="l-menubar-bg"></div>  
`;