const { checkRole } = require("./middleware");
const express = require("express");
const path = require("path");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const PORT = process.env.PORT || 3001;

const app = express();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

app.get("/public", (req, res) => {
  res.json({
    msg: "hello public api",
  });
});

app.get("/private", jwtCheck, (req, res) => {
  res.json({
    msg: "hello private api",
  });
});

app.get("/admin", jwtCheck, checkRole("admin"), (req, res) => {
  res.json({
    msg: "hello from admin api",
  });
});

app.get("/courses", jwtCheck, checkScope(["read:courses"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "i'm just stupid" },
      { id: 2, title: "fuck my life" },
    ],
  });
});

app.listen(PORT, () => {
  console.log(
    `listening to port: ${PORT} reachable via ${process.env.REACT_APP_API_URL}`
  );
});
