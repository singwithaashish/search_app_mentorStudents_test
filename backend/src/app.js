const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Ads = require("./schema/adSchema");

const app = express();

// connecting to mongodb atlas, shared cluster
mongoose
  .connect(
    "mongodb+srv://singwithaashish:root0000@cluster0.ovptt.mongodb.net/newdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all the ads with the keyword
app.post("/post", async (req, res) => {
  // console.log(req.body);
  const str = req.body.str;
  // if(!str){
  //     res.status(400).json({message:"Please enter a keyword"});
  //     // res.send("Please enter a valid keyword");
  //     return;
  // }

  // get ads and company data from the database and merge them 
  // with respective company info and send it to the frontend

  const ads = await Ads.find({
    $or: [
      { primaryText: { $regex: str, $options: "i" } },
      { headline: { $regex: str, $options: "i" } },
      { description: { $regex: str, $options: "i" } },
    ],
  });
  const companyData = await db.collection("company").find().toArray();
  // console.log(companyData);
  
  // also merge the company data with the ads data if the company id matches
  //lookup would work better here but it's not working so i'm using a for loop
  const mergedData = ads.map((ad) => {
    //  compare each ad with the company data and merge them
    const company = companyData.filter((company) => {
      return company._id.equals(ad.toObject().company_id);
    });
    // console.log(company);
    return { ...ad._doc, ...company[0] };
  });

  // if we are searching for company name too, then 
  // we can use the below code and another for loop to match and merge the data with ads
  // const company = await Company.find({ name: { $regex: str, $options: "i" } });
  res.send(mergedData);
});
