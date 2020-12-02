let status = false;

const gen1 = document.getElementById("gen1");
const progressGen1 = document.getElementById("progressGen1");
const gen2 = document.getElementById("gen2");
const progressGen2 = document.getElementById("progressGen2");
const gen3 = document.getElementById("gen3");
const progressGen3 = document.getElementById("progressGen3");
const gen4 = document.getElementById("gen4");
const progressGen4 = document.getElementById("progressGen4");

async function* gen(counter, progress) {
  counter.parentElement.classList.remove("init");
  let i = 0;
  while (i < 30) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    counter.innerText = ++i;
    progress.value = i;
    counter.parentElement.classList.add("active");
    if (status) {
      counter.parentElement.classList.remove("active");
      yield;
    }
  }
  counter.parentElement.classList.remove("active");
  counter.parentElement.classList.add("complete");
}

const iteratorQueue = [gen(gen1, progressGen1), gen(gen2, progressGen2), gen(gen3, progressGen3), gen(gen4, progressGen4)];
let iterator;

async function startGenerators() {
  while (iteratorQueue.length !== 0) {
    iterator = iteratorQueue.shift();
    const value = await iterator.next();
    if (!value.done) iteratorQueue.push(iterator);
    status = false;
  }
}

document.getElementById("start").addEventListener("click", function () {
  this.style.display = "none";
  startGenerators();
});

document.getElementById("yield").addEventListener("click", () => {
  status = true;
});
