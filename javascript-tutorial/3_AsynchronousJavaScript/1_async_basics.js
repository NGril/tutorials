// 1. Basic example of asynchronous JS

const second = () => {
    setTimeout(() => {
        console.log('Async second');
    }, 2000);
}

const first = () => {
    console.log('First');
    second();
    console.log('End'); // the second function will be executed after 'End' is logged, non blocking async code
}
first();

// by using the setTimeout function we simulate some API calls to the server

///////////////////////////////////////////////////////////////////////////////////////////////////

// 2. understanding async JS, the event loop
/*
Async functions (callbacks), just like DOM events, aren't part of the JS engine. They rest in the Web APIs part of the JS runtime environment until they are ready to execute, at which point they go to the JS message queue where they wait the execution stack to be empty and only then do they actually execute.

The job of the event loop is to constantly monitor the execution stack and the JS message queue in order to push the events from the message queue to the execution stack when they are ready to be executed (when the execution stack is empty).
*/