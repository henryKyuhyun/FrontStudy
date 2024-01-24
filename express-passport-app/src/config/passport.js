const passport = require("passport");
const User = require("../models/users.model"); // 오타 수정: users.modee -> users.model
const LocalStrategy = require("passport-local").Strategy;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;

// req.login(user)
passport.serializeUser((user, done) => {
  // user 파라미터 추가
  done(null, user.id);
});

// client => session => request
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const localStrategyConfig = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    // async 추가
    try {
      const user = await User.findOne({
        email: email.toLocaleLowerCase(),
      });

      if (!user) {
        return done(null, false, { msg: `Email ${email} not found` }); // 변수명 오타 수정: eamil -> email
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);

        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      });
    } catch (err) {
      return done(err);
    }
  }
);

passport.use("local", localStrategyConfig);

// google strategy
const GoogleStrategyConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["email", "profile"],
  },
  async (accssToken, refreshToken, profile, done) => {
    console.log("profile", profile); //확인용
    try {
      const existingUser = await User.findOne({ googleId: profile.id }); // 콜백 대신 await 사용
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = new User();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;

        try {
          await user.save(); // await 사용한 save메소드 사용 (이유 : callback이용하면 에러발생 : throw new MongooseError('Model.prototype.save() no longer accepts a callback'); )
          done(null, user);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    } catch (err) {
      return done(err);
    }
  }
);

passport.use("google", GoogleStrategyConfig);

//코드를 보면, Mongoose User.findOne() 메소드에서 콜백을 사용하고 있습니다. 가장 최근의 Mongoose 버전에서는 findOne() 메소드가 콜백을 더 이상 받지 않기 때문에 이 에러가 발생합니다. 이를 해결하기 위해, 다른 strategy에서처럼 async-await 패턴을 사용하여 카카오 strategy의 코드를 변경해야 합니다. 아래에 변경된 코드를 확인하세요:
const kakaoStrategyConfig = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: "/auth/kakao/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    // async 추가
    try {
      const existingUser = await User.findOne({ kakaoId: profile.id }); // 콜백 대신 await 사용
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = new User();
        user.kakaoId = profile.id;
        user.email = profile._json.kakao_account.email;

        try {
          await user.save(); // await 사용한 save 메소드 사용
          done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    } catch (err) {
      return done(err);
    }
  }
);

passport.use("kakao", kakaoStrategyConfig);
