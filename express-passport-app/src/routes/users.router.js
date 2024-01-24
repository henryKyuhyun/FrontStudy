const express = require("express");
const passport = require("passport");
const User = require("../models/users.model");
const sendMail = require("../mail/mail");
const usersRouter = express.Router();

usersRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); //expree error처리기
    }
    if (!user) {
      return res.json({ meg: info });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    }); //localstorage
  })(req, res, next); // <- 이렇게 넣어줘야 Middleware 안의 Middleware를 사용할 수 있다.
});

usersRouter.post("/logout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

usersRouter.post("/signup", async (req, res) => {
  // user 객체 생성
  const user = new User(req.body);

  // user 컬랙션(table)에 유저저장
  try {
    await user.save(); // * await 을 사용할려면 async 로 감싸줘야함
    //이부분에서 이메일보내면된다
    sendMail("tototodayae@gamil.com", "강다예", "welcome");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});
usersRouter.get("/google", passport.authenticate("google"));

usersRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  })
);

usersRouter.get("/kakao", passport.authenticate("kakao"));
usersRouter.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = usersRouter;
