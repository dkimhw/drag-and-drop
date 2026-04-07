

export function getElement<T extends HTMLElement> (
  selector: string,
  type: new () => T,
  parent: HTMLElement | Document = document
): T {
  const element = parent.querySelector(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  if (!(element instanceof type)) {
    throw new Error(`${selector} is not a ${type.name}`);
  }

  return element
}
