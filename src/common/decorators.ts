type Func<T> = (...args: any[]) => Promise<T>;

export default class Decorators {
    static profiled<R>(func: Func<R>, ...args: Parameters<Func<R>>): Promise<R> {
        const start = performance.now();
        const promise = func(...args);
        promise.then((_) => console.log(`⚡ ${func.name} completed [${(performance.now() - start).toFixed(3)} ms]`));
        return promise;
    }
}
