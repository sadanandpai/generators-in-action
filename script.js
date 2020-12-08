// status flag to yield a running generator
let status = false;

// Start generators
document.getElementById("start").addEventListener("click", function () {
  this.style.display = "none";
  startGenerators();
});

// Yield a generator
document.getElementById("yield").addEventListener("click", () => {
  status = true;
});

// Update the counter
function updateElementWithCount(element, value) {
  element.textContent = value;
  element.value = value;
}

function markStart(parentElement) {
  parentElement.classList.remove("init");
}

function markComplete(parentElement) {
  parentElement.classList.remove("active");
  parentElement.classList.add("complete");
}

function markActive(parentElement) {
  parentElement.classList.add("active");
}

function markInactive(parentElement) {
  parentElement.classList.remove("active");
}

/** Core logic starts here **/

// Generator for counter
async function* counterGenerator(counterElement, progressElement) {
  const parentElement = counterElement.parentElement;
  markStart(parentElement);

  let count = 0;
  while (count < 30) {
    markActive(parentElement);

    // delay by 0.4 secs
    await new Promise((resolve) => setTimeout(resolve, 400));
    count = count + 1;

    updateElementWithCount(counterElement, count);
    updateElementWithCount(progressElement, count);

    if (status) {
      markInactive(parentElement);
      yield;
    }
  }
  markComplete(parentElement);
}

// Iterator queue to execute in sequence
const iteratorQueue = [
  counterGenerator(document.getElementById("counter1"), document.getElementById("progress1")),
  counterGenerator(document.getElementById("counter2"), document.getElementById("progress2")),
  counterGenerator(document.getElementById("counter3"), document.getElementById("progress3")),
  counterGenerator(document.getElementById("counter4"), document.getElementById("progress4")),
];

// iterator will be executed and on yield will be moved to end of the queue
async function startGenerators() {
  while (iteratorQueue.length !== 0) {
    const iterator = iteratorQueue.shift();
    const value = await iterator.next();
    if (!value.done) {
      iteratorQueue.push(iterator);
    }
    status = false;
  }
}
