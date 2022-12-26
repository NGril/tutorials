// autobind decorator
// read https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
export function Autobind(
    _target: any, // ignoring these 2 params with _
    _methodName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this); // 'this' here refers to whatever is responsible for triggering this getter method, meaning that it refers to any object calling this method
            return boundFn;
        },
    };
    return adjDescriptor;
}