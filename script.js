/* =========================================================
   ALGORITHM ARENA
   Pure Vanilla JavaScript
   No backend
   ========================================================= */


/* ================= STATE ================= */

let array = [];

let bars = [];

let currentAlgo = "bubble";

let isPlaying = false;

let isPaused = false;

let stopRequested = false;

let speedMs = 40;

let comparisonCount = 0;

let swapCount = 0;


/* ================= DOM ================= */

const barsContainer =
    document.getElementById("barsContainer");

const statusText =
    document.getElementById("statusText");

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

const infoTitle =
    document.getElementById("infoTitle");

const infoDesc =
    document.getElementById("infoDesc");

const infoType =
    document.getElementById("infoType");

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


/* ================= ALGORITHM METADATA ================= */

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
            "Bubble Sort repeatedly walks through the array. During every pass, larger elements move toward the end. After each pass, the largest remaining element reaches its correct position."
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
            "Selection Sort divides the array into sorted and unsorted portions. It searches for the minimum value in the unsorted portion and swaps it with the first unsorted element."
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
            "Builds the sorted array one element at a time by inserting each element into its correct position.",

        how:
            "Insertion Sort assumes the first element is sorted. It then takes the next element and shifts larger elements to the right until the correct position is found."
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
            "Divides the array into smaller halves, sorts them recursively, and merges the sorted halves.",

        how:
            "Merge Sort uses divide and conquer. The array is repeatedly divided into halves until single elements remain. These small arrays are then merged in sorted order."
    },


    quick: {

        name: "Quick Sort",

        type: "sort",

        time: "O(n log n) avg",

        space: "O(log n)",

        best: "O(n log n)",

        average: "O(n log n)",

        worst: "O(n²)",

        stable: "No",

        desc:
            "Chooses a pivot and partitions the array around that pivot before recursively sorting both sides.",

        how:
            "Quick Sort selects a pivot. Elements smaller than the pivot move to the left, while larger elements move to the right. The same process is recursively applied to both partitions."
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
            "Builds a max heap and repeatedly moves the largest element to the end of the array.",

        how:
            "Heap Sort first converts the array into a max heap. The root contains the largest value. It swaps the root with the last element and rebuilds the heap repeatedly."
    },


    linear: {

        name: "Linear Search",

        type: "search",

        time: "O(n)",

        space: "O(1)",

        best: "O(1)",

        average: "O(n)",

        worst: "O(n)",

        stable: "N/A",

        desc:
            "Checks every element one by one until the target is found or the array ends.",

        how:
            "Linear Search starts at index 0 and checks each element sequentially. It works even when the array is unsorted."
    },


    binary: {

        name: "Binary Search",

        type: "search",

        time: "O(log n)",

        space: "O(1)",

        best: "O(1)",

        average: "O(log n)",

        worst: "O(log n)",

        stable: "N/A",

        desc:
            "Repeatedly divides a sorted array in half to quickly locate a target value.",

        how:
            "Binary Search checks the middle element. If the target is larger, the left half is discarded. If it is smaller, the right half is discarded. This continues until the target is found."
    }

};


/* ================= UTILITY ================= */

function generateArray(size) {

    array = Array.from(
        { length: size },
        () => Math.floor(Math.random() * 94) + 6
    );

    resetStatistics();

    renderBars();

    updateArrayInfo();
}


