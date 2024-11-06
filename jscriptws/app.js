class Counter {
    constructor(startingNum, increment) {
        this.startingNum = startingNum;
        this.increment = increment;
    }
    // start() {
    //     setInterval(this.incrementandprint.bind(this), 100);
    // }
    // incrementandprint() {
    //     console.log(this)
    //     console.log(this.startingNum);
    //     this.startingNum += this.increment;
    // }
    startarrow() {
        setInterval(() => {
            console.log(this)
            console.log(this.startingNum);
            this.startingNum += this.increment;
        }, 100);
    }
}