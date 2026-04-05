
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    const templateEl = document.getElementById('project-input') as HTMLTemplateElement;
    if (templateEl) {
      this.templateElement = templateEl;
    } else {
      throw new Error('Template element #project-input not found');
    }

    const hostEl = document.getElementById('app') as HTMLDivElement;
    if (hostEl) {
      this.hostElement = hostEl;
    } else {
      throw new Error('Host element #app not found');
    }

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
