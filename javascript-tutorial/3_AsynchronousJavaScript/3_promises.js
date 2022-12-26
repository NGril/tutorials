// 3. promises
/*
Callbacks are ugly and hard to manage so ES6 introduced Promises.

Promises are objects which keep track about whether a certain (async) event has happened already or not. They also determine what happens after the event has happened. They implement the concept of a future value we're expecting.

Promise states:
    - pending -> before the event has happened
    - settled / resolved -> after the event has happened 
        - fulfilled - if the promise happened successfully
        - rejected - if the promise failed
*/

// producing promises
const getIDs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([324, 543, 654, 123]);    // in this case we don't need the reject function, this is always successful
        }, 1500);
    });
};

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            const recipe = {
                title: 'Fresh tomato pasta',
                publisher: 'John'
            };
            resolve(`Recipe id ${id}: ${recipe.title}`);
        }, 1500, recID);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {
                title: 'Italian pizza',
                publisher: 'John'
            };
            resolve(`Another recipe from ${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
};

// consuming promises
// then happens if the promise was successful, catch if it failed
getIDs()
    .then(IDs => {
        console.log(IDs);
        // getRecipe(IDs[2]).then(); bad way, we can chain it instead
        return getRecipe(IDs[2]);
    })
    .then(recipe => {
        console.log(recipe);
        return getRelated('John');  // here recipe.publisher won't work because we return a string and not an object from the promise, so we can't read the property because of it
    })
    .then(recipe => {
        console.log(recipe);
    })
    .catch(error => {
        console.log(error);
    });



