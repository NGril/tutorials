// INDEX PROPERTIES

// used when we only know the type of properties we want, but don't know what they will be and how many of them do we need

interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a letter' }
  id: string;
  [prop: string]: string; // this means that all objects based on this one have to have properties of type string
}

const errorBag: ErrorContainer = {
  id: '123',
  email: 'Not a valid email',
  username: 'Must start with a letter'
};

