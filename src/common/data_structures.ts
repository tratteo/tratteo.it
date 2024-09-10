export function listGenerate<T>(length: number, generator: (i: number) => T): T[] {
    const list: T[] = [];
    for (let i = 0; i < length; i++) {
        list.push(generator(i));
    }
    return list;
}
