// THE 'unknown' TYPE
let userInputAny: any;
let userInputUnknown: unknown;
let userName: string;

userInputUnknown = 5;
userInputUnknown = 'Max';

userName = userInputAny;  // no compilation error because of any

// userName = userInputUnknown; // compilation error, can't assign an unknown valuue to string
if(typeof userInputUnknown === 'string') {
  userName = userInputUnknown;  // typescript detects type check, noice
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// THE 'never' TYPE
// When a function produces a value, but never actually returns it
function generateError(message: string, code: number): never {
  throw {
    message: message,
    errorCode: code
  };
}
generateError('An error occured', 500);