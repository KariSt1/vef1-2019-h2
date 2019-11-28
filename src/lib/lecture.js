import { el } from './helpers';
import { loadFinished, save } from './storage';

export default class Lecture {
  constructor() {
    this.page = document.querySelector('.lecture-page');
    this.section = document.querySelector('.lecture');
    this.url = 'lectures.json';
  }

  makeElement(element) {
    const div = el('div', 'element');
    let newElement;
    if (element.type === 'youtube') {
      newElement = el('iframe', 'element__youtube');
      newElement.setAttribute('src', element.data);
      newElement.setAttribute('allowfullscreen', true);
      newElement.setAttribute('frameborder', 0);
      div.classList.add('element--youtube');
    } else if (element.type === 'text') {
      newElement = el('div', 'element__texts');
      const paragraphs = element.data.split('\n');
      paragraphs.forEach((paragraph) => {
        const text = el('p', 'element__text', paragraph);
        newElement.appendChild(text);
      });
    } else if (element.type === 'quote') {
      const quote = el('p', 'element__quote', element.data);
      if(element.attribute) {
        const attribute = el('p', 'element__attribute', element.attribute);
        newElement = el('blockquote', 'element__blockquote', quote, attribute);
      } else {
        newElement = el('blockquote', 'element__blockquote', quote);
      }
      div.classList.add('element--quote');
    } else if (element.type === 'image') {
      const image = el('img', 'element__img');
      image.setAttribute('src', element.data);
      if(element.caption) {
        image.setAttribute('alt', element.caption);
        const caption = el('p', 'element__caption', element.caption);
        newElement = el('div', 'element__image', image, caption);
      } else {
        image.setAttribute('alt', '');
        newElement = el('div', 'element__image', image);
      }
    } else if (element.type === 'heading') {
      newElement = el('h2', 'element__heading', element.data);
    } else if (element.type === 'list') {
      newElement = el('ul', 'element__list');
      element.data.forEach((listItem) => {
        const item = el('li', 'element__listItem', listItem);
        newElement.appendChild(item);
      });
    } else {
      newElement = el('pre', 'element__code', element.data);
    }
    div.appendChild(newElement);
    return div;
  }

  makeHeader(data) {
    const text = el('p', 'header__text', data.category);
    const title = el('h2', 'header__title', data.title);
    const header = el('header', 'header', text, title);
    if (data.image) {
      header.style.background = `url(${data.image})`;
    }
    return header;
  }

  makeContent(data) {
    const content = el('div', 'lecture__content');
    data.content.forEach((element) => {
      content.appendChild(this.makeElement(element));
    });
    return content;
  }

  makeFooter(slug, isFinished) {
    let finish;
    if (!isFinished) {
      finish = el('button', 'footer__finish', 'Klára fyrirlestur');
    } else {
      finish = el('button', 'footer__finish', '✓ Fyrirlestur kláraður');
    }
    if (isFinished) {
      finish.classList.add('footer__finish--finished');
    }
    finish.addEventListener('click', this.makeFinished.bind(this, slug));
    const back = el('a', 'footer__back', 'Til baka');
    back.setAttribute('href', '/');
    const footer = el('footer', 'footer', finish, back);
    return footer;
  }

  makeFinished(slug, e) {
    const button = e.target;
    if (button.classList.contains('footer__finish--finished')) {
      button.textContent = 'Klára fyrirlestur';
      save(slug, true);
    } else {
      button.textContent = '✓ Fyrirlestur kláraður';
      save(slug, false);
    }
    button.classList.toggle('footer__finish--finished');
  }

  isFinished(slug) {
    const saved = loadFinished();
    if (saved.indexOf(slug) > -1) {
      return true;
    }
    return false;
  }

  displayLecture(data) {
    const row = el('div', 'lecture__row');
    this.page.prepend(this.makeHeader(data));
    row.appendChild(this.makeContent(data));
    this.page.appendChild(this.makeFooter(data.slug, this.isFinished(data.slug)));
    const container = el('div', 'lecture__container', row);
    this.section.appendChild(container);
  }

  getLectureData(slug) {
    return fetch(this.url)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Villa þegar reynt var að ná í fyrirlestra');
        }
        return result.json();
      })
      .then((data) => {
        const lecture = data.lectures.find(i => i.slug === slug);
        if (lecture) {
          return lecture;
        }
        throw new Error('Enginn fyrirlestur fannst');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  load() {
    const searchParams = new URLSearchParams(window.location.search);
    this.getLectureData(searchParams.get('slug'))
      .then((data) => {
        this.displayLecture(data);
      });
  }
}
