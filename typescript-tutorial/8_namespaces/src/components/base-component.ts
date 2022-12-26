namespace App {

    // Component base class
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        hostElement: T;
        templateElement: HTMLTemplateElement;
        element: U;

        constructor(
            templateId: string,
            hostElementId: string,
            insertAtStart: boolean,
            newElementId?: string,
        ) {
            this.hostElement = document.getElementById(hostElementId)! as T;
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;

            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild as U;
            if (newElementId) {
                this.element.id = newElementId; // to add css
            }

            this.attach(insertAtStart);
        }

        private attach(insertAtStart: boolean) {
            this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend",
                this.element);
        }

        abstract configure(): void;
        abstract renderContent(): void;
    }

}