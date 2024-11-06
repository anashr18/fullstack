class UserProfile {
    #name
    #email
    #birthdate
    constructor(name, email, birthdate) {
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
    }
    // Getter method to retrieve the user's name
    get name() {
        return this.#name;
    }
    set name(value) {
        if (typeof value != "string" || value === "") {
            throw new Error("Name must be a non-empty string");
        }
        this.#name = value;
    }
    get email() {
        return this.#email;
    }
    set email(value) {
        if (typeof value != "string" || !value.includes('@')) {
            throw new Error("Email must be a valid email-id");
        }
        this.#email = value;
    }
    get birthdate() {
        return this.#birthdate;
    }
    set birthdate(value) {
        if (!(value instanceof Date)) {
            throw new Error("Birthdate must be a valid Date object");
        }
        this.#birthdate = value;
    }
}

