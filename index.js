import express from "express";
import dotenv from "dotenv";
import Url from "./models/url.js";
import dbConnect from "./config/db.js";

const app = express();

// env
dotenv.config();

// db
dbConnect();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Views
app.set("view engine", "ejs");

// Routes
app.get("/", async (req, res) => {
  const shortUrls = await Url.find();
  // We pass those shortUrls down into our view
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  // creating a new short url
  await Url.create({
    full: req.body.fullUrl,
  });
  // redirecting
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  // Get any route that has information directly after the 1st slash
  // saved on a parameter call shortUrl
  const shortUrl = await Url.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

// port
app.listen(process.env.PORT || 5000);
