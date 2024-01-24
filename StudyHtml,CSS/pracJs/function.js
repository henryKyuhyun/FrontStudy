//Function
// - fundamental building block in the program
// - subprogram can be used multiple times
// - performs a task or calculates a value

// 1. Function declaration
// function name(param1, param2) {body... return;}
// one function === one thing
// naming: doSomething, command, verb
// e.g. createCardAndPoint -> createCard, createPoint
// function is object in JS

// function printHello(){
//   console.log('Hello');
// }
// printHello();


// function log(message){
//   console.log(message);
// }
// log('hithisiskyuhyun');
// log(1234);

// // 2. Parameters
// // premitive parameters: passed by value
// // object parameter: passed by reference
// function changeName(obj) {
//   obj.name = 'coder';
// }
// const henry = {name: 'henry'};
// changeName(henry);
// console.log(henry);

// // 3. Default parameters (added in ES6)
// function showMessage(message, from = 'unknown'){
//   console.log(`${message} by ${from}`);
// }
// showMessage('HI!');

// // 4. Rest parameters (added in ES6)
// function printAll(...args){
//   for(let i =0; i < args.length; i++){
//     console.log(args[i]);
//   }

//   for(const arg of args){
//     console.log(arg);
//   }

//   args.forEach((arg)=> console.log(arg));   
// }

// // 위 세개의 방법은 다 동일한 출력문을 입력, 단지 가장밑에있는 방법이 간단한거다. 
// printAll('dream','coding','henry');

// // 5.Local scope
// // 밖에서는 안이 보이지 않고 안에서만 밖을 볼수있다. 
// let globalMessage = 'global'; //global variable
// function printMessage(){ // 대괄호안에서 는  밖의 글로발메시지를 출력가능,하지만 안의메시지를 밖에서는 출력이안된다. 
//   let message = 'hello';
//   console.log(message) //local variable
//   console.log(globalMessage);
//   function printAnother(){
//     console.log(message);
//     let childMessage = 'hello';
//   }
//   // console.log(childMessage); error
// }
// printMessage();
 

//  Return a value
function sum(a,b){
  return a+b;
}
const result = sum(1,2 ); //3
console.log(`sum: ${sum(1.2)}`);
 