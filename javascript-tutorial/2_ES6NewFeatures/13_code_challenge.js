// CODING CHALLENGE
/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

class BasicElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends BasicElement {
    constructor(name, buildYear, numberOfTrees, area) {
        super(name, buildYear);
        this.numberOfTrees = numberOfTrees;
        this.area = area;
    }

    getTreeDensity() {
        return this.area === 0 ? 0 : this.numberOfTrees / this.area;
    }

    getAge() {
        return new Date().getFullYear() - this.buildYear;
    }
}

class Street extends BasicElement {
    constructor(name, buildYear, length, size = 'normal') {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}

function calculateAverageParkAge(parks) {
    let ageSum = 0;
    let parkAmount = 0;
    parks.forEach(park => {
        ageSum += park.getAge();
        parkAmount++;
    });
    return parkAmount === 0 ? 0 : ageSum / parkAmount;
}

function calculateTotalStreetLength(streets) {
    let length = 0;
    streets.forEach(street => length += street.length);
    return length;
}

function calculateAverageStreetLength(streets) {
    let totalLength = 0;
    let streetAmount = 0;
    streets.forEach(street => {
        totalLength += street.length;
        streetAmount++;
    });
    return streetAmount === 0 ? 0 : totalLength / streetAmount;
}

function createParkReport(parks) {
    console.log('--- PARK REPORT ---');

    parks.forEach(park =>
        console.log(`${park.name} has the tree density of ${park.getTreeDensity()} per square km.`)
    );

    parks.forEach(park => {
        if (park.numberOfTrees > 1000) {
            console.log(`${park.name} has more than 1000 trees`)
        }
    });

    console.log(`An average age of our ${parks.length} parks is ${calculateAverageParkAge(parks)}`);
}

function createStreetReport(streets) {
    console.log('--- STREET REPORT ---');

    streets.forEach(street =>
        console.log(`${street.name}, built in ${street.buildYear}, is a ${street.size} street.`)
    );

    console.log(`Our ${streets.length} streets have a total length of ${calculateTotalStreetLength(streets)} km, with the average length being ${calculateAverageStreetLength(streets)} km.`);
}

const parks = [
    new Park('Park Mladenaca', 1965, 567, 15),
    new Park('Bundek', 2007, 777, 65),
    new Park('Jarun', 1980, 1234, 121)
]

const streets = [
    new Street('Ilica', 1900, 30, 'huge'),
    new Street('Frankopanska', 1910, 10, 'big'),
    new Street('Gajeva', 1920, 5),
    new Street('Teslina', 1930, 2, 'small')
]

createParkReport(parks);
createStreetReport(streets);