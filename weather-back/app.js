const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const cors = require("cors");
app.use(cors());
require("./route")(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is listening at port:${PORT}`);
});
