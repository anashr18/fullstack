class ArrayUtils {
    constructor() {
        throw new console.error('ArrayUtils can not be instantiated');
    }
    static max(arr) {
        if (arr.length === 0) {
            throw new Error('Array must not be empty');
        }
        return Math.max(...arr);
    }
    static average(arr) {
        return arr.reduce(
            (acc, curr) => acc + curr, 0)
            / arr.length;
    }

}
