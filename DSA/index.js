String.prototype.camelCase = function () {
  if (!this.includes(" ")) {
    return this.toString();
  }

  let chunks = this.split(" ");
  let result = chunks.map((str, index) => {
    str.toLowerCase();
    return index > 0 ? str[0].toUpperCase() + str.slice(1, str.length) : str;
  });

  return result.join("");
};

let x = "hello";
let x1 = "hello world";
// console.log(x.camelCase());
// console.log(x1.camelCase());

var addSpaces = function (s, spaces) {
  // let result = '';

  // for (let i = 0; i < s.length; i++) {
  //     if (spaces.includes(i)) {
  //         result += " " + s[i];
  //     } else {
  //         result += s[i];
  //     }
  // }

  // return result;
  let result = [];
  let prevIndex = 0;

  for (let spaceIndex of spaces) {
    result.push(s.slice(prevIndex, spaceIndex));
    result.push(" ");
    prevIndex = spaceIndex;
  }

  result.push(s.slice(prevIndex));
  return result.join("");
};

// console.log(addSpaces(s = "icodeinpython", spaces = [1, 5, 7, 9]));
// console.log(addSpaces(s = "LeetcodeHelpsMeLearn", spaces = [8, 13, 15]));
// console.log(addSpaces(s = "spacing", spaces = [0, 1, 2, 3, 4, 5, 6]));
// console.log(addSpaces(s = "p", spaces = [0]));
// console.log(addSpaces(s = "ezixkFLjdbxrDowLVGYvdtBrguAAJVM", spaces = [23]));

// ! call, apply, bind

const greet = function (city, state) {
  console.log(`Hello ${this.firstName} ${this.lastName}, from ${city} ${state}`);
};

let obj = {
  firstName: "Tanmay",
  lastName: "Vedpathak",
};

let obj2 = {
  firstName: "rohit",
  lastName: "sharam",
};

// greet.call(obj, "Mumbai", "Maharashtra");
// greet.apply(obj2, ["Mumbai", "Maharashtra"]);

// let greetUser = greet.bind(obj, "Mumbai", "Maharashtra");

// greetUser();

let num = 4083;
let result = "";

while (num) {
  result += num % 10;

  num = Math.floor(num / 10);
}

// console.log(Number(result));

//! upto 100 unit Rs.4/unit
//! 101-200 unit Rs.6/unit
//! 201-400 unit Rs.8/unit
//! more than 400 unit Rs.13/unit

const payBill = (units) => {
  let bill = 0;

  if (units > 400) {
    let x = units - 400;
    bill += x * 13;
    units -= x;
  }

  if (400 >= units && units > 200) {
    let x = units - 200;
    bill += x * 8;
    units -= x;
  }

  if (200 >= units && units > 100) {
    let x = units - 100;
    bill += x * 6;
    units -= x;
  }

  bill += units * 4;

  return bill;
};

// console.log(payBill(80));
// console.log(payBill(189));
// console.log(payBill(254));
// console.log(payBill(584));

// ! inr denomination

const inrDenomination = (amount) => {
  let notes = {};

  if (amount >= 500) {
    notes[500] = Math.floor(amount / 500);
    amount = amount % 500;
  }

  if (amount >= 100) {
    notes[100] = Math.floor(amount / 100);
    amount = amount % 100;
  }

  if (amount >= 50) {
    notes[50] = Math.floor(amount / 50);
    amount = amount % 50;
  }

  if (amount >= 20) {
    notes[20] = Math.floor(amount / 20);
    amount = amount % 20;
  }

  if (amount >= 10) {
    notes[10] = Math.floor(amount / 10);
    amount = amount % 10;
  }

  if (amount >= 5) {
    notes[5] = Math.floor(amount / 5);
    amount = amount % 5;
  }

  if (amount >= 2) {
    notes[2] = Math.floor(amount / 2);
    amount = amount % 2;
  }

  if (amount === 1) {
    notes[1] = Math.floor(amount / 1);
    amount = amount % 1;
  }

  return notes;
};

// console.log(inrDenomination(4789));
// console.log(inrDenomination(877));
// console.log(inrDenomination(467));
// console.log(inrDenomination(89));

// ! is prime

const isPrime = (n) => {
  if (n == 1) return false;
  if (n == 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i < Math.floor(Math.sqrt(n)); i += 2) {
    if (n % i === 0) {
      return false;
      break;
    }
  }

  return true;
};

//! reverse number

const reverseNumber = (num) => {
  let newNumber = 0;

  while (num !== 0) {
    let rem = num % 10;
    newNumber = newNumber * 10 + rem;

    num = Math.floor(num / 10);
  }

  return newNumber;
};

