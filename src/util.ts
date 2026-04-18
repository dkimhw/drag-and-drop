import { Validatable } from "./types";

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

export function validate(validatableInput: Validatable): boolean {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length > validatableInput.minLength;
  }

  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
  }  

  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value > validatableInput.min
  }

  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value < validatableInput.max
  }

  return isValid;
}