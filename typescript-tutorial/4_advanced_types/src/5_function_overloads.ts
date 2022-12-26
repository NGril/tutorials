// FUNCTION OVERLOADS
// doesn't actually work well without union type, it's shit
type Combine = string | number;

function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: Combine, b: Combine) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}