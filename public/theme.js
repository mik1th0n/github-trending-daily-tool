(() => {
  const THEME_KEY = 'github-trending-daily-tool:theme';
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const getStoredTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  };

  const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    const button = document.querySelector('#themeToggle');
    if (button) {
      button.textContent = theme === 'light' ? '切到深色' : '切到浅色';
    }
  };

  const existingNav = topbar.querySelector('.page-tabs');
  let rightZone = topbar.querySelector('.topbar-right');
  if (!rightZone && existingNav) {
    rightZone = document.createElement('div');
    rightZone.className = 'topbar-right';
    existingNav.replaceWith(rightZone);
    rightZone.appendChild(existingNav);
  }

  if (!rightZone || rightZone.querySelector('#themeToggle')) {
    applyTheme(getStoredTheme());
    return;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'themeToggle';
  button.className = 'theme-toggle';
  button.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
  rightZone.appendChild(button);
  applyTheme(getStoredTheme());
})();
