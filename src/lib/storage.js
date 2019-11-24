const LOCALSTORAGE_KEY = 'finished_lectures';

export function loadFinished() {
  console.log('Er í loadFinished');
  if (window.localStorage.getItem(LOCALSTORAGE_KEY)) {
    console.log(window.localStorage.getItem(LOCALSTORAGE_KEY));
    return window.localStorage.getItem(LOCALSTORAGE_KEY);
  }
  return [];
}

export function save(slug, isFinished) {
  console.log('Er í save');
  let saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
  if (!saved) {
    saved = [];
  }
  if (isFinished) {
    const index = saved.indexOf(slug);
    saved.splice(index, 1);
  } else {
    saved.push(slug);
  }
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
  console.log('Savaðir hlutir: ', window.localStorage.getItem(LOCALSTORAGE_KEY));
}