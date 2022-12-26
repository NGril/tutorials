/* 
- namespace example
- purely a TS feature
- to import a namespace to another file use the following syntax:
    /// <reference path="drag-drop-interfaces.ts"/>
- to be able to use the files from the namespace though we need to put other code inside a namespace of the same name
- also need to enable outFile in tsconfig to tell ts to bundle everything into one js file and set the module option from commonjs to amd
*/
namespace App {

    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    
    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    }

}