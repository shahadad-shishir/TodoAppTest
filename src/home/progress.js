import { taskData } from "../data.js";

let circle, percentEl, complete, completeMsg;

function initProgress() {
  circle = document.querySelector('.progress .draw-circle');
  percentEl = document.querySelector('.circle-container .number');
  complete = document.querySelector('.progress .details h3');
  completeMsg = document.querySelector('.progress .details p');

  handleProgress();
}

function handleProgress() {
  const totalTask = taskData.items.length;
  let doneTask = 0;
  taskData.items.forEach(task => {
    if (task.done) {
      doneTask += 1;
    }
  });

  const percent = (doneTask / totalTask) * 100;
  percentEl.innerText = Math.round(percent) + '%';

  drawCircle(percent);
  mngText(totalTask, doneTask, percent);
}

function drawCircle(percent) {
  const value = 234 - (234 * (percent / 100));
  requestAnimationFrame(() => {
    circle.style.strokeDashoffset = value;
  });
}

function mngText(totalTask, doneTask, percent) {
  if (doneTask == 0) {
    complete.innerText = `You have ${totalTask} tasks to complete.`;
    completeMsg.innerText = 'No tasks completed yet. Keep going!';
    return;
  } else {
    complete.innerText = `You've completed ${doneTask} out of ${totalTask} tasks.`;
  }

  if (doneTask == 1) {
    completeMsg.innerText = "You're just getting started.";
  } else if (doneTask == 2 || percent < 50) {
    completeMsg.innerText = "You're making good progress.";
  }

  if (percent == 50) {
    completeMsg.innerText = "You're halfway there! Keep it up!";
  } else if (percent > 50 && percent < 65) {
    completeMsg.innerText = "You're more than halfway there! Keep it up!";
  } else if (percent > 64 && percent != 100) {
    completeMsg.innerText = "You're almost there! Keep it up!";
  } else if (percent == 100) {
    completeMsg.innerText = "Congratulations! All tasks completed!";
  }
}

export const progress = {
  init: initProgress,
  handle: handleProgress,
};