const express = require("express");
const app = new express();
const fileUpload = require("express-fileupload");
const connectDB = require("./utils/connectDB");
const settings = require("./settings");
const path = require("path");

// middlewares
app.use(fileUpload());

// static folder
app.use("/assets", express.static(settings.staticFolder));

// index
app.get("/", (req, res) => {
  res.sendFile(path.join(settings.staticFolder, "index.html"));
});

// upload handler
app.post("/upload", async (req, res) => {
  try {
    const uploadedFile = req.files.upload;
    // filename: md5 + extension name
    const newFilename =
      uploadedFile.md5 + "." + uploadedFile.name.split(".").reverse()[0];
    // upload file to folder
    await uploadedFile.mv(path.join(settings.uploadFolder, newFilename));
    // store filename to database
    const db = await connectDB(settings.databaseUrl, settings.databaseName);
    await db.collection(settings.databaseCollectionName).insertOne({
      file: newFilename,
    });
    res.json({
      message: "Uploaded File Successfully",
    });
  } catch (err) {
    res.json({
      error: "Upload File Failed",
    });
  }
});

// listen on port
app.listen(80, "localhost", () => {
  console.log("App listening on http://localhost");
});
