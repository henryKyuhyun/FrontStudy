//문서객체 선택
let target = document.querySelector("#dynamic");

function randomString(){

  let stringArr = ["Learn about Henry", "Learn about kyuhyun",
                   "Let's look kyuhyun's coding journey", "How was it?"];
  let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
  let selectStringArr = selectString.split("");

  return selectStringArr;

}

// reset typing 
function resetTyping(){
  target.textContent = "";
  dynamic(randomString());
}
// 한글자씩 텍스트출력 함수 
function dynamic(randomArr){

  if(randomArr.length > 0){
    target.textContent += randomArr.shift();
    setTimeout(function(){
      dynamic(randomArr);
    },80);
  }else {
    setTimeout(resetTyping, 3000);
  }

}

dynamic(randomString()); 

// cursor blink effect
function blink(){
  target.classList.toggle("active");
}
setInterval(blink, 500);

