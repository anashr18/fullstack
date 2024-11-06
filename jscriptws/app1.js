console.log("hellooo!!");
const pet = { species: "Dog", name: "Elton", age: "23" };

pet.age = 24;
spe = "species" // pet[spe]='Dog'

pet.newprop = "Labrador";
pet.bark = function () {
    console.log("Woof!");
    return "Woof!";
};

function getTriangleArea(base, height) {
    return (base * height) / 2;
}

function getTriangleHypotenuse(base, height) {
    return Math.sqrt(base ** 2 + height ** 2);
}

// pojo-mixing data and functions
let myTri = {
    base: 5,
    height: 8,
    getArea: function () { return (this.base * this.height) / 2 },
    getHypotenuse: function () { return Math.sqrt(this.base ** 2 + this.height ** 2) },
}

class Triangle {
    constructor(base, height) {
        this.base = base;
        this.height = height;
    }
    getArea = function () { return (this.base * this.height) / 2 };
    getHypotenuse = function () { return Math.sqrt(this.base ** 2 + this.height ** 2) };

}