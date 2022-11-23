// swapping 

// let a =5;
// let b =9;
// let c;
// [a,b] = [b,a]


// c=a;
// a=b;
// b=c;

// console.log(a,b);


// const isPrime = (n) => {
//     for(let i = 2; i <= n/2; i++){
//        if(n % i === 0){
//           return false;
//        }
//     };
//     return true;
//  };

//  const generatePrime = num => {
//     const arr = [];
//     let i = 2;
//     while(arr.length < num){
//        if(isPrime(i)){
//           arr.push(i);
//        };
//        i = i === 2 ? i+1 : i+2;
//     };
//     return arr;
//  };
//  console.log(generatePrime(6));


// const generatePrime = num => {
//     const arr= [];
//     let i = 2;
//     where(arr.length < num){

//     }
// }



// program to print prime numbers between the two numbers

// // take input from the user
// const lowerNumber = parseInt(prompt('Enter lower number: '));
// const higherNumber = parseInt(prompt('Enter higher number: '));

const num = 10;

// console.log(`The prime numbers between ${lowerNumber} and ${higherNumber} are:`);

// looping from lowerNumber to higherNumber
for (let i = 1; i <= 20; i++) {  
    let a = 0;

    // looping through 2 to user input number    
    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
            a = 1;
            break;
        }
    }

    // if number greater than 1 and not divisible by other numbers
    if (i > 1 && a == 0) {
        console.log(i);
    }
}