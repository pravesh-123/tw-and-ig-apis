require("dotenv").config();
const app = require("express")();
const axios = require("axios");
const TwitterClient = require("twitter-api-client").TwitterClient;
const port = process.env.PORT || 5000;

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

app.get("/", function (req, res) {
  res.send("Welcome to the twitter and instagram api API");
});

app.get("/twitter/:query", function (req, res) {
  const query = req.params.query;
  twitterClient.tweets
    .search({
      q: query,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occured. Please try again letter");
    });
});

app.get("/instagram/:query", function (req, res) {
  const query = req.params.query;

  axios
    .get("https://www.instagram.com/explore/tags/" + query + "/?__a=1")
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred, please try again later.");
    });
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
