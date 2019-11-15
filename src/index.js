import List from './lib/list';
import { el } from './lib/helpers';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {

  } else {
    const list = new List();
    //for all children of buttons {
    //  if(button classname === button--active) {
    //    const name = button.name;
    //    if (fyrirlestur.type === name) {
    //      list.add (el('div', ...))
    //    }
    //  }
    //}
    list.load();
  }
});