function renderBars() {

    barsContainer.innerHTML = "";

    bars = array.map(value => {

        const bar =
            document.createElement("div");

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


function resetStatistics() {

    comparisonCount = 0;

    swapCount = 0;

    updateStatistics();
}


function updateStatistics() {

    comparisonCountEl.textContent =
        comparisonCount;

    swapCountEl.textContent =
        swapCount;
}


function setStatus(message) {

    statusText.textContent =
        message;
}


function updateArrayInfo() {

    arrayDisplay.textContent =
        `[${array.join(", ")}]`;

    elementCount.textContent =
        array.length;
}


/* ================= ASYNC CONTROL ================= */

function sleep(ms) {

    return new Promise(resolve => {

        const wait = () => {

            if (stopRequested) {

                resolve();

                return;
            }

            if (isPaused) {

                setTimeout(wait, 50);

                return;
            }

            setTimeout(resolve, ms);
        };

        wait();
    });
}


function compare() {

    comparisonCount++;

    updateStatistics();
}


function swap(i, j) {

    [
        array[i],
        array[j]
    ] = [
        array[j],
        array[i]
    ];

    updateBar(i);

    updateBar(j);

    swapCount++;

    updateStatistics();
}


/* =========================================================
   SORTING ALGORITHMS
   ========================================================= */


/* ================= BUBBLE SORT ================= */

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

            compare();

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


/* ================= SELECTION SORT ================= */

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
                `Searching minimum from index ${i}`
            );

            compare();

            await sleep(speedMs);

            if (array[j] < array[minIndex]) {

                bars[minIndex].classList.remove("pivot");

                minIndex = j;

                bars[minIndex].classList.add("pivot");
            }

            bars[j].classList.remove("compare");
        }

        if (minIndex !== i) {

            swap(i, minIndex);
        }

        bars[minIndex].classList.remove("pivot");

        bars[i].classList.add("sorted");
    }

    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* ================= INSERTION SORT ================= */

