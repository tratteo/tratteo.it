type AsyncFunc<T> = (...args: any[]) => Promise<T>;
type Func<T> = (...args: any[]) => T;

export default class Decorators {
    static profiledAsync<R>(func: AsyncFunc<R>, ...args: Parameters<AsyncFunc<R>>): Promise<R> {
        const start = performance.now();
        const promise = func(...args);
        promise.then((_) => console.log(`⚡ ${func.name} completed [${(performance.now() - start).toFixed(3)} ms]`));
        return promise;
    }
    static profiled<R>(func: Func<R>, ...args: Parameters<Func<R>>): R {
        const start = performance.now();
        const res = func(...args);
        console.log(`⚡ ${func.name} completed [${(performance.now() - start).toFixed(3)} ms]`);
        return res;
    }
}
