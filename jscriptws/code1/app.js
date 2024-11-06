function parseAndCheck(values) {
    return values.map(value => {
        const parsedValue = parseInt(value);
        if (isNaN(parsedValue)) {
            return 0;
        }
        return parsedValue;
    });
}