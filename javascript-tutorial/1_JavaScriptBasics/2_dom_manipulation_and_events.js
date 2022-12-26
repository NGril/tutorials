/* 
---- DOM access and manipulation ----

DOM - document object model - an object oriented representation of the HTML document
We can manipulate the DOM with various methods, only the basics will be shown here.
*/

// method for selecting elements like we do it in css, it selects the first element found
var x = document.querySelector('.title1').textContent;
console.log(x);

// selecting by id
x = document.getElementById('title1_id').textContent;
console.log(x);

var y = 'JS Title';
document.querySelector('.title1').textContent = y;
document.querySelector('.title1').innerHTML = '<em>' + y + '</em>';
document.querySelector('.title1').style.color = 'green';

////////////////////////////////////////////////////////////////////////////////////////////////

/* 
---- Events and event handling ----

Events - notifications sent to notify the code that something happened on the web page (clicking a button, pressing a key...)
Event listener - a function that performs an action based on a specific event

An event is processed only when the execution stack is empty. 
Events are waiting in line in the JS message queue and are then put at the top of the execution stack.

Event reference: https://developer.mozilla.org/en-US/docs/Web/Events
*/
function callbackFn() {
    console.log('Button was clicked!');
}
document.querySelector('.button1').addEventListener('click', callbackFn);

// with anonymus function (doesn't have a name and can't be reused)
document.querySelector('.button1').addEventListener('click', function() {
    document.querySelector('.button1').textContent = 'I was clicked!';
    document.querySelector('.button1').style.backgroundColor = 'green';
});