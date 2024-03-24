const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("loginReg"));
app.use(express.static("crop care"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://localhost:27017/acm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => console.log("error"));
db.once("open", () => console.log("successful"));

// app.post("/registerdone", (req, res) => {

//     console.log("hey started ");
//     const name = req.body.name;
//     const cropName = req.body.crop;
//     // const date = req.body.date;
//     const district = req.body.cities;
//     const region = req.body.location;
//     const landArea = req.body.land_area;
//     const username = req.body.username;
//     const password = req.body.password;
//     const newUser = {
//         "name": name,
//         "cropName": cropName,
//         // "date": date,
//         "district": district,
//         "region": region,
//         "landArea": landArea,
//         "username": username,
//         "password": password
//     };
//     db.collection('users').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log("done")
//     })
//     // res.send('<h1> fifnaoidn </h1>')
//     return res.redirect('demo.html')
// });

app.post("/registerdone", (req, res) => {
  console.log("hey started ");
  const name = req.body.name;
  const cropName = req.body.crop;
  // const date = req.body.date;
  const district = req.body.cities;
  const username = req.body.username;
  const password = req.body.password;
  const checked = ["0","0"];

  const newUser = {
    name: name,
    cropName: cropName,
    // "date": date,
    district: district,
    username: username,
    password: password,
    checked: checked,
  };
  db.collection("users").insertOne(newUser, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("done data successfully ");
    // res.send('Done successfully')
    // return res.redirect('demo.html');
  });
});

app.post("/retrieveData", async (req, res) => {
  try {
    // Extract username and password from request parameters
    const { username, password } = req.body;

    // Find the user with the provided username and password
    const user = await db.collection("users").findOne({ username, password });

    if (!user) {
      // If user not found, return an error response

      return res.status(404).json({ message: "User not found" });
    }

    let checked = user;
    
    // If user found, return the user data
    res.status(200).json({ checked });
    // res.redirect("E:\remastered\crop care\demo.html");
  } catch (error) {
    // If any error occurs, return an error response
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
});


// app.put("/updateVector",  async (req, res) => {
//   const { username, password, updatedVector } = req.body;

//   // Find the user with the provided username and password
//   const user = await db.collection("users").findOne({ username, password });

//   if (user) {
//     // Update the user's vector
//     user.checked = nek;
//     res.status(200).json({ message: "Vector updated successfully." });
//   } else {
//     res.status(404).json({ error: "User not found or invalid credentials." });
//   }
// });

app.put("/updateVector", async (req, res) => {
  const { username, password, updatedVector } = req.body;

  // Find the user with the provided username and password
  const user = await db.collection("users").findOne({ username, password });

  if (user) {
    // Update the user's vector
    await db.collection("users").updateOne(
      { username, password },
      { $set: { checked: updatedVector } }
    );
    
    res.status(200).json({ message: "Vector updated successfully." });
  } else {
    res.status(404).json({ error: "User not found or invalid credentials." });
  }
});

app.post('/getCheckedData',  async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in the database
    const user = await db.collection("users").findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Return the checked data for the user
    res.json({ checked: user.checked });
  } catch (error) {
    console.error('Error retrieving checked data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve checked data' });
  }
});


app
  .get("/", (req, res) => {
    // res.set({
    //     "Allow-access-Allow-Origin": '*'
    // })
    // return res.redirect('register.html')
    res.send("<h1> they uahd;oiln    </h1>");
  })
  .listen(3000);
