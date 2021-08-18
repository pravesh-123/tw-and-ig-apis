require("dotenv").config();
const app = require("express")();
const axios = require("axios");
const cors = require("cors");
const port = process.env.PORT || 5000;
var Twit = require('twit');  
var Twitter = require('twitter');


app.use(cors({ origin: "*" }));

app.get("/", function (req, res) {
  res.send("Welcome to the twitter and instagram api API");
});
// var T = new Twit({
//   consumer_key: process.env.TWITTER_API_KEY ,
//   consumer_secret: process.env.TWITTER_API_SECRET,
//   access_token: process.env.TWITTER_ACCESS_TOKEN,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
//   timeout_ms:  60*1000 
// });
// T.get(
//   "search/tweets",
//   { q: "givingtuesdayca ", count: 30, result_type: "recent" },
//   function (err, data, response) {
//     console.log(data);
//   }
// );
var client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get('/tweet', function(req, res, next) {
  client.get('statuses/user_timeline', { screen_name: 'GivingTuesdayCa', count: 30, result_type:'recent' }, function(error, tweets, response) {
    if (!error) {
      var result=[];
     tweets.map(data=>{
       var newdata=data.entities.urls
       newdata.map(list=>{
          var tweetData={
            text:data.text,
            expanded_url:list.expanded_url
          }
          result.push(tweetData);
       })
     })
     res.send({
       status:true,
      data:result
      })
      
    }
    else {
      res.status(500).json({ error: error });
    }
  });
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

// exports.getTweets = async (req, res) => {
//   T.get(
//     "search/tweets",
//     { q: "givingtuesdayca ", count: 10, result_type: "recent" },
//     function (err, data, response) {
//       console.log(data);
//       res.send(data);
//     }
//   );
// };