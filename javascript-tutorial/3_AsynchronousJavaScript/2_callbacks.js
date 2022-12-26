// 2. callbacks - old school async code

// for now we use setTimeout to simulate getting data from the server
// callback hell :)

function getRecipe() {
    setTimeout(() => {
        const recipeIDs = [324, 543, 654, 123];
        console.log(recipeIDs);

        setTimeout(id => {
            const recipe = {
                title: 'Fresh tomato pasta',
                publisher: 'John'
            };
            console.log(`Recipe id ${id}: ${recipe.title}`);

            setTimeout(publisher => {
                const recipe = {
                    title: 'Italian pizza',
                    publisher: 'John'
                };
                console.log(`Another recipe from ${publisher}: ${recipe.title}`);
            }, 1500, recipe.publisher);

        }, 1000, recipeIDs[2]);

    }, 1500);
}
getRecipe();