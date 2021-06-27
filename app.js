const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https')


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      },
      skip_duplicate_check:true
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/93d8b16e04";
  const options = {
    method: 'POST',
    auth:"ManuKK:07dce143a1fd0e4e63a0577327e3efaf-us8"
  };

const request =  https.request(url, options, (response) => {
    console.log(response.statusCode);
    // response.on("data",(data)=>{
    //   console.log(JSON.parse(data));
    // })
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/Failure.html")
    }
  });
  request.write(jsonData)
  request.end();

});

app.listen(process.env.PORT||3000, () => {
  console.log("Server is running on port 3000");
});

// API Key
// 123236bdde4b3d9001e81fa28a331b2d-us8

// List ID
// 93d8b16e04
