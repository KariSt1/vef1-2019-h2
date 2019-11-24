import { el, empty } from './helpers';
import { loadFinished } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list__container');
    this.buttons = document.querySelectorAll('.buttons__button');
    this.url = 'lectures.json';
  }

  getLectures() {
    fetch(this.url)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Villa þegar reynt var að ná í fyrirlestra');
        }
        return result.json();
      })
      .then(data => this.getFinishedLectures(data.lectures))
      .then(data => this.getActiveLectures(data))
      .then(data => this.makeLectures(data))
      .catch((error) => {
        console.error(error);
      });
  }

  getActiveLectures(data) {
    const activeButtons = [];
    this.buttons.forEach((button) => {
      if(button.classList.contains('buttons__button--active')) {
        activeButtons.push(button.id);
      }
    });
    return data.filter(i => activeButtons.length === 0 || activeButtons.indexOf(i.category) >= 0);
  }

  showLectures(...lectures) {
    empty(this.container);
    lectures.forEach((lecture) => {
      if(typeof item === 'string') {
        this.container.appendChild(document.createTextNode(lecture));
      } 
      else {
        this.container.appendChild(lecture);
      }
    });
  }

  createElement(lecture) {
    const title = el('p', lecture.title);
    title.classList.add('listLecture__title');

    const category = el('h2', lecture.category);
    category.classList.add('listLecture__category');

    const text = el('div', category, title);
    text.classList.add('listLecture__text');

    const bottom = el('div', text);
    bottom.classList.add('listLecture__bottom');

    // Bæta við ef búið er að klára fyrirlestur
    if (lecture.finished) {
      const finished = el('div', '✓');
      finished.classList.add('listLecture__finished');
      bottom.appendChild(finished);
    }

    const thumbnail = el('div');;
    thumbnail.classList.add('listLecture__image');

    if(lecture.thumbnail) {
      const image = el('img');
      image.setAttribute('src', lecture.thumbnail);
      image.setAttribute('alt', '');
      thumbnail.appendChild(image);
    }

    const item = el('a', bottom, thumbnail);
    item.classList.add('listLecture');
    item.setAttribute('href', `fyrirlestur.html?slug=${lecture.slug}`);
    return item;
  }

  makeLectures(data) {
    const items = data.map((lecture) => {
      const col = el('div', this.createElement(lecture));
      col.classList.add('list__col');
      return col;
    })

    const row = el('div', ...items);
    row.classList.add('list__row');

    this.showLectures(row);
  }

  getFinishedLectures(data) {
    const saved = loadFinished();
    return data.map((i) => {
      i.finished = saved.indexOf(i.slug) > -1; /* eslint-disable-line */
      return i;
    });
  }

  toggleActiveButtons(e) {
    const { target } = e;

    target.classList.toggle('buttons__button--active');
    this.getLectures();
  }

  setupActiveButtons() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', this.toggleActiveButtons.bind(this));
    });
  }

  load() {
    empty(this.container);
    this.getLectures();

    this.setupActiveButtons();
  }
}