// console.log(reverseNumber(34567));
// console.log(reverseNumber(98909));
// console.log(reverseNumber(5670));
// console.log(reverseNumber(345676));

// ! array left rotation by 1

const leftRotation = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
  }

  return arr;
};

// console.log(leftRotation([1, 2, 3, 4, 5]));

// ! array right rotation by 1

const rightRotation = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
  }

  return arr;
};

// console.log(rightRotation([1, 2, 3, 4, 5]));

// ! array left rotation by k

const leftRotationByK = (arr, k) => {
  k = k % arr.length;

  // for (let i = 0; i < arr.length - k; i++) {
  //   for (let j = k; j > 0; j--) {

  //     [arr[i + j], arr[i + j - 1]] = [arr[i + j - 1], arr[i + j]]

  //   }
  // }

  // return arr

  //? algorithm 1

  // var temp = new Array(arr.length);

  // for (let i = 0; i < arr.length; i++) {
  //   temp[i] = arr[(i + k) % arr.length]
  // }

  // return temp

  //? algorithm 2

  const reverse = (i, j) => {
    while (i < j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      i++;
      j--;
    }
  };

  reverse(0, k - 1);
  reverse(k, arr.length - 1);
  reverse(0, arr.length - 1);

  return arr;
};

// console.log(leftRotationByK([1, 2, 3, 4, 5], 2));
// console.log(leftRotationByK([1, 2, 3, 4, 5], 3));

// ! array left rotation by k

const rightRotationByK = (arr, k) => {
  k = k % arr.length;

  // for (let i = 0; i < arr.length - k; i++) {
  //   for (let j = k; j > 0; j--) {

  //     [arr[i + j], arr[i + j - 1]] = [arr[i + j - 1], arr[i + j]]

  //   }
  // }

  // return arr

  //? algorithm 1
  // var temp = new Array(arr.length);

  // for (let i = 0; i < arr.length; i++) {
  //   temp[(i + k) % arr.length] = arr[i]
  // }

  // return temp

  //? algorithm 2

  const reverse = (i, j) => {
    while (i < j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      i++;
      j--;
    }
  };

  reverse(0, arr.length - 1);
  reverse(0, k - 1);
  reverse(k, arr.length - 1);

  return arr;
};

// console.log(rightRotationByK([1, 2, 3, 4, 5], 2));
// console.log(rightRotationByK([1, 2, 3, 4, 5], 3));

//! remove duplicates form sorted array

var removeDuplicates = function (nums) {
  if (nums.length <= 1) return nums.length;
  let j = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] !== nums[i + 1]) {
      nums[j] = nums[i + 1];
      j++;
    }
  }

  return j;
};

// console.log(removeDuplicates([1, 1, 2]));
// console.log(removeDuplicates([1, 2]));
// console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 3, 4, 4, 5]));

// ! merge sorted array

const mergeSortedArray = (arr1, arr2) => {
  let mergeArray = new Array(arr1.length + arr2.length);
  let i = (j = k = 0);

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergeArray[k] = arr1[i];
      i++;
    } else {
      mergeArray[k] = arr2[j];
      j++;
    }
    k++;
  }

  while (i < arr1.length) {
    mergeArray[k] = arr1[i];
    i++;
    k++;
  }

  while (j < arr2.length) {
    mergeArray[k] = arr2[j];
    j++;
    k++;
  }

  return mergeArray;
};

// console.log(mergeSortedArray([], []));
// console.log(mergeSortedArray([1, 4, 7], []));
// console.log(mergeSortedArray([], [2, 5, 7]));
// console.log(mergeSortedArray([1, 4, 8, 9], [2, 4, 6, 8]));

// ! max profit

var maxProfit = function (prices) {
  let maxProfit = 0;
  let min = prices[0];

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    }

    let profit = prices[i] - min;
    maxProfit = Math.max(maxProfit, profit);
  }

  return maxProfit;
};

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// console.log(maxProfit([7, 6, 4, 3, 1]));

// ! sort color

var sortColors = function (nums) {
  let i = (j = 0);
  let k = nums.length - 1;

  while (i <= k) {
    if (nums[i] === 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
      i++;
    } else if (nums[i] === 2) {
      [nums[i], nums[k]] = [nums[k], nums[i]];
      k--;
    } else {
      i++;
    }
  }

  return nums;
};

// console.log(sortColors([2, 0, 2, 1, 1, 0]));
// console.log(sortColors([2, 0, 1]));

// ! 53. Maximum Subarray
// ? kadane algo

var maxSubArray = function (nums) {
  let max = -Infinity;
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    max = Math.max(max, sum);

    if (sum < 0) {
      sum = 0;
    }
  }

  return max;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([1]));
console.log(maxSubArray([5, 4, -1, 7, 8]));
