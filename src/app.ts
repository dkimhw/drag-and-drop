import { getElement } from './util.js';

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = getElement('#project-input', HTMLTemplateElement);
    this.hostElement = getElement('#app', HTMLDivElement);

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.attach();

    this.titleInputElement = getElement('#title', HTMLInputElement);
    this.descriptionInputElement = getElement('#description', HTMLTextAreaElement);
    this.peopleInputElement = getElement('#people', HTMLInputElement);

  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
console.log(projectInput);
