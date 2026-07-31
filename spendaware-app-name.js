// App name decided 2026-07-31: Ledgerize (was SpendAware, briefly monetr).
// Change it here and every page picks it up, instead of editing HTML in
// four places.
const APP_NAME = 'Ledgerize';

document.title = document.title.split('{APP_NAME}').join(APP_NAME);
document.querySelectorAll('[data-app-name]').forEach((el) => {
  el.textContent = APP_NAME;
});
