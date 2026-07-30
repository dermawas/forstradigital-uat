// App name is still under discussion (SpendAware vs. monetr, etc.) — change it
// here and every page picks it up, instead of editing HTML in four places.
const APP_NAME = 'SpendAware';

document.title = document.title.split('{APP_NAME}').join(APP_NAME);
document.querySelectorAll('[data-app-name]').forEach((el) => {
  el.textContent = APP_NAME;
});
