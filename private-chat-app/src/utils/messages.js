const messageModel = require("../models/messages.model");

const getToken=(sender,receiver)=>{
  const key =[sender,receiver].sort().join("_");
  return key;
}

const saveMessages = async ({ from, to, message, time }) => {
  const token = getToken(from, to);
  const data = {
    from,
    message,
    time,
  };

  try {
    await messageModel
      .updateOne(
        { userToken: token },
        {
          $push: { message: data },
        }
      )
      .exec();
    console.log("메시지가 생성되었습니다");
  } catch (err) {
    console.error(err);
  }
};
// 아래 코드로하면 Query.prototype.exec() no longer accepts a callback 에러 발생!

// const saveMessages = async({from,to,message,time}) =>{
//   const token = getToken(from,to);
//   const data = {
//     from,
//     message,
//     time,
//   };

//   messageModel.updateOne({userToken: token}, {
//     $push:{message:data}
//   },(err,res) =>{
//     if(err) console.error(err);
//     console.log('메시지가 생성되었습니다');
//   });
// }

const fetchMessages = async(io,sender,receiver)=>{
  const token = getToken(sender, receiver);
  const foundToken = await messageModel.findOne({userToken: token});
  if(foundToken){
    // A 와 B 가 대화를한적이있는 경우 db에서 가져온다
    io.to(sender).emit('stored-messages', {messages: foundToken.messages});
  }else{ //대화를 한적 없는경우
    const data = {
      userToken: token,
      messages: []
    }
    const message = new messageModel(data); //db에 document로 저장
    const savedMessage = message.save();
    if(savedMessage){
      console.log('message가 생성되었습니다')
    }else{
      console.log('메시지 생성 중 에러발생헀습니다.')
    }
  }
}
module.exports ={
  saveMessages,
  fetchMessages
}