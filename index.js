const express = require("express");
const videosData = require("./data/videos.json");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/videos", (request, response) => {
  response.json(
    videosData.map((video) => ({
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    }))
  );
});

app.get("/videos/:id", (req, res) => {
  const id = req.params.id;

  const video = videosData.find((item) => item.id === id);

  if (!video) {
    res.status(404).json({ message: "Video not found" });
  } else {
    res.json(video);
  }
});

app.post("/videos", (req, res) => {
  const { title, image, description } = req.body;

  if (!title || !image || !description) {
    res.status(400).json({ message: "Title, URL, and Image are required." });
  } else {
    const parsedData = JSON.parse(videosData);
    const newVideo = {
      id: uuid.v4(),
      title,
      image,
      channel: "",
      description,
      views: "0",
      likes: "0",
      duration: "3:21",
      video: null,
      timestamp: 1626032763000,
      comments: [],
    };

    parsedData.push(newVideo);

    fs.writeFileSync(
      "./data/videos.json",
      JSON.stringify(parsedData, null, 2),
      "utf8"
    );

    res.status(201).json(newVideo);
  }
});
