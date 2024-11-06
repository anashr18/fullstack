class Example {
    static staticField = "I am static"; // Static field
    publicField = "I am public";        // Public field
    #privateField = "I am private";     // Private field (instance-specific)

    getPrivateField() {
        return this.#privateField;
    }
}

const instance = new Example();
console.log(instance.staticField); // "I am static" (access via class)
console.log(instance.publicField); // "I am public" (access via instance)
console.log(instance.getPrivateField()); // "I am private" (access via method)
