const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static("./public"));
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const videoRoutes = require("./routes/videos");

app.use("/videos", videoRoutes);
