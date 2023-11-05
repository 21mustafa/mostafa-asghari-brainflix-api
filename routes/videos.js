const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
const videosData = require("../data/videos.json");

router.get("/", (request, response) => {
  response.json(
    videosData.map((video) => ({
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    }))
  );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const video = videosData.find((item) => item.id === id);

  if (!video) {
    res.status(404).json({ message: "Video not found" });
  } else {
    res.json(video);
  }
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const image = `http://localhost:8000${req.body.image}`;
  const description = req.body.description;

  if (!title || !image || !description) {
    res.status(400).json({ message: "Title, URL, and Image are required." });
  } else {
    const parsedData = videosData;
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

module.exports = router;
