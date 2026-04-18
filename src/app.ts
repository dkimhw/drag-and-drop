import { getElement, validate } from './util.js';
import { Validatable } from "./types";

// Project List
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    this.templateElement = getElement('#project-list', HTMLTemplateElement);
    this.hostElement = getElement('#app', HTMLDivElement);

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    const ul = getElement('ul', HTMLUListElement, this.element);
    ul.id = listId;

    const h2 = getElement('h2', HTMLHeadingElement, this.element);
    h2.textContent = this.type.toUpperCase() + ' Projects';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }  
}


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

    this.titleInputElement = getElement('#title', HTMLInputElement, this.element);
    this.descriptionInputElement = getElement('#description', HTMLTextAreaElement, this.element);
    this.peopleInputElement = getElement('#people', HTMLInputElement, this.element);
    this.configure();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = Number(this.peopleInputElement.value);

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5
    };    

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      throw Error('Invalid inputs - please try again.');
    } else {
      return [enteredTitle, enteredDescription, enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const [title, description, people] = this.gatherUserInput();
    console.log(title, description, people);
    this.clearInputs();
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this))
  }
}



new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
