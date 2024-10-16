export const template = 
`
  <main class="main">
    <div class="export">
      <h2>Select Tasks to Export
        <i class="fa-solid fa-circle-info">
          <span class="tooltip">Dublicates will be removed durning export</span>
        </i>
      </h2>
      <ul class="tasks">
      </ul>

      <button class="export-selected disable">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"></path></svg>

        <span>export selected to json</span>
        <span data-total="0" class="count">
        </span>
      </button>

      <button class="export-all">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"></path></svg>

        <span>export all tasks to json</span>
      </button>
    </div>

    <div class="import">
      <h2>Import Tasks From JSON</h2>

      <div class="drop-file">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></svg>
        <span>Drop JSON file here to import tasks</span>
      </div>

      <label class="select-json-file">
        <input type="file">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></svg>

        <span>select json file</span>
      </label>

      <button class="import-from-clipboard">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-8.7 11.88c-.39.39-1.03.39-1.42 0l-2.17-2.17a.9959.9959 0 0 1 0-1.41l2.17-2.17c.39-.39 1.03-.39 1.42 0 .39.39.39 1.02 0 1.41L8.83 12l1.46 1.46c.39.39.4 1.03.01 1.42M12 4.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m1.7 10.63a.9959.9959 0 0 1 0-1.41L15.17 12l-1.47-1.47a.9959.9959 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.17 2.17c.39.39.39 1.02 0 1.41l-2.17 2.17c-.39.4-1.03.4-1.42.01"></path></svg>

        <span>Import json from clipboard</span>
      </button>

      <button class="import-from-link">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5"></path></svg>

        <span>Import from link</span>
      </button>
    </div>
  </main>
`;