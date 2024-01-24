// 1. String concatenation
console.log('my' + 'cat');
console.log('1' +2);
console.log(`string literals: 1+2 = $ { 1 + 2 }`);

//2. Numeric operator
console.log(1+1); // add
console.log(1-1); // substract
console.log( 1/ 1); // divide
console.log(1 * 1); //mutiply
console.log(5 % 2); //remainder
console.log(2 ** 3); //exponentiation

//3. Increment and decrement operators
let counter = 2;
const preIncrement = ++counter;
// counter = counter +1 ;
//preIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);

 
// 4. Assignment operators
let x = 3;
let y = 6;
x += y ;  //x = x+y;
x -= y ;  // x = x -y

//5. Comparison operators
console.log(10 < 6); // less than
console.log(10 <= 6); // less than or equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // greater than or equal

// 6. Logical operators: ||(or) , && (and) , !(not)
const value1 = true;
const value2 = 4 < 2;

// ||(or), finds the first truthy value
console.log(`or: ${value1 || value2 || check()}`);

// $$ (and), finds the first falsy value
console.log(`and: ${value1 && value2 && check()}`);
function check(){
  for(let i = 0; i < 10; i++){
    //wasting time
    console.log('ahha');
  }
  return true;
}

// 7. Equality
const stringFive = '5';
const numberFive = 5;

// == loose equality, with type conversion
console.log(stringFive == numberFive);  //true
console.log(stringFive != numberFive);  // false

// === strict equality, no type conversion
console.log(stringFive === numberFive); //false
console.log(stringFive !== numberFive); //true

// object equality by reference
const henry1 = {name:'henry'};
const henry2 = {name:'henry'};
const henry3 =  henry1;
console.log(henry1 == henry2);  //false
console.log(henry1 === henry2); //false
console.log(henry1 === henry3); //true

console.log(`===================`)
// equlity - puzzler
console.log( 0 == false);  //true
console.log(0 === false); //false
console.log('' ==false); //true
console.log(''===false); //false
console.log(null == undefined); //true
console.log(null ===undefined); //false

// 8. Conditional operators: if
// if, else if, else
const name10 = 'henry';
if (name10 === 'henry') {
  console.log('welcom, Henry!');
}else if (name10 === 'coder') {
  console.log('you are amazing coder!');
}else{
  console.log("I don't know who you are.");
}


const em = 'kyuhyun';
if(em === 'emily') {
  console.log('hi Em')
}else if( em === 'kyuhyun') {
  console.log('get out!');
}else {
  console.log(`who are u?`);
}

//9. Ternary operator : ?
//Condition ? value1 : value2;


//10. Switch statement
// use for multiple if checks
// use for enum-like value check
// use for multiple type checks in TS
const browser = 'IE';
switch (browser){
  case 'IE':
    console.log('go away');
    break;
  case 'Chrome':
  case 'Firefox':
    console.log('I love you');
    break;
  default:
    console.log('same all!!!');
    break;
}


// 11. Loops
// while loop, while the condition is truthy,
// body code is executed.
let i = 3;
while (i > 0){
  console.log(` while: ${i} `);
  i--;
}

// do while loop, body code is executed first,
// then check the condition.
do{
  console.log(`do while: ${i}`);
  i--;
}while(i>0);

// for loop, for(begin; condition; step)
for (i = 3; i > 0; i--) {
  console.log(`for: ${i}`);
}

for (let i = 3; i > 0; i = i - 2){
  //inline variable declaration
  console.log(`inline variable for: ${i}`);
}

// break , continue
// Q1. iterate from 0 to 10 and print only even numbers (use continue)

for (let i = 0; i < 11; i++) {
  if(i % 2 ===0) {
    console.log(`Q1. ${i}`);
  }
}


// Q2. iterate from 0 to 10 and print number until reaching 8(use break)

for (let i = 0; i <11; i++) {
  if ( i > 8) {
    break;
  }
  console.log(`Q2. ${i}`);
}