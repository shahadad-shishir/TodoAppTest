import { navigateTo } from "./route.js";
import { header } from "./header.js";
import { navbar } from "./navbar.js";
import { sidebar } from "./sidebar.js";
import { popup } from "./utils/popup.js";
import { theme } from "./profile/theme.js";
import { userData } from "./data.js";

theme.cngAppTheme(userData.theme);
header.init();
navbar.init();
sidebar.init();
popup.init();

navigateTo(location.pathname);

window.addEventListener('popstate', () => {
  navigateTo(location.pathname);
});
