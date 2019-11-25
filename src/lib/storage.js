const LOCALSTORAGE_KEY = 'finished_lectures';

export function loadFinished() {
  if (window.localStorage.getItem(LOCALSTORAGE_KEY)) {
    return window.localStorage.getItem(LOCALSTORAGE_KEY);
  }
  return [];
}

export function save(slug, isFinished) {
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
}
