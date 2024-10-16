export const template = 
`
  <main class="main">
    <div class="card">
      <h2 class="heading">Task: <span>Demo Task</span></h2>
      <table>
        <tbody>
          <tr id="emoji">
            <th>Emoji:</th>
            <td><i>none</i></td>
          </tr>
          <tr id="id">
            <th>ID:</th>
            <td></td>
          </tr>
          <tr id="description">
            <th>Description:</th>
            <td></td>
          </tr>
          <tr id="color">
            <th>Color:</th>
            <td>
              <!-- <span></span> #B624FF -->
            </td>
          </tr>
          <tr id="created">
            <th>Created:</th>
            <td></td>
          </tr>
          <tr id="deadline">
            <th>Task deadline:</th>
            <td></td>
          </tr>
          <tr id="done">
            <th>Done:</th>
            <td>
              <!-- <i class="fa-solid fa-check"></i> true -->
            </td>
          </tr>
          <tr id="pinned">
            <th>Pinned:</th>
            <td>
              <!-- <i class="fa-solid fa-xmark"></i>false -->
            </td>
          </tr>
          <tr id="category">
            <th>Category:</th>
            <td>
              <ul>
                <!-- <li>
                    <span class="emoji">🏢</span>
                    Home
                  </li> -->
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
`;