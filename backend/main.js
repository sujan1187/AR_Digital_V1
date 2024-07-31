/*const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.use(express.json());

// DB connection
mongoose
  .connect(
    "mongodb+srv://sujanmca22:5VODGHqAEiVz9mqq@mernapp.kawiuqq.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Schema
const sch = new Schema({
  type: String,
  companyName: String,
  purpose: String,
  logo: String,
  video: String,
});

const monmodel = mongoose.model("NEWCOL", sch);

// POST route
app.post("/post", async (req, res) => {
  console.log("inside post function");

  const data = new monmodel({
    type: req.body.type,
    companyName: req.body.companyName,
    purpose: req.body.purpose,
    logo: req.body.logo,
    video: req.body.video,
  });

  try {
    const val = await data.save();
    res.status(201).send("posted");
  } catch (error) {
    res.status(500).send("Error saving data");
    console.error(error);
  }
});

// Fetch all route
app.get("/fetchall", async (req, res) => {
  try {
    const val = await monmodel.find();
    res.json(val);
  } catch (err) {
    res.status(500).send("Error fetching data");
    console.error(err);
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
