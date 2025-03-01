const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
