require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const { shouldShowPrerenderedPage } = require("./addons/prerender");
const { prerenderPage } = require("./addons/prerender");

const port = process.env.PORT || 8000;
const app = express();
const targetFolder = "../apps/build_deploy";

// Handle Security using Helmet and custom HSTS, Force SSL
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    contentSecurityPolicy: false,
  })
);

// Handle Security to decoded URL
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

// Route to handle "/"
app.get("/", async (req, res, next) => {
  if (shouldShowPrerenderedPage(req)) return prerenderPage(req, res);
  return next();
});

// read form post
app.post("/", function (req, res) {
  if (req.body.superAuth) document.cookie = `super-login=${req.body.superAuth}`;
});

// Send files such as html, css, and js
app.use(express.static(path.join(__dirname, targetFolder)));

// Route to handle sitemap.xml
// app.get("/sitemap.xml", (req, res) => {
//   const url = `${process.env.REACT_APP_META_URL}/xml/sitemap.xml`;
//   request.get(url).pipe(res);
// });

// Route to handle 404 error
app.get("/not-found", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, targetFolder, "index.html"));
});

// Route to handle 301 redirect
// app.get("/", (req, res) => {
//   res.status(301).sendFile(path.join(__dirname, targetFolder, "index.html"));
// });

// Route to handle every routing
app.get("/*", (req, res) => {
  if (shouldShowPrerenderedPage(req)) return prerenderPage(req, res);
  return res.sendFile(path.join(__dirname, targetFolder, "index.html"));
});

app.listen(port);
console.log(`Running on PORT: ${port}`);
