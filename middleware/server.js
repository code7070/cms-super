require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
// const { shouldShowPrerenderedPage } = require("./prerender");
// const { prerenderPage } = require("./prerender");

const port = process.env.PORT || 8000;
const app = express();
const targetFolder = "../apps/build";
console.log("SERVER: ", port);

// DENY USING "puppeteer": "^8.0.0",

app.use(
  helmet({
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    contentSecurityPolicy: false,
  })
);

app.use((req, res, next) => {
  let err = null;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    err = e;
  }
  if (err) return res.redirect("/404");
  next();
  return true;
});

app.get("/", async (req, res, next) => {
  // if (shouldShowPrerenderedPage(req)) return prerenderPage(req, res);
  return next();
});

// ADDITIONAL FOR FROM POST
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  if (req.body.superAuth) res.cookie("super-login", req.body.superAuth);
  return res.sendFile(path.join(__dirname, targetFolder, "index.html"));
});

app.use(express.static(path.join(__dirname, targetFolder)));

app.get("/not-found", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, targetFolder, "index.html"));
});

app.get("/*", (req, res) => {
  // if (shouldShowPrerenderedPage(req)) return prerenderPage(req, res);
  return res.sendFile(path.join(__dirname, targetFolder, "index.html"));
});

app.listen(port);
console.log(`Running on PORT: ${port}`);
