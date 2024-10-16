import { template } from "./template.js";
import { exportTask } from "./export.js";
import { importTask } from "./import.js";


function initTransfer() {
  exportTask.init();
  importTask.init();
}

export const transfer = {
  template: template,
  init: initTransfer,
};