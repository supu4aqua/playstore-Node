const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("common"));

const playstore = require("./playstore-data.js");

app.get("/apps", (req, res) => {
    const { sort, genres = "" } = req.query;
    if (sort) {
        if (!["rating", "app"].includes(sort)) {
            return res.status(400).send("Sort must be one of rating or app");
        }
    }
    if (genres) {
        if (!["Action", "Puzzle", "Strategy", "Cascade", "Arcade", "Card"].includes(
                genres
            )) {
            return res
                .status(400)
                .send(
                    "Genres must be one of Action, Puzzle, Strategy, Cascade, Arcade or Card"
                );
        }
    }
    let results = playstore.filter(playstore =>
        playstore.Genres.toLowerCase().includes(genres.toLowerCase())
    );
    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }
    res.json(results);
});

module.exports = app;