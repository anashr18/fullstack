class CounterGame {
    constructor(initialcount, btnelement) {
        this.initialCount = initialcount;
        this.btnElement = btnelement;
        this.btnElement.addEventListener('click', this.incrementcount.bind(this));
    }
    incrementcount() {
        this.initialCount++;
        console.log("Count incremented: " + this.initialCount);
        timer.start()
    }
}

btn = document.querySelector('#clickme')
const cnt = new CounterGame(0, btn)

const butters = {
    firstName: "Butters",
    lastName: "Cluckly",
    greet: function () {
        return `Hello ${this.firstName} ${this.lastName}`
    }
}

const fluffy = {
    firstName: "Fluffy",
    lastName: "Meowson",
}

function greetFluffy() {
    console.log(butters.greet.call(fluffy));
}

greetFluffy()

class Timer {
    constructor() {
        this.tick = 0;
        this.timerId = null;
    }

    start() {
        this.timerId = setInterval(() => {
            console.log(this.tick++);
            if (this.tick === 4) {
                this.stop();
            }
        }, 1000);
    }
    stop() {
        clearInterval(this.timerId);
    }
}

const timer = new Timer();
timer.start();