async function insertionSort() {

    const n = array.length;

    bars[0].classList.add("sorted");

    for (
        let i = 1;
        i < n && !stopRequested;
        i++
    ) {

        const key = array[i];

        let j = i - 1;

        bars[i].classList.add("pivot");

        setStatus(
            `Inserting value ${key}`
        );

        await sleep(speedMs);

        while (
            j >= 0 &&
            array[j] > key &&
            !stopRequested
        ) {

            compare();

            bars[j].classList.add("compare");

            array[j + 1] = array[j];

            updateBar(j + 1);

            await sleep(speedMs);

            bars[j].classList.remove("compare");

            j--;
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

        updateArrayInfo();
    }
}


/* ================= MERGE SORT ================= */

async function mergeSort() {

    async function merge(
        left,
        middle,
        right
    ) {

        const leftPart =
            array.slice(left, middle + 1);

        const rightPart =
            array.slice(middle + 1, right + 1);

        let i = 0;

        let j = 0;

        let k = left;

        while (
            i < leftPart.length &&
            j < rightPart.length &&
            !stopRequested
        ) {

            bars[k].classList.add("compare");

            compare();

            setStatus(
                `Merging [${left}, ${right}]`
            );

            await sleep(speedMs);

            if (
                leftPart[i] <=
                rightPart[j]
            ) {

                array[k] =
                    leftPart[i++];

            } else {

                array[k] =
                    rightPart[j++];
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

            await sleep(speedMs);

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

            await sleep(speedMs);

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

        const middle =
            Math.floor(
                (left + right) / 2
            );

        await sort(left, middle);

        await sort(middle + 1, right);

        await merge(
            left,
            middle,
            right
        );
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


/* ================= QUICK SORT ================= */

async function quickSort() {

    async function partition(
        low,
        high
    ) {

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

            compare();

            setStatus(
                `Comparing with pivot ${pivot}`
            );

            await sleep(speedMs);

            if (
                array[j] < pivot
            ) {

                i++;

                if (i !== j) {

                    swap(i, j);
                }
            }

            bars[j].classList.remove("compare");
        }


        swap(
            i + 1,
            high
        );

        bars[high].classList.remove("pivot");

        bars[i + 1].classList.add("sorted");

        return i + 1;
    }


    async function sort(
        low,
        high
    ) {

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


/* ================= HEAP SORT ================= */

async function heapSort() {

    const n = array.length;


    async function heapify(
        size,
        root
    ) {

        let largest = root;

        const left =
            2 * root + 1;

        const right =
            2 * root + 2;


        bars[root].classList.add("pivot");


        if (left < size) {

            bars[left]
                .classList.add("compare");
        }


        if (right < size) {

            bars[right]
                .classList.add("compare");
        }


        setStatus(
            `Heapifying index ${root}`
        );

        compare();

        await sleep(speedMs);


        if (
            left < size &&
            array[left] >
            array[largest]
        ) {

            largest = left;
        }


        if (
            right < size &&
            array[right] >
            array[largest]
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

            swap(root, largest);

            await heapify(
                size,
                largest
            );
        }
    }


    for (
        let i = Math.floor(n / 2) - 1;
        i >= 0 &&
        !stopRequested;
        i--
    ) {

        await heapify(n, i);
    }


    for (
        let i = n - 1;
        i > 0 &&
        !stopRequested;
        i--
    ) {

        swap(0, i);

        bars[i]
            .classList.add("sorted");

        await sleep(speedMs);

        await heapify(i, 0);
    }


    if (!stopRequested) {

        bars.forEach(bar =>
            bar.classList.add("sorted")
        );
    }
}


/* =========================================================
   SEARCHING ALGORITHMS
   ========================================================= */


/* ================= LINEAR SEARCH ================= */

async function linearSearch(target) {

    for (
        let i = 0;
        i < array.length &&
        !stopRequested;
        i++
    ) {

        bars[i].classList.add("compare");

        setStatus(
            `Checking index ${i} — value ${array[i]}`
        );

        compare();

        await sleep(speedMs * 2);


        if (
            array[i] === target
        ) {

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


/* ================= BINARY SEARCH ================= */

async function binarySearch(target) {

    /*
       Binary Search requires sorted data.
       Therefore we sort a copy first.
    */

    array.sort(
        (a, b) => a - b
    );

    renderBars();

    clearBarStates();

    updateArrayInfo();


    let low = 0;

    let high =
        array.length - 1;


    while (
        low <= high &&
        !stopRequested
    ) {

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


        const middle =
            Math.floor(
                (low + high) / 2
            );


        bars[middle]
            .classList.add("pivot");


        setStatus(
            `Checking middle index ${middle} — value ${array[middle]}`
        );


        compare();

        await sleep(
            speedMs * 3
        );


        if (
            array[middle] === target
        ) {

            bars[middle]
                .classList.remove("pivot");

            bars[middle]
                .classList.add("found");

            setStatus(
                `Found ${target} at index ${middle}`
            );

            return;
        }


        bars[middle]
            .classList.remove("pivot");

        bars[middle]
            .classList.add("discarded");


        if (
            array[middle] < target
        ) {

            low =
                middle + 1;

        } else {

            high =
                middle - 1;
        }
    }


    if (!stopRequested) {

        setStatus(
            `${target} was not found`
        );
    }
}


/* ================= ALGORITHM MAP ================= */

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
   RUNNER
   ========================================================= */

async function runAlgorithm() {

    clearBarStates();

    resetStatistics();

    stopRequested = false;

    isPlaying = true;

    playBtn.disabled = true;

    pauseBtn.disabled = false;

    resetBtn.disabled = true;


    const meta =
        ALGO_META[currentAlgo];


    if (
        meta.type === "sort"
    ) {

        setStatus(
            `Running ${meta.name}...`
        );

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


        setStatus(
            `Running ${meta.name}...`
        );


        await SEARCHERS[currentAlgo](
            target
        );
    }


    isPlaying = false;

    playBtn.disabled = false;

    pauseBtn.disabled = true;

    resetBtn.disabled = false;

    pauseBtn.textContent =
        "⏸ Pause";

    isPaused = false;
}


/* =========================================================
   ALGORITHM SELECTION
   ========================================================= */

function selectAlgo(
    algo,
    button
) {

    if (isPlaying) return;


    currentAlgo = algo;


    document
        .querySelectorAll(".tab")
        .forEach(tab =>
            tab.classList.remove("active")
        );


    button.classList.add("active");


    const meta =
        ALGO_META[algo];


    cTime.textContent =
        meta.time;

    cSpace.textContent =
        meta.space;


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


    searchTargetWrap
        .classList
        .toggle(
            "hidden",
            meta.type !== "search"
        );


    searchTargetVal.textContent =
        "—";


    clearBarStates();

    setStatus(
        "Ready — press Play to begin"
    );
}


/* =========================================================
   BUTTON EVENTS
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
            Number(sizeSlider.value)
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
                Number(sizeSlider.value)
            );
        }
    }
);


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
   INITIALIZATION
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


selectAlgo(
    "bubble",
    document.querySelector(
        '[data-algo="bubble"]'
    )
);


generateArray(
    Number(sizeSlider.value)
);