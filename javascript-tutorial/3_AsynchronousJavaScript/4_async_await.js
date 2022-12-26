// 4. async await
/*
Promises are a lot nicer and easier to understand than callbacks, but their consumption can be made even simpler. To achieve this ES8 (ES2017) introduced a new concept - async await. 

It's easier to understand because it looks like synchronous code we are all familiar with.
 */

// producing promises (same as previous lecture)
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

// consuming promises - async await
async function getRecipesAW() {
    const IDs = await getIDs(); // await waits until the promise is fulfilled (or rejected), it can only be used inside a function with the 'async' keyword
    console.log(IDs);

    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    
    const related = await getRelated('John');
    console.log(related);

    return recipe;
}
// const rec = getRecipesAW();
// console.log(rec);   
// these 2 lines above won't work because the code outside of the getRecipesAW function is ran synchronously, which means that the 'rec' value won't be evaluated in time, because at that time it is still being processed asynchronously in the background inside the getRecipesAW function

// an async function automatically returns a promise which needs to be consumed in order for it to work correctly
getRecipesAW().then(result => console.log(`Resolved result: ${result}`));