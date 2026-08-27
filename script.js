/* =========================================================
   ALGORITHM ARENA
   Vanilla JavaScript
========================================================= */


/* =========================================================
   STATE
========================================================= */

let array = [];
let bars = [];

let isPlaying = false;
let isPaused = false;
let stopRequested = false;

let speedMs = 40;

let currentAlgo = "bubble";

let comparisonCount = 0;
let swapCount = 0;
let stepCount = 0;


/* =========================================================
   DOM
========================================================= */

const barsContainer = document.getElementById("barsContainer");

const statusText = document.getElementById("statusText");
const stepText = document.getElementById("stepText");

const searchTargetWrap =
    document.getElementById("searchTargetWrap");

const searchTargetVal =
    document.getElementById("searchTargetVal");

const playBtn =
    document.getElementById("playBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const sizeSlider =
    document.getElementById("sizeSlider");

const speedSlider =
    document.getElementById("speedSlider");

const sizeVal =
    document.getElementById("sizeVal");

const speedVal =
    document.getElementById("speedVal");

const cTime =
    document.getElementById("cTime");

const cSpace =
    document.getElementById("cSpace");

const visualizationTitle =
    document.getElementById("visualizationTitle");

const infoType =
    document.getElementById("infoType");

const infoTitle =
    document.getElementById("infoTitle");

const infoDesc =
    document.getElementById("infoDesc");

const bestCase =
    document.getElementById("bestCase");

const averageCase =
    document.getElementById("averageCase");

const worstCase =
    document.getElementById("worstCase");

const detailSpace =
    document.getElementById("detailSpace");

const stable =
    document.getElementById("stable");

const howItWorks =
    document.getElementById("howItWorks");

const arrayDisplay =
    document.getElementById("arrayDisplay");

const elementCount =
    document.getElementById("elementCount");

const comparisonCountEl =
    document.getElementById("comparisonCount");

const swapCountEl =
    document.getElementById("swapCount");


/* =========================================================
   ALGORITHM INFORMATION
========================================================= */

const ALGO_META = {

    bubble: {
        name: "Bubble Sort",
        type: "sort",

        time: "O(n²)",
        space: "O(1)",

        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",

        stable: "Yes",

        desc:
            "Repeatedly compares adjacent elements and swaps them when they are in the wrong order.",

        how:
            "Bubble Sort compares neighboring elements. After every pass, the largest unsorted element moves toward the end of the array."
    },


    selection: {
        name: "Selection Sort",
        type: "sort",

        time: "O(n²)",
        space: "O(1)",

        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",

        stable: "No",

        desc:
            "Finds the smallest element in the unsorted portion and places it at the beginning.",

        how:
            "Selection Sort divides the array into sorted and unsorted portions. It repeatedly finds the minimum value and swaps it into the next position."
    },


    insertion: {
        name: "Insertion Sort",
        type: "sort",

        time: "O(n²)",
        space: "O(1)",

        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",

        stable: "Yes",

        desc:
            "Builds the sorted portion one element at a time by inserting each value into its correct position.",

        how:
            "Insertion Sort takes one element at a time and moves it left until it reaches the correct position among the already sorted elements."
    },


    merge: {
        name: "Merge Sort",
        type: "sort",

        time: "O(n log n)",
        space: "O(n)",

        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",

        stable: "Yes",

        desc:
            "Divides the array into smaller halves, sorts them, and merges the sorted halves together.",

        how:
            "Merge Sort uses divide and conquer. It repeatedly splits the array into halves and then merges those halves in sorted order."
    },


    quick: {
        name: "Quick Sort",
        type: "sort",

        time: "O(n log n)",
        space: "O(log n)",

        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",

        stable: "No",

        desc:
            "Chooses a pivot and partitions the array so smaller elements go left and larger elements go right.",

        how:
            "Quick Sort selects a pivot, partitions the array around it, and recursively sorts the two resulting sections."
    },


    heap: {
        name: "Heap Sort",
        type: "sort",

        time: "O(n log n)",
        space: "O(1)",

        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",

        stable: "No",

        desc:
            "Builds a heap and repeatedly moves the largest element to its final position.",

        how:
            "Heap Sort first creates a max heap. It then repeatedly removes the largest value and places it at the end of the array."
    },


    linear: {
        name: "Linear Search",
        type: "search",

        time: "O(n)",
        space: "O(1)",

        best: "O(1)",
        average: "O(n)",
        worst: "O(n)",

        stable: "—",

        desc:
            "Checks every element from left to right until the target is found or the array ends.",

        how:
            "Linear Search starts at the first element and checks each value one by one until it finds the target."
    },


    binary: {
        name: "Binary Search",
        type: "search",

        time: "O(log n)",
        space: "O(1)",

        best: "O(1)",
        average: "O(log n)",
        worst: "O(log n)",

        stable: "—",

        desc:
            "Searches a sorted array by repeatedly dividing the search range in half.",

        how:
            "Binary Search checks the middle element. If the target is smaller, it searches the left half; otherwise it searches the right half."
    }

};


/* =========================================================
   SPEED
========================================================= */

const SPEED_LABELS = {
    1: "Slowest",
    2: "Slow",
    3: "Normal",
    4: "Fast",
    5: "Fastest"
};

const SPEED_MS = {
    1: 140,
    2: 80,
    3: 40,
    4: 18,
    5: 6
};


/* =========================================================
   ARRAY
========================================================= */

function generateArray(size) {

    array = Array.from(
        { length: size },
        () => Math.floor(Math.random() * 94) + 6
    );

    resetCounters();

    renderBars();

    updateArrayInfo();
}


function renderBars() {

    barsContainer.innerHTML = "";

    bars = array.map((value) => {

        const bar = document.createElement("div");

        bar.className = "bar";

        bar.style.height = `${value}%`;

        bar.dataset.value = value;

        barsContainer.appendChild(bar);

        return bar;
    });
}


function updateBar(index) {

    if (!bars[index]) return;

    bars[index].style.height =
        `${array[index]}%`;

    bars[index].dataset.value =
        array[index];
}


/* =========================================================
   COUNTERS
========================================================= */

function resetCounters() {

    comparisonCount = 0;
    swapCount = 0;
    stepCount = 0;

    updateCounters();
}


function addComparison() {

    comparisonCount++;

    updateCounters();
}


function addSwap() {

    swapCount++;

    updateCounters();
}


function nextStep() {

    stepCount++;

    stepText.textContent =
        `Step ${stepCount}`;
}


function updateCounters() {

    comparisonCountEl.textContent =
        comparisonCount;

    swapCountEl.textContent =
        swapCount;
}


/* =========================================================
   ARRAY INFO
========================================================= */

function updateArrayInfo() {

    arrayDisplay.textContent =
        `[${array.join(", ")}]`;

    elementCount.textContent =
        array.length;
}


/* =========================================================
   BAR STATES
========================================================= */

function clearBarStates() {

    bars.forEach(bar => {

        bar.classList.remove(
            "compare",
            "pivot",
            "sorted",
            "found",
            "discarded"
        );
    });
}


/* =========================================================
   HELPERS
========================================================= */

function setStatus(message) {

    statusText.textContent =
        message;
}


function sleep(ms) {

    return new Promise(resolve => {

        const check = () => {

            if (stopRequested) {
                resolve();
                return;
            }

            if (isPaused) {
                setTimeout(check, 60);
                return;
            }

            setTimeout(resolve, ms);
        };

        check();
    });
}


function swap(i, j) {

    [array[i], array[j]] =
        [array[j], array[i]];

    updateBar(i);
    updateBar(j);

    addSwap();
}


/* =========================================================
   BUBBLE SORT
========================================================= */

async function bubbleSort() {

    const n = array.length;

    for (
        let i = 0;
        i < n - 1 && !stopRequested;
        i++
    ) {

        let swapped = false;

        for (
            let j = 0;
            j < n - i - 1 && !stopRequested;
            j++
        ) {

            bars[j].classList.add("compare");
            bars[j + 1].classList.add("compare");

            setStatus(
                `Comparing index ${j} and ${j + 1}`
            );

            addComparison();
            nextStep();

            await sleep(speedMs);

            if (array[j] > array[j + 1]) {

                swap(j, j + 1);

                swapped = true;
            }

            bars[j].classList.remove("compare");
            bars[j + 1].classList.remove("compare");
        }

        bars[n - i - 1].classList.add("sorted");

        if (!swapped) break;
    }

    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* =========================================================
   SELECTION SORT
========================================================= */

async function selectionSort() {

    const n = array.length;

    for (
        let i = 0;
        i < n - 1 && !stopRequested;
        i++
    ) {

        let minIndex = i;

        bars[minIndex].classList.add("pivot");

        for (
            let j = i + 1;
            j < n && !stopRequested;
            j++
        ) {

            bars[j].classList.add("compare");

            setStatus(
                `Finding minimum — checking index ${j}`
            );

            addComparison();
            nextStep();

            await sleep(speedMs);

            if (array[j] < array[minIndex]) {

                bars[minIndex]
                    .classList.remove("pivot");

                minIndex = j;

                bars[minIndex]
                    .classList.add("pivot");
            }

            bars[j].classList.remove("compare");
        }

        if (minIndex !== i) {

            swap(i, minIndex);
        }

        bars[minIndex]
            .classList.remove("pivot");

        bars[i]
            .classList.add("sorted");
    }

    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* =========================================================
   INSERTION SORT
========================================================= */

async function insertionSort() {

    const n = array.length;

    if (n === 0) return;

    bars[0].classList.add("sorted");

    for (
        let i = 1;
        i < n && !stopRequested;
        i++
    ) {

        const key = array[i];

        bars[i].classList.add("pivot");

        setStatus(
            `Inserting value ${key} at index ${i}`
        );

        nextStep();

        await sleep(speedMs);

        let j = i - 1;

        while (
            j >= 0 &&
            array[j] > key &&
            !stopRequested
        ) {

            addComparison();

            bars[j].classList.add("compare");

            array[j + 1] = array[j];

            updateBar(j + 1);

            addSwap();

            await sleep(speedMs);

            bars[j].classList.remove("compare");

            j--;
        }

        if (j >= 0) {
            addComparison();
        }

        array[j + 1] = key;

        updateBar(j + 1);

        bars[i].classList.remove("pivot");

        for (
            let k = 0;
            k <= i;
            k++
        ) {
            bars[k].classList.add("sorted");
        }
    }

    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* =========================================================
   MERGE SORT
========================================================= */

async function mergeSort() {

    async function merge(left, mid, right) {

        const leftPart =
            array.slice(left, mid + 1);

        const rightPart =
            array.slice(mid + 1, right + 1);

        let i = 0;
        let j = 0;
        let k = left;

        while (
            i < leftPart.length &&
            j < rightPart.length &&
            !stopRequested
        ) {

            bars[k].classList.add("compare");

            setStatus(
                `Merging range [${left}, ${right}]`
            );

            addComparison();
            nextStep();

            await sleep(speedMs);

            if (
                leftPart[i] <= rightPart[j]
            ) {

                array[k] = leftPart[i++];

            } else {

                array[k] = rightPart[j++];
            }

            updateBar(k);

            bars[k].classList.remove("compare");

            k++;
        }


        while (
            i < leftPart.length &&
            !stopRequested
        ) {

            array[k] =
                leftPart[i++];

            updateBar(k);

            bars[k].classList.add("compare");

            await sleep(speedMs / 2);

            bars[k].classList.remove("compare");

            k++;
        }


        while (
            j < rightPart.length &&
            !stopRequested
        ) {

            array[k] =
                rightPart[j++];

            updateBar(k);

            bars[k].classList.add("compare");

            await sleep(speedMs / 2);

            bars[k].classList.remove("compare");

            k++;
        }
    }


    async function sort(left, right) {

        if (
            left >= right ||
            stopRequested
        ) {
            return;
        }

        const mid =
            Math.floor((left + right) / 2);

        await sort(left, mid);

        await sort(mid + 1, right);

        await merge(left, mid, right);
    }


    await sort(
        0,
        array.length - 1
    );

    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* =========================================================
   QUICK SORT
========================================================= */

async function quickSort() {

    async function partition(low, high) {

        const pivot =
            array[high];

        bars[high].classList.add("pivot");

        let i = low - 1;

        for (
            let j = low;
            j < high && !stopRequested;
            j++
        ) {

            bars[j].classList.add("compare");

            setStatus(
                `Comparing with pivot ${pivot}`
            );

            addComparison();
            nextStep();

            await sleep(speedMs);

            if (array[j] < pivot) {

                i++;

                if (i !== j) {

                    swap(i, j);
                }
            }

            bars[j].classList.remove("compare");
        }

        if (i + 1 !== high) {

            swap(
                i + 1,
                high
            );
        }

        bars[high]
            .classList.remove("pivot");

        bars[i + 1]
            .classList.add("sorted");

        return i + 1;
    }


    async function sort(low, high) {

        if (
            low < high &&
            !stopRequested
        ) {

            const pivotIndex =
                await partition(
                    low,
                    high
                );

            await sort(
                low,
                pivotIndex - 1
            );

            await sort(
                pivotIndex + 1,
                high
            );
        }
    }


    await sort(
        0,
        array.length - 1
    );

    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* =========================================================
   HEAP SORT
========================================================= */

async function heapSort() {

    const n = array.length;


    async function heapify(size, root) {

        let largest = root;

        const left =
            2 * root + 1;

        const right =
            2 * root + 2;

        bars[root]
            .classList.add("pivot");

        if (left < size) {

            bars[left]
                .classList.add("compare");
        }

        if (right < size) {

            bars[right]
                .classList.add("compare");
        }

        setStatus(
            `Heapifying at index ${root}`
        );

        addComparison();
        nextStep();

        await sleep(speedMs);


        if (
            left < size &&
            array[left] > array[largest]
        ) {

            largest = left;
        }


        if (
            right < size &&
            array[right] > array[largest]
        ) {

            largest = right;
        }


        if (left < size) {

            bars[left]
                .classList.remove("compare");
        }

        if (right < size) {

            bars[right]
                .classList.remove("compare");
        }


        bars[root]
            .classList.remove("pivot");


        if (largest !== root) {

            swap(
                root,
                largest
            );

            await heapify(
                size,
                largest
            );
        }
    }


    for (
        let i = Math.floor(n / 2) - 1;
        i >= 0 && !stopRequested;
        i--
    ) {

        await heapify(
            n,
            i
        );
    }


    for (
        let i = n - 1;
        i > 0 && !stopRequested;
        i--
    ) {

        swap(0, i);

        bars[i]
            .classList.add("sorted");

        setStatus(
            `Placed maximum at index ${i}`
        );

        await sleep(speedMs);

        await heapify(
            i,
            0
        );
    }


    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* =========================================================
   LINEAR SEARCH
========================================================= */

async function linearSearch(target) {

    for (
        let i = 0;
        i < array.length &&
        !stopRequested;
        i++
    ) {

        bars[i]
            .classList.add("compare");

        setStatus(
            `Checking index ${i} — value ${array[i]}`
        );

        addComparison();
        nextStep();

        await sleep(speedMs * 2);

        if (array[i] === target) {

            bars[i]
                .classList.remove("compare");

            bars[i]
                .classList.add("found");

            setStatus(
                `Found ${target} at index ${i}`
            );

            return;
        }

        bars[i]
            .classList.remove("compare");

        bars[i]
            .classList.add("discarded");
    }


    if (!stopRequested) {

        setStatus(
            `${target} was not found`
        );
    }
}


/* =========================================================
   BINARY SEARCH
========================================================= */

async function binarySearch(target) {

    /* Binary Search requires sorted data */

    array.sort(
        (a, b) => a - b
    );

    renderBars();

    updateArrayInfo();

    let low = 0;

    let high =
        array.length - 1;


    while (
        low <= high &&
        !stopRequested
    ) {

        const mid =
            Math.floor(
                (low + high) / 2
            );


        for (
            let i = 0;
            i < low;
            i++
        ) {

            bars[i]
                .classList.add("discarded");
        }


        for (
            let i = high + 1;
            i < array.length;
            i++
        ) {

            bars[i]
                .classList.add("discarded");
        }


        bars[mid]
            .classList.add("pivot");


        setStatus(
            `Checking middle index ${mid} — value ${array[mid]}`
        );

        addComparison();
        nextStep();

        await sleep(speedMs * 3);


        if (
            array[mid] === target
        ) {

            bars[mid]
                .classList.remove("pivot");

            bars[mid]
                .classList.add("found");

            setStatus(
                `Found ${target} at index ${mid}`
            );

            return;
        }


        bars[mid]
            .classList.remove("pivot");

        bars[mid]
            .classList.add("discarded");


        if (
            array[mid] < target
        ) {

            low = mid + 1;

        } else {

            high = mid - 1;
        }
    }


    if (!stopRequested) {

        setStatus(
            `${target} was not found`
        );
    }
}


/* =========================================================
   ALGORITHM MAPS
========================================================= */

const SORTERS = {

    bubble: bubbleSort,

    selection: selectionSort,

    insertion: insertionSort,

    merge: mergeSort,

    quick: quickSort,

    heap: heapSort
};


const SEARCHERS = {

    linear: linearSearch,

    binary: binarySearch
};


/* =========================================================
   UPDATE ALGORITHM INFORMATION
========================================================= */

function updateAlgorithmInfo() {

    const meta =
        ALGO_META[currentAlgo];


    cTime.textContent =
        meta.time;

    cSpace.textContent =
        meta.space;


    visualizationTitle.textContent =
        meta.name;


    infoType.textContent =
        meta.type === "sort"
            ? "SORTING"
            : "SEARCHING";


    infoTitle.textContent =
        meta.name;

    infoDesc.textContent =
        meta.desc;


    bestCase.textContent =
        meta.best;

    averageCase.textContent =
        meta.average;

    worstCase.textContent =
        meta.worst;

    detailSpace.textContent =
        meta.space;

    stable.textContent =
        meta.stable;

    howItWorks.textContent =
        meta.how;


    searchTargetWrap.classList.toggle(
        "hidden",
        meta.type !== "search"
    );
}


/* =========================================================
   SELECT ALGORITHM
========================================================= */

function selectAlgo(algo, button) {

    if (isPlaying) return;

    currentAlgo = algo;

    document
        .querySelectorAll(".tab")
        .forEach(tab =>
            tab.classList.remove("active")
        );

    button.classList.add("active");

    updateAlgorithmInfo();

    clearBarStates();

    searchTargetVal.textContent = "—";

    resetCounters();

    setStatus(
        "Ready — press Play to begin"
    );
}


/* =========================================================
   RUN ALGORITHM
========================================================= */

async function runAlgorithm() {

    clearBarStates();

    resetCounters();

    stopRequested = false;

    isPlaying = true;

    isPaused = false;


    playBtn.disabled = true;

    pauseBtn.disabled = false;

    resetBtn.disabled = true;


    const meta =
        ALGO_META[currentAlgo];


    setStatus(
        `Running ${meta.name}...`
    );


    if (meta.type === "sort") {

        await SORTERS[currentAlgo]();

        if (!stopRequested) {

            setStatus(
                `${meta.name} complete`
            );
        }

    } else {

        const target =
            array[
                Math.floor(
                    Math.random() *
                    array.length
                )
            ];


        searchTargetVal.textContent =
            target;


        await SEARCHERS[currentAlgo](
            target
        );
    }


    isPlaying = false;

    isPaused = false;

    playBtn.disabled = false;

    pauseBtn.disabled = true;

    resetBtn.disabled = false;

    pauseBtn.textContent =
        "⏸ Pause";
}


/* =========================================================
   TAB EVENTS
========================================================= */

document
    .querySelectorAll(".tab")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectAlgo(
                    button.dataset.algo,
                    button
                );
            }
        );
    });


/* =========================================================
   PLAY
========================================================= */

playBtn.addEventListener(
    "click",
    () => {

        if (isPaused) {

            isPaused = false;

            pauseBtn.textContent =
                "⏸ Pause";

            return;
        }


        if (!isPlaying) {

            runAlgorithm();
        }
    }
);


/* =========================================================
   PAUSE
========================================================= */

pauseBtn.addEventListener(
    "click",
    () => {

        if (!isPlaying) return;

        isPaused =
            !isPaused;


        pauseBtn.textContent =
            isPaused
                ? "▶ Resume"
                : "⏸ Pause";
    }
);


/* =========================================================
   RESET / NEW ARRAY
========================================================= */

resetBtn.addEventListener(
    "click",
    () => {

        stopRequested = true;

        isPlaying = false;

        isPaused = false;


        playBtn.disabled = false;

        pauseBtn.disabled = true;

        resetBtn.disabled = false;


        pauseBtn.textContent =
            "⏸ Pause";


        generateArray(
            parseInt(
                sizeSlider.value,
                10
            )
        );


        searchTargetVal.textContent =
            "—";


        setStatus(
            "Ready — press Play to begin"
        );
    }
);


/* =========================================================
   SIZE SLIDER
========================================================= */

sizeSlider.addEventListener(
    "input",
    () => {

        sizeVal.textContent =
            sizeSlider.value;


        if (!isPlaying) {

            generateArray(
                parseInt(
                    sizeSlider.value,
                    10
                )
            );

            setStatus(
                "New array generated"
            );
        }
    }
);


/* =========================================================
   SPEED SLIDER
========================================================= */

speedSlider.addEventListener(
    "input",
    () => {

        speedVal.textContent =
            SPEED_LABELS[
                speedSlider.value
            ];

        speedMs =
            SPEED_MS[
                speedSlider.value
            ];
    }
);


/* =========================================================
   INITIALIZE
========================================================= */

speedMs =
    SPEED_MS[
        speedSlider.value
    ];

speedVal.textContent =
    SPEED_LABELS[
        speedSlider.value
    ];

sizeVal.textContent =
    sizeSlider.value;

updateAlgorithmInfo();

generateArray(
    parseInt(
        sizeSlider.value,
        10
    )
);