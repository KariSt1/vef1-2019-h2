import { el } from './helpers';
import { loadFinished, save } from './storage';

export default class Lecture {
  constructor() {
    this.page = document.querySelector('.lecture-page');
    this.section = document.querySelector('.lecture');
    this.url = 'lectures.json';
  }

  makeElement(element) {
    const div = el('div');
    div.classList.add('element');
    let newElement;
    if (element.type === 'youtube') {
      newElement = el('iframe');
      newElement.classList.add('element__youtube');
      newElement.setAttribute('src', element.data);
      newElement.setAttribute('allowfullscreen', true);
      newElement.setAttribute('frameborder', 0);
      div.classList.add('element--youtube');
    } else if (element.type === 'text') {
      newElement = el('div');
      newElement.classList.add('element__texts');
      const paragraphs = element.data.split('\n');
      paragraphs.forEach((paragraph) => {
        const text = el('p', paragraph);
        text.classList.add('element__text');
        newElement.appendChild(text);
      });
      newElement.appendChild(document.createTextNode(element.data));
    } else if (element.type === 'quote') {
      const quote = el('p');
      quote.appendChild(document.createTextNode(element.data));
      quote.classList.add('element__quote');
      const attribute = el('p');
      attribute.appendChild(document.createTextNode(element.attribute));
      attribute.classList.add('element__attribute');
      newElement = el('blockquote', quote, attribute);
      newElement.classList.add('element__blockquote');
      div.classList.add('element--quote');
    } else if (element.type === 'image') {
      const image = el('img');
      image.classList.add('element__img');
      image.setAttribute('src', element.data);
      image.setAttribute('alt', element.caption);
      const caption = el('p');
      caption.classList.add('element__caption');
      caption.appendChild(document.createTextNode(element.caption));
      newElement = el('div', image, caption);
      newElement.classList.add('element__image');
    } else if (element.type === 'heading') {
      newElement = el('h2');
      newElement.classList.add('element__heading');
      newElement.appendChild(document.createTextNode(element.data));
    } else if (element.type === 'list') {
      newElement = el('ul');
      newElement.classList.add('element__list');
      element.data.forEach((listItem) => {
        const item = el('li', document.createTextNode(listItem));
        item.classList.add('element__listItem');
        newElement.appendChild(item);
      });
    } else {
      newElement = el('pre', element.data);
      newElement.classList.add('element__code');
    }
    div.appendChild(newElement);
    return div;
  }

  makeHeader(data) {
    const text = el('p');
    text.appendChild(document.createTextNode(data.category));
    text.classList.add('header__text');
    const title = el('h2');
    title.appendChild(document.createTextNode(data.title));
    title.classList.add('header__title');
    const header = el('header', text, title);
    header.classList.add('header');
    if (data.image) {
      header.style.background = `url(${data.image})`;
    }
    return header;
  }

  makeContent(data) {
    const content = el('div');
    data.content.forEach((element) => {
      content.classList.add('lecture__content');
      content.appendChild(this.makeElement(element));
    });
    return content;
  }

  makeFooter(slug, isFinished) {
    let finish;
    if (!isFinished) {
      finish = el('button', 'Klára fyrirlestur');
    } else {
      finish = el('button', '✓ Fyrirlestur kláraður');
    }
    finish.classList.add('footer__finish');
    if (isFinished) {
      finish.classList.add('footer__finish--finished');
    }
    finish.addEventListener('click', this.makeFinished.bind(this, slug));
    const back = el('a', 'Til baka');
    back.classList.add('footer__back');
    back.setAttribute('href', '/');
    const footer = el('footer', finish, back);
    footer.classList.add('footer');
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
    const row = el('div');
    row.classList.add('lecture__row');
    this.page.prepend(this.makeHeader(data));
    row.appendChild(this.makeContent(data));
    this.page.appendChild(this.makeFooter(data.slug, this.isFinished(data.slug)));
    const container = el('div');
    container.classList.add('lecture__container');
    container.appendChild(row);
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
