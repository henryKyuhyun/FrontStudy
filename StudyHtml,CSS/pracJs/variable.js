//Whole - script strict mode syntax
//JS is very flexible
//flexible  === dangerous
//added ECMAScript 5


'use strict';

//2. Variable (변수), rw (read / write)
// let (added in ES6)

let name = 'ellie';
console.log(name);
name = 'hello';
console.log(name);


// var (don't ever use this!)
// var hoisting (move declaration from bottom to top)

//constance ( the value not change)


//Note!
//Immutable tada types: primitive types, frozen objects (i.e. object.freeze())
//Mutable data types : all objects by default are mutable in JS
//favor immutable data type always for a few reasons:
// - security
// - thread safety
// - reduce human mistakes
const daysInweek = 7;
const maxNumber = 5;





// 4. Variable type
// primitive, single item : number, string , boolean, null, undefiedn, symbol
// object, box container
// function , first-class function

const count = 17;  //integer
const size = 17.1;  //decimal number
console.log(`value : ${count}, type : ${typeof count}`);
console.log(`value: ${size} , type: ${typeof size}`);

// number -specla numeric values: infinity, -infinity , nan
const infinity = 1 / 0;
const negativeInfinity = -1 /0;
const nAn = 'not anumber' /2;
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);


//bigInt (fairly new, don't use it yet)
const bigInt = 12344657890123446578901234465789012344657890; // over (-2**53) ~ 2*53
console.log(`value: ${bigInt}, type: ${typeof bigInt} `);
Number.MAX_SAFE_INTEGER;

//string
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello' + brendan;
console.log(`value: ${greeting} , type:${typeof greeting}`);
const helloBob = 'hi ${brendan}!'; //template literals (string)
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);

// boolean
// false: 0 , null, undefined, NaN, ''
// true : any other value

const canRead = true;
const test = 3<1; //flase
console.log(`value: ${canRead} , type:${typeof canRead}`);
console.log(`value:${test}, type : ${typeof test}`);


//null 
let nothing = null;
console.log(`value :${nothing}, type: ${typeof nothing}`);

//undefined
let x;
console.log(`value: ${x}, type: ${typeof x}`);


//symbol, create unique identifiers for objects
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); //false
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2) // true
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);


// object, real-life object, data structure
const ellie = {name: 'ellie', age:'20'};
ellie.age = 21;

// 5. Dynamic typing : dynamically typed language
let text = 'hello';
console.log(`value: ${text} , type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`);
text = '8'/'2';
console.log(`value: ${text}, type: ${typeof text}`);
