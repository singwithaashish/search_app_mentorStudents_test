const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Ads = require("./schema/adSchema");
const company = require("./schema/companySchema");
const Company = require("./schema/companySchema");

const app = express();

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

app.post("/post", async (req, res) => {
  // console.log(req.body);
  const str = req.body.str;
    if(!str){
        res.send("Please enter a valid keyword");
        return;
    }

    // get ads and company data from the database and merge them and send it to the frontend

    const ads = await Ads.find({ primaryText: { $regex: str, $options: "i" } });
    // also merge the company data with the ads data if the company id matches
    const companyData = await db.collection("company").find().toArray();
    console.log(companyData);
    const mergedData = ads.map((ad) => {
        // console.log(ad['company_id']);
        // console.log(typeof ad['company_id'], typeof ad);
        // why cant i print the ad.company_id here
         

        // console.log(companyData[0]._id, ad.toObject().company_id);
        const company = companyData.filter((company) => { 
            // console.log(company._id.equals(ad.toObject().company_id));

            return company._id.equals(ad.toObject().company_id)
        });
        console.log(company);
        return { ...ad._doc, ...company[0] };
    });

    // const company = await Company.find({ name: { $regex: str, $options: "i" } });
    console.log(mergedData)
    // const data = [...ads, ...company];
    res.send(mergedData);
   




//   let adObj, companyObj;

//   db.collection("ads")
//     .find({
//       $or: [
//         { primaryText: { $regex: str } },
//         { headline: { $regex: str } },
//         { description: { $regex: str } },
//       ],
//     })
//     .toArray((err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       //   console.log(result);

//       //   merge result and company
//       const final = result.map(async (item) => {
//         adObj = item;

//         companyObj =  db
//           .collection("company")
//           .findOne({ _id: item.company_id }, (err, data) => {
//             if (err) {
//               console.log(err);
//             } else {
//                 // console.log(data);
//                 return data;
//             }
//           });

//           console.log(adObj, companyObj);

//         return { ...adObj, ...companyObj };
//       });
//     //   console.log(final);
    
//       res.send(final);
//     });

});
