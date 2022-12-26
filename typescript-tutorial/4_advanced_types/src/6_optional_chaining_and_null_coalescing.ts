// OPTIONAL CHAINING

const fetchedUserData = {
  id: 'u1',
  name: 'Niko',
  job: { title: 'CEO', description: 'My own company' }
};
console.log(fetchedUserData?.job?.title); // e.g. if we're not sure we'll get job data from the server

// NULLISH COALESCING

const userInput = null; // we get this from the server
const storedData = userInput ?? 'DEFAULT'; // if userInput is null or undefined fallback to default

console.log(storedData);