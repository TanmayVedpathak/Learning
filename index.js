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

const shortArr = (arr) => {
  if (!Array.isArray(arr)) {
    return "Kindly provide a proper array";
  }

  if (arr.length < 2) {
    return arr;
  }

  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];

      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else if (arr[mid] === 2) {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];

      high--;
    } else {
      return "Array should contain only 0, 1 and 2";
    }
  }

  return arr;
};

// console.log(shortArr([2, 0, 1, 1, 2, 0, 1, 2]));
// console.log(shortArr([1, 0, 2, 1, 0, 2, 1, 1, 2, 0, 1, 2, 1, 0, 2]));
// console.log(shortArr([]));
// console.log(shortArr([2, 0]));

// : leet code  70
var climbStairs = function (n) {
  if (n < 0) return "invalid number";
  let curr = 0;
  let prev = 0;
  let next = 1;

  for (i = 0; i < n; i++) {
    curr = prev + next;
    prev = next;
    next = curr;
  }

  return curr;
};

// console.log(climbStairs(3));
// console.log(climbStairs(4));
// console.log(climbStairs(5));

// : leet code 2631

Array.prototype.groupBy = function (fn) {
  let obj = {};

  this.forEach((ele) => {
    const key = fn(ele);
    if (Object.hasOwn(obj, key)) {
      obj[key].push(ele);
    } else {
      obj[key] = [ele];
    }
  });

  return obj;
};

// console.log(
//   [
//     [1, 2, 3],
//     [1, 3, 5],
//     [1, 5, 9],
//   ].groupBy(function (list) {
//     return String(list[0]);
//   }),
// );

// console.log(
//   [{ id: "1" }, { id: "1" }, { id: "2" }].groupBy(function (item) {
//     return item.id;
//   }),
// );

// : leet code 153
var findMin = function (nums) {
  let min = 0,
    max = nums.length - 1;

  while (min < max) {
    const mid = min + Math.floor((max - min) / 2);
    if (nums[max] < nums[mid]) {
      min = mid + 1;
    } else {
      max = mid;
    }
  }

  return nums[min];
};

// console.log(findMin([3, 4, 5, 1, 2]));
// console.log(findMin([4, 5, 6, 7, 0, 1, 2]));
// console.log(findMin([11, 13, 15, 17]));
// console.log(findMin([8, 9, 10, 1, 2, 3, 4, 5, 6, 7]));

// : leet code 2621

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, Number(millis)));
}

// let t = Date.now();
// sleep(500).then(() => console.log(Date.now() - t)); // 100

// : leet code 74

var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    const row = Math.floor(mid / n);
    const col = mid % n;

    const value = matrix[row][col];

    if (value === target) {
      return true;
    }

    if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};

// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3));
// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13));
// console.log(searchMatrix())

// : leet code 55

var canJump = function (nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    // If current index itself is not reachable, then we cannot continue.
    if (i > farthest) {
      return false;
    }

    // Update the farthest position we can reach.
    farthest = Math.max(farthest, i + nums[i]);

    // Optional early exit
    if (farthest >= nums.length - 1) {
      return true;
    }
  }

  return true;
};

console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));
console.log(canJump([0, 1]));
console.log(canJump([2, 0, 0]));
console.log(canJump([2, 0, 0, 0, 6]));
