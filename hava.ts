import fs from "fs";

const testData = './test_data/inarow.txt';

const data = fs.readFileSync(testData, "utf-8");
console.log(data);

const numbers = data.trim().split(/\s+/).map(Number);

// Function to emulate Scanner.nextInt()
function nextInt(): number | null {
  if (numbers.length > 0) {
    return numbers.shift() as unknown as number;
  } else {
    return null; // Return null when there are no more integers
  }
}

// Example usage
const num1 = nextInt();
const num2 = nextInt();

console.log("num 1: " + num1, "num 2: " + num2); // 1 2