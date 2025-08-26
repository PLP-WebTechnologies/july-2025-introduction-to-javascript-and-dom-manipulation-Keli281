

// ---------- Part 1: Variables & Conditionals ----------
const ageInput = document.getElementById('ageInput');
const checkAgeBtn = document.getElementById('checkAgeBtn');
const ageResult = document.getElementById('ageResult');

checkAgeBtn.addEventListener('click', () => {
  // variable declaration and coercion handling
  const raw = ageInput.value.trim();
  // conditional: input validation
  if (raw === '') {
    ageResult.textContent = 'Please enter your age.';
    return;
  }

  const age = Number(raw);
  if (Number.isNaN(age) || age < 0) {
    ageResult.textContent = 'Enter a valid non-negative number for age.';
    return;
  }

  // conditional branching
  if (age < 13) {
    ageResult.textContent = 'You are a child.';
  } else if (age < 20) {
    ageResult.textContent = 'You are a teenager.';
  } else if (age < 65) {
    ageResult.textContent = 'You are an adult.';
  } else {
    ageResult.textContent = 'You are a senior adult.';
  }
});

// ---------- Part 2: Functions (>=2) ----------
// Function 1: parse a comma-separated list of numbers into an array of numbers
function parseNumberList(str) {
  if (!str) return [];
  return str
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(Number)
    .filter(n => !Number.isNaN(n));
}

// Function 2: calculate the sum and format the output
function calculateTotal(prices) {
  // use reduce to sum
  const total = prices.reduce((acc, val) => acc + val, 0);
  return {
    total,
    count: prices.length,
    formatted: `₵${total.toFixed(2)}` // currency-like formatting (adjust symbol as needed)
  };
}

const itemsInput = document.getElementById('itemsInput');
const calcTotalBtn = document.getElementById('calcTotalBtn');
const totalResult = document.getElementById('totalResult');

calcTotalBtn.addEventListener('click', () => {
  const raw = itemsInput.value;
  const numbers = parseNumberList(raw);

  if (numbers.length === 0) {
    totalResult.textContent = 'No valid numbers found. Enter values like: 4, 5.5, 10';
    return;
  }

  const { total, count, formatted } = calculateTotal(numbers);
  totalResult.textContent = `Items: ${count} — Total: ${formatted}`;
});

// ---------- Part 3: Loops (>=2) ----------
const generateListBtn = document.getElementById('generateListBtn');
const sampleList = document.getElementById('sampleList');

// Example loop 1: for loop to generate list items
generateListBtn.addEventListener('click', () => {
  // clear previous
  sampleList.innerHTML = '';

  // create a sample array using a for loop
  for (let i = 1; i <= 7; i++) {
    const li = document.createElement('li');
    li.textContent = `Sample item ${i}`;
    sampleList.appendChild(li);
  }
});

// Example loop 2: while loop for a countdown
const countdownBtn = document.getElementById('countdownBtn');
const countdownDisplay = document.getElementById('countdownDisplay');

countdownBtn.addEventListener('click', () => {
  let n = 5; // start value
  countdownDisplay.textContent = 'Countdown: ' + n;

  // run a synchronous visual countdown using setInterval to show changes
  const interval = setInterval(() => {
    n -= 1;
    if (n >= 0) {
      countdownDisplay.textContent = 'Countdown: ' + n;
    }
    if (n <= 0) {
      clearInterval(interval);
      countdownDisplay.textContent = 'YAY!';
    }
  }, 600); // 600ms between ticks
});


// ---------- Part 4: DOM Manipulation (>=3 interactions) ----------
// Interactions done here:
// 1) Toggle class on element (toggleThemeBtn)
// 2) Create and append elements (addItemBtn)
// 3) Clear generated content (clearOutputBtn)


const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const addItemBtn = document.getElementById('addItemBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');
const dynamicArea = document.getElementById('dynamicArea');
const dynamicMessage = document.getElementById('dynamicMessage');


// DOM Interaction 1: toggling a highlight class
toggleThemeBtn.addEventListener('click', () => {
dynamicArea.classList.toggle('highlight');
// read and write DOM: update text depending on state
const isOn = dynamicArea.classList.contains('highlight');
dynamicMessage.textContent = isOn ? 'Highlight is ON' : 'Highlight is OFF';
});


// DOM Interaction 2: create elements on the fly and append
let addedCount = 0;
addItemBtn.addEventListener('click', () => {
addedCount += 1;
const p = document.createElement('p');
p.textContent = `Dynamically added item #${addedCount}`;
p.setAttribute('data-added', String(addedCount));
dynamicArea.appendChild(p);
});


// DOM Interaction 3: clearing generated content (and simple loop to remove children)
clearOutputBtn.addEventListener('click', () => {
// remove all children except the original message
// while loop to remove nodes demonstrates another use of loops on DOM nodes
const children = Array.from(dynamicArea.children);
for (const node of children) {
// keep the original message paragraph
if (node.id === 'dynamicMessage') continue;
dynamicArea.removeChild(node);
}
// reset state
addedCount = 0;
dynamicMessage.textContent = 'This area will be updated by JavaScript.';
dynamicArea.classList.remove('highlight');
});


// ---------- Extra: small utility & demonstration of forEach ----------
// demonstrate forEach by listing parsed numbers from the itemsInput into console
calcTotalBtn.addEventListener('click', () => {
const numbers = parseNumberList(itemsInput.value);
// forEach loop example
numbers.forEach((num, idx) => {
console.log(`Item ${idx + 1}:`, num);
});
});
