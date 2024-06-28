function main() {
  console.log("test");
  var x = 10;
  console.log(x);
}

const test = (x, y) => {
  console.log(x + y);
};

function restoperator(first, ...args) {
  console.log(first);
  console.log(args);
}
// spread operator
const fruits1 = [32, 43, 66, 87, 09];
const fruits2 = [1132, 243, 366, 857, 509];

main();
test(76, 98);
restoperator(21, 3, 56, 654, 221);
fruits = [...fruits1, ...fruits2];
console.log(fruits);
