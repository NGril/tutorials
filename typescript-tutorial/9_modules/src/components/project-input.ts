import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { Validateable, validate } from "../util/validation.js";
import { Component } from "./base-component.js";


// project input class
// template HTML elements are not rendered by the browser, we select its content and insert it into the app div
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    // select the project-input
    // select element (form) as the first child of project input
    // insert the selected element (form) into the host element (app div)
    constructor() {
        super("project-input", "app", true, "user-input");

        // selecting appropriate inputs
        this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description")! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people")! as HTMLInputElement;

        this.configure(); // adding event listener to submit button
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler); // 'this' mess, solved with autobind decorator
    }

    renderContent() { }

    @Autobind // instead of calling .bind(this) when calling the method we used a decorator to autobind this when this method is referenced (not called, hence the 'get' in the decorator)
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidateable: Validateable = {
            value: enteredTitle,
            required: true,
        };

        const descriptionValidateable: Validateable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };

        const peopleValidateable: Validateable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };

        if (
            !validate(titleValidateable) ||
            !validate(descriptionValidateable) ||
            !validate(peopleValidateable)
        ) {
            console.log(enteredTitle, enteredDescription, +enteredPeople);
            alert("Invalid input, please try again!");
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
}

