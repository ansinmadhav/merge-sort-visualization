let array = [];
let originalArray = []; // Store unsorted array

// Function to generate a random array
function generateArray() {
    array = [];
    originalArray = []; // Reset original array
    document.getElementById("userArray").value = ""; // Clear input field
    document.getElementById("timeTaken").innerText = ""; // Clear previous time
    document.getElementById("unsortedArray").innerText = ""; // Clear previous unsorted array
    document.getElementById("sortedArray").innerText = ""; // Clear previous sorted array

    const container = document.getElementById("array-container");
    container.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 100) + 10;
        array.push(value);
        originalArray.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    }

    // Display the unsorted array
    document.getElementById("unsortedArray").innerText = originalArray.join(", ");
}

// Function to set user-inputted array
function setUserArray() {
    const userInput = document.getElementById("userArray").value.trim();
    if (!userInput) return alert("Please enter numbers separated by commas.");

    const userArray = userInput.split(",").map(num => parseInt(num.trim()));
    if (userArray.some(isNaN)) return alert("Invalid input! Please enter only numbers separated by commas.");

    array = [...userArray];
    originalArray = [...userArray]; // Store unsorted array
    document.getElementById("timeTaken").innerText = ""; // Clear previous time
    document.getElementById("sortedArray").innerText = ""; // Clear previous sorted array
    document.getElementById("unsortedArray").innerText = originalArray.join(", "); // Display unsorted array
    displayArray();
}

// Function to display the array as bars
function displayArray() {
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

// Merge Sort Wrapper with Time Complexity Calculation
async function mergeSortWrapper() {
    if (array.length === 0) return alert("Please enter an array or generate one.");
    
    const startTime = performance.now(); // Start time

    await mergeSort(array, 0, array.length - 1);

    const endTime = performance.now(); // End time
    const timeTaken = (endTime - startTime).toFixed(2); // Calculate time

    document.getElementById("timeTaken").innerText = `Time Taken: ${timeTaken} ms`;
    document.getElementById("sortedArray").innerText = array.join(", "); // Display sorted array
}

// Merge Sort Algorithm
async function mergeSort(arr, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}

// Merge Function with Visualization
async function merge(arr, left, mid, right) {
    const bars = document.getElementsByClassName("bar");
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] < rightArr[j]) {
            arr[k] = leftArr[i];
            bars[k].style.height = `${leftArr[i] * 3}px`;
            i++;
        } else {
            arr[k] = rightArr[j];
            bars[k].style.height = `${rightArr[j] * 3}px`;
            j++;
        }
        bars[k].style.backgroundColor = "green";
        await new Promise(resolve => setTimeout(resolve, 100));
        bars[k].style.backgroundColor = "steelblue";
        k++;
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        bars[k].style.height = `${leftArr[i] * 3}px`;
        i++;
        k++;
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        bars[k].style.height = `${rightArr[j] * 3}px`;
        j++;
        k++;
    }
}

// Initialize with a random array
generateArray();
