const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true, //유효성체크 (동일이메일사용불가)
  },

  password: {
    type: String,
    minLength: 5,
  }, // email, password 는 일반아이디

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  }, // 이건 구글로그인을 위한것

  kakaoId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const saltRounds = 10; // <- 생략가능 ,왜냐하면 기본값이 10이기때문
userSchema.pre("save", function (next) {
  let user = this;
  //비밀번호가 변경될때만
  if (user.isModified("password")) {
    // salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next(); // 이부분을 해야 구글로그인이 작동함
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // bcrypt compare 비교
  // plain password => client에서 제공 , This.password => database 에 있는 비밀번호
  // cb => callback
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    // plainPassword -> 내 비밀번호 , this.password ->Hash 된 password
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
const User = mongoose.model("User", userSchema);

module.exports = User;
