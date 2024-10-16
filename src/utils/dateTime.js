export const dateTime = {
  formateDateTime(date) {
    const dateObj = {};
    const justDate = date.toLocaleDateString();
    const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    dateObj.date = justDate;
    dateObj.time = time;
    return dateObj;
  },

  getDay(date) {
    const today =  new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tommorow = new Date();
    tommorow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'yesterday';
    } else if (date.toDateString() === tommorow.toDateString()) {
      return 'tomorrow';
    } else {
      return undefined;
    }
  },

  getDaysDiff(date) {
    const today = new Date();
    const different = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return different;
  },

  getHoursDiff(date) {
    const today = new Date();
    const different = ((date.getTime() - today.getTime()) / (1000 * 60 * 60));
    return different;
  },

  getMinutesDiff(date) {
    const today = new Date();
    const different = ((date.getTime() - today.getTime()) / (1000 * 60));
    return different;
  },

  getWeekDay(date) {
    const day = date.toLocaleDateString(undefined, {weekday: 'long'});
    return day;
  },

  getRemainingHours() {
    const d = new Date();
    const h = d.getHours();
    const hours = 24 - h;
    return hours;
  },

  getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 5) {
        return "Good night!";
    } else if (hour >= 5 && hour < 12) {
        return "Good morning!";
    } else if (hour >= 12 && hour < 18) {
        return "Good afternoon!";
    } else if (hour >= 18 && hour < 23) {
        return "Good evening!";
    } else {
        return "Good night!";
    }
  },
};
