export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Fengið úr helper sýnidæmi úr fyrirlestri 10
export function el(name, className, ...children) {
  const element = document.createElement(name);
  element.classList.add(className);
  for (const child of children) { /* eslint-disable-line */
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
  return element;
}
