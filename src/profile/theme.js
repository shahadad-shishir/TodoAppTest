import { userData } from "../data.js";

export const theme = {
  themes: [
    { 
      //Stystem theme (default)
      primary: '237, 238, 246',
      secondary: '182, 36, 255',
      mode: 'light',
    },
    {
      primary: '35, 46, 88',
      secondary: '182, 36, 255',
      mode: 'dark',
    },  
    {
      primary: '237, 238, 246',
      secondary: '126, 48, 225',
      mode: 'light',
    },
    {
      primary: '35, 46, 88',
      secondary: '42, 147, 213',
      mode: 'dark',
    },
    {
      primary: '224, 247, 250',
      secondary: '38, 198, 218',
      mode: 'light',
    },
    {
      primary: '35, 46, 88',
      secondary: '229, 54, 154',
      mode: 'dark',
    },
    {
      primary: '252, 228, 236',
      secondary: '236, 64, 122',
      mode: 'light',
    },
    {
      primary: '255, 148, 209',
      secondary: '255, 0, 144',
      mode: 'light',
    },
    {
      primary: '253, 240, 213',
      secondary: '225, 76, 148',
      mode: 'light',
    },
    {
      primary: '13, 13, 13',
      secondary: '255, 86, 49',
      mode: 'dark',
    },
    {
      primary: '246, 246, 246',
      secondary: '242, 110, 86',
      mode: 'light',
    },
    {
      primary: '1, 25, 38',
      secondary: '0, 233, 82',
      mode: 'dark',
    },
  ],

  mode: {
    light: {
      text: '16, 23, 39',
      bg: '255, 255, 255',
      bg1: '140, 145, 156',
      bg2: '217, 217, 217',
      bg3: '215, 215, 215',
      inptBrdr: '0, 0, 0, 0.23',
      hover: '0, 0, 0, 0.04',
      popup: '240, 240, 245, 0.58',
      scrollTrack: '0, 0, 0, 0.082',
      scrollThumb: '0, 0, 0, 0.19',
      scrollHover: '0, 0, 0, 0.25',
    },

    dark: {
      text: '240, 240, 240',
      bg: '56, 56, 56',
      bg1: '94, 94, 101',
      bg2: '80, 80, 80',
      bg3: '31, 31, 31',
      inptBrdr: '255, 255, 255, 0.23',
      hover: '255, 255, 255, 0.08',
      popup: '20, 20, 49, 0.88',
      scrollTrack: '240, 240, 240, 0.082',
      scrollThumb: '240, 240, 240, 0.19',
      scrollHover: '240, 240, 240, 0.25',
    }
  },

  init() {
    this.themesUl = document.querySelector('ul.themes');
    this.render();
    //select pre-selected theme from user data
    this.select(userData.theme);
  },

  render() {
    this.themes.forEach((theme, id) => {
      const primary = theme.primary;
      const secondary = theme.secondary;

      const li = document.createElement('li');
      li.dataset.id = id;
      li.dataset.selected = 'false';

      if (id === 0) {
        li.innerHTML = 
        `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2m-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1"></path></svg>
        <span class="tooltip">System (light)</span>
        `;
      } else {
        li.style.background = `linear-gradient(135deg, rgb(${secondary}) 50%, rgb(${primary}) 50%)`;

        li.onmouseover = () => {
          li.style.boxShadow = `rgb(${secondary}) 0px 0px 12px`;
        }
        li.onmouseout = () => {
          li.style.boxShadow = '';
        }
      }

      this.themesUl.appendChild(li);

      li.addEventListener('click', () => {
        if (li.dataset.selected === 'true') {
          return;
        } else {
          this.select(id);
        }
      });
    });
  },

  select(themeId) {
    //Unselect previous theme if exist
    const preSelected = this.themesUl.querySelector('li[data-selected="true"');
    if (preSelected) {
      preSelected.dataset.selected = 'false';
      preSelected.querySelector('.check-icon').remove();
      preSelected.style.border = '';
    }
    
    //Select new theme
    const li = this.themesUl.querySelector(`li[data-id="${themeId}"]`);
    const secondary = this.themes[themeId].secondary;

    li.dataset.selected = 'true';
    const checkIcon = document.createElement('span');
    checkIcon.classList.add('check-icon');
    checkIcon.innerHTML = '<i class="fa-solid fa-check"></i>';

    if (themeId !== 0) {
      li.style.border = `4px solid rgb(${secondary})`;
    }

    li.appendChild(checkIcon);
    userData.cngTheme(themeId);
    this.cngAppTheme(themeId);
  },

  cngAppTheme(themeId) {
    //inserting color variables of this theme dynamically
    const {primary, secondary, mode} = this.themes[themeId];
    const {text, bg, bg1, bg2, bg3, inptBrdr, hover, popup, scrollTrack, scrollThumb, scrollHover} = this.mode[mode];

    const style = document.querySelector('style#theme');
    style.innerHTML =
    `
      :root {
        --primary: rgb(${primary});
        --primary-min8: rgba(${primary}, 0.8);
        --secondary: rgb(${secondary}); 
        --secondary-min0: rgba(${secondary}, 0);
        --secondary-min1: rgba(${secondary}, 0.1);
        --secondary-min2: rgba(${secondary}, 0.2);
        --secondary-min3: rgba(${secondary}, 0.3);
        --secondary-min4: rgba(${secondary}, 0.4);
        --secondary-min5: rgba(${secondary}, 0.5);
        --secondary-min6: rgba(${secondary}, 0.6);
        --secondary-min7: rgba(${secondary}, 0.7);
        --secondary-min8: rgba(${secondary}, 0.8);
        --secondary-min9: rgba(${secondary}, 0.9);
        --text: rgb(${text});
        --text-min1: rgba(${text}, 0.1);
        --text-min6: rgba(${text}, 0.6);
        --text-min7: rgba(${text}, 0.7);
        --bg: rgb(${bg});
        --bg-min7: rgba(${bg}, 0.7);
        --bg1: rgb(${bg1});
        --bg2: rgb(${bg2});
        --bg3: rgb(${bg3});
        --bg3-min7: rgba(${bg3}, 0.7);
        --input-brdr: rgb(${inptBrdr});
        --hover: rgb(${hover});
        --popup: rgb(${popup});
        --scrollTrack: rgb(${scrollTrack});
        --scrollThumb: rgb(${scrollThumb});
        --scrollHover: rgb(${scrollHover});
      }
    `
  },
};