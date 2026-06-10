#!/usr/bin/env node

// Simple Node.js CLI Calculator
// Supported operations:
//  - add : addition (e.g., node calculator.js add 1 2 3)
//  - sub : subtraction (left-to-right, e.g., node calculator.js sub 10 3 2 -> 5)
//  - mul : multiplication (e.g., node calculator.js mul 2 3 4)
//  - div : division (left-to-right, division by zero is an error, e.g., node calculator.js div 12 3 2 -> 2)
// The script accepts either the named commands (add, sub, mul, div) OR the symbols (+, -, *, /).

const [,, cmd, ...args] = process.argv;

function printHelp() {
  console.log(`Usage:
  node src/calculator.js <operation> <num1> <num2> [<num3> ...]

Operations:
  add | +    : addition
  sub | -    : subtraction (left-to-right)
  mul | *    : multiplication
  div | /    : division (left-to-right)

Examples:
  node src/calculator.js add 2 3        -> 5
  node src/calculator.js mul 4 5 2      -> 40
  node src/calculator.js sub 10 3 2     -> 5
  node src/calculator.js div 12 3 2     -> 2
`);
}

function isNumberString(s) {
  return /^-?\d+(?:\.\d+)?$/.test(s);
}

if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
  printHelp();
  process.exit(0);
}

const op = (function normalize(c) {
  if (!c) return null;
  switch (c.toLowerCase()) {
    case 'add': case '+': return 'add';
    case 'sub': case '-': return 'sub';
    case 'mul': case '*': case 'x': case '×': return 'mul';
    case 'div': case '/': case '÷': return 'div';
    default: return null;
  }
})(cmd);

if (!op) {
  console.error(`Unknown operation: ${cmd}\n`);
  printHelp();
  process.exit(2);
}

if (args.length === 0) {
  console.error('Error: At least two numeric operands are required.\n');
  printHelp();
  process.exit(2);
}

const nums = args.map((s) => {
  if (!isNumberString(s)) {
    console.error(`Invalid number: ${s}`);
    process.exit(2);
  }
  return Number(s);
});

let result;
try {
  if (op === 'add') {
    result = nums.reduce((a, b) => a + b, 0);
  } else if (op === 'mul') {
    result = nums.reduce((a, b) => a * b, 1);
  } else if (op === 'sub') {
    if (nums.length < 1) throw new Error('sub requires at least one operand');
    result = nums.slice(1).reduce((a, b) => a - b, nums[0]);
  } else if (op === 'div') {
    if (nums.length < 1) throw new Error('div requires at least one operand');
    result = nums.slice(1).reduce((a, b) => {
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    }, nums[0]);
  }
} catch (err) {
  console.error('Error:', err.message);
  process.exit(3);
}

// Print result. If integer, print without trailing .0
if (Number.isInteger(result)) console.log(result);
else console.log(result);

module.exports = { /* exported for testing if needed */ };
