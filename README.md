# generators-in-action

Working of multiple generators with the help of queue data structure where the one generator yields to trigger the next one in chain till the completion of all


## Core logic
```js
async function* gen(counter, progress) {
    while (true) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        if (status) {
            yield;
        }
    }
}

const iteratorQueue = [gen(), gen(), gen(), gen()];
let iterator;

async function startGenerators() {
    while (iteratorQueue.length !== 0) {
        iterator = iteratorQueue.shift();
        const value = await iterator.next();
        if (!value.done) {
            iteratorQueue.push(iterator);
        }
        status = false;
    }
}

// set status = true to yield the currently running generator
```
