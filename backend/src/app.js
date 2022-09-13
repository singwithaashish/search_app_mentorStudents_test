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

    // get ads and company data from the database and merge them and send it to the frontend

    const ads = await Ads.find({ primaryText: { $regex: str, $options: "i" } });
    // also merge the company data with the ads data if the company id matches
    const companyData = await db.collection("company").find().toArray();
    console.log(companyData);
    const mergedData = ads.map((ad) => {
      //  compare each ad with the company data and merge them
        const company = companyData.filter((company) => { 
            return company._id.equals(ad.toObject().company_id)
        });
        console.log(company);
        return { ...ad._doc, ...company[0] };
    });

    // const company = await Company.find({ name: { $regex: str, $options: "i" } });
    console.log(mergedData)
    // const data = [...ads, ...company];
    res.send(mergedData);

});
