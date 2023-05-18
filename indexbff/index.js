const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded());

app.use("/app", express.static(path.join(__dirname, "app")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(port, () => {
  console.log(
    `The application started successfully at : http://localhost:${port}`
  );
});
