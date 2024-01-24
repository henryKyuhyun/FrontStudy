const express = require("express");
const path = require("path");
const { default: mongoose } = require("mongoose");
const User = require("./models/users.model");
const passport = require("passport");
const cookieSession = require("cookie-session");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middleware/auth");
const app = express();
const config = require("config");
const mainRouter = require("./routes/main.router");
const serverConfig = config.get("server");
const usersRouter = require("./routes/users.router");
require("dotenv").config();

app.use(
  cookieSession({
    name: "cookie-session-name",
    keys: [process.env.COOKIE_ENCRYPTION_KEY],
  })
);

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }

  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form, input, submit 해서 백엔드에서 값을 받을려면 이부분이있어야함

// view engien configuration (setup)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose.set("strictQuery", false); // warning 없애기위해
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err, "몽고연결안됌");
  });

app.use("/static", express.static(path.join(__dirname, "public"))); // 정적파일제공

// checkAuthenticated 를 넣어줌으로써 인증된사람들만 사용할 수 있도록한다.

app.use("/", mainRouter);
app.use("/auth", usersRouter);
// 구글에게 인증된정보를 다시 한번 보내는로직

const port = serverConfig.port;
app.listen(port, () => {
  console.log(`Listening on${port}`);
});
