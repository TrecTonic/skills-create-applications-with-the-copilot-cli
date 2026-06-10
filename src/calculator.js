#!/usr/bin/env node

// Simple Node.js CLI Calculator
// Supported operations:
//  - add : addition (e.g., node calculator.js add 1 2 3)
//  - sub : subtraction (left-to-right, e.g., node calculator.js sub 10 3 2 -> 5)
//  - mul : multiplication (e.g., node calculator.js mul 2 3 4)
//  - div : division (left-to-right, division by zero is an error, e.g., node calculator.js div 12 3 2 -> 2)
// The script accepts either the named commands (add, sub, mul, div) OR the symbols (+, -, *, /).

function isNumberString(s) {
  return /^-?\d+(?:\.\d+)?$/.test(s);
}

function ensureNumbers(arr) {
  if (!Array.isArray(arr)) throw new Error('Operands must be an array');
  const nums = arr.map((s) => {
    if (typeof s === 'number') return s;
    if (typeof s === 'string' && isNumberString(s)) return Number(s);
    throw new Error(`Invalid number: ${s}`);
  });
  return nums;
}

function add(operands) {
  const nums = ensureNumbers(operands);
  return nums.reduce((a, b) => a + b, 0);
}

function mul(operands) {
  const nums = ensureNumbers(operands);
  return nums.reduce((a, b) => a * b, 1);
}

function sub(operands) {
  const nums = ensureNumbers(operands);
  if (nums.length === 0) throw new Error('sub requires at least one operand');
  if (nums.length === 1) return nums[0];
  return nums.slice(1).reduce((a, b) => a - b, nums[0]);
}

function div(operands) {
  const nums = ensureNumbers(operands);
  if (nums.length === 0) throw new Error('div requires at least one operand');
  if (nums.length === 1) return nums[0];
  return nums.slice(1).reduce((a, b) => {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }, nums[0]);
}

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

function normalizeOp(c) {
  if (!c) return null;
  switch (String(c).toLowerCase()) {
    case 'add': case '+': return 'add';
    case 'sub': case '-': return 'sub';
    case 'mul': case '*': case 'x': case '×': return 'mul';
    case 'div': case '/': case '÷': return 'div';
    default: return null;
  }
}

function runCLI(argv = process.argv) {
  const [,, cmd, ...args] = argv;
  if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
    printHelp();
    return 0;
  }
  const op = normalizeOp(cmd);
  if (!op) {
    console.error(`Unknown operation: ${cmd}\n`);
    printHelp();
    return 2;
  }
  if (args.length === 0) {
    console.error('Error: At least two numeric operands are required.\n');
    printHelp();
    return 2;
  }
  try {
    const nums = args.map((s) => {
      if (!isNumberString(s)) throw new Error(`Invalid number: ${s}`);
      return Number(s);
    });
    let result;
    if (op === 'add') result = add(nums);
    else if (op === 'mul') result = mul(nums);
    else if (op === 'sub') result = sub(nums);
    else if (op === 'div') result = div(nums);

    console.log(result);
    return 0;
  } catch (err) {
    console.error('Error:', err.message);
    return 3;
  }
}

if (require.main === module) {
  const code = runCLI(process.argv);
  process.exit(code);
}

module.exports = { add, sub, mul, div, runCLI, isNumberString };
