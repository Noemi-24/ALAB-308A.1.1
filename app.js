// ===== Part 1: Stack Overflow =====
let counter = 0;

try {
    function increment(){
        counter++;
        increment();
    }    

    increment();

} catch (error) {
    console.log(error, `Total count: ${counter}`);
}


// ===== Part 2: Trampolines =====
// Step One: write the recursive function.
function flattenNestedArray(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      let temp = flattenNestedArray(array[i]);
      temp.forEach(function(value){ newArray.push(value); })
    } else {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

console.log(flattenNestedArray([[1, 2], 3, [4, [[5]]]]));


//Step Two: modify the recursive function.
const flatten = (array, index = 0, accumulator = []) =>{
    // Base case: to stop recursion
    if(index >= array.length) return accumulator;
    // if current elemnent is an array
    if (Array.isArray(array[index])) {
        // flattens sub-array and cotinues
         const newArray = [
        ...array.slice(0, index),        // elements before
        ...array[index],                  // expand sub-array
        ...array.slice(index + 1)         // elements after
        ];
        return () => flatten(newArray, index, accumulator);
    } else {
        accumulator.push(array[index]);
    }
  
    return () => flatten(array, index + 1, accumulator);
}

//Step Three: create a trampoline function.
const trampoline = (fn) => {
  let result = fn;
  while (typeof result === 'function') {
    result = result();
  }
  return result;
}

const result = trampoline(flatten([1, [2, [3, 4]], 5]));
console.log(result);


// ===== Part 3: Deferred Execution ======
// function primeNumbers(n){
//   const displayNumbers = document.getElementById('prime-numbers');
  
//   for(let i=2; i<=n; i++){
//       if(isPrime(i)){
//         displayNumbers.innerHTML += `<p>${i}</p>`;
//       }      
//   }
  
// }

function isPrime(num){
  // Check if n=1 or n=0
  if (num <= 1) return false;
  // Check if n=2 or n=3
  if(num == 2 || num == 3) return true;
  // Check whether n is divisible by 2 or 3
  if(num % 2 == 0 || num % 3 == 0) return false;
  // Check from 5 to square root of n
  // Iterate i by (i+6)
  for (let i = 5; i <= Math.sqrt(num); i += 6) {
    if (num % i == 0 || num % (i + 2) == 0)
      return false;
    }

  return true;
}

//Modify your function such that each number has an opportunity to render after it is calculated
function primeNumbers(current, max){
  if(current > max) {
    alert('Calculation is finished');
    return;
  }

  if (isPrime(current)) {
    document.getElementById('prime-numbers').innerHTML += `<p>${current}</p>`;
  }

  setTimeout(()=>{
    primeNumbers(current +1, max);
  }, 0);  
}

primeNumbers(2, 10000);




