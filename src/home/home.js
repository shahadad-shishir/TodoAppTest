import { template } from "./template.js";
import { tasks } from "./tasks.js";
import { homeHeader} from "./homeHeader.js";
import { progress } from "./progress.js";
import { ctgryFilter } from "./category-filter.js";
import { search } from "./search.js";
import { menubar } from "./menubar.js";
import { navigateTo } from "../route.js";
import { recievedTask } from "./recieved-task.js";

function initHome() {
  homeHeader.init();
  tasks.init();
  progress.init();
  search.init();
  ctgryFilter.init();
  menubar.init();

  if (location.pathname === '/share') {
    recievedTask.init();
    recievedTask.validateData();
  }

  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    navigateTo('/add-task');
  });
}

export const home = {
  template: template,
  header: homeHeader,
  init: initHome,
  render() {
    tasks.render();
    progress.handle();
    ctgryFilter.handle();
    search.clear();
  }
};


