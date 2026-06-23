(() => {
  const updateLabels = (isDark) => {
    document.querySelectorAll('[data-theme-label]').forEach((el) => {
      el.textContent = isDark ? 'Light mode' : 'Dark mode';
    });
  };

  const btns = document.querySelectorAll('[data-theme-toggle]');
  if (!btns.length) return;

  updateLabels(document.documentElement.getAttribute('data-theme') === 'dark');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      updateLabels(!isDark);
    });
  });
})();
