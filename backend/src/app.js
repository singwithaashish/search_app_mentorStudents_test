const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Ads = require("./schema/adSchema");
const Company = require("./schema/companySchema");

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

const allAds = [
  {
    _id: new mongoose.Types.ObjectId(1),
    companyId: mongoose.Types.ObjectId(3),
    primaryText:
      "The world’s leading CRM is ready to help you simplify the business part of your small business.",
    headline: "Salesforce for Small Business",
    description: "",
    CTA: "Sign Up",
    imageUrl:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t39.35426-6/272836524_2153961231425063_357450253016481676_n.jpg?stp=dst-jpg_s600x600&_nc_cat=104&ccb=1-7&_nc_sid=cf96c8&_nc_ohc=L2Nkkg2Lb7AAX8MFWMk&_nc_ht=scontent-lax3-1.xx&oh=00_AT-m5FwsdNtjj4Eg_tpLTCYnXD2agiVZIYmPNukPVcQpgg&oe=62FF1CFB",
  },
  {
    _id: new mongoose.Types.ObjectId(2),
    companyId: mongoose.Types.ObjectId(1),
    primaryText: "We like where you’re going with this.",
    headline: "Relaxed Fit Men's Jeans",
    description: "",
    CTA: "Shop Now",
    imageUrl:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t39.35426-6/297056300_1098850614360880_7719182279313061464_n.jpg?stp=dst-jpg_s600x600&_nc_cat=103&ccb=1-7&_nc_sid=cf96c8&_nc_ohc=y0IRCnVjgnAAX8Vz5rJ&_nc_ht=scontent-lax3-2.xx&oh=00_AT-6MIPQ__gu4AosQBPinBW71pjMZHjJ14d7X2xhty19mw&oe=63007FD1",
  },
  {
    _id: new mongoose.Types.ObjectId(3),
    companyId: mongoose.Types.ObjectId(6),
    primaryText:
      "Teva x Cotopaxi is back! Celebrate eternal summer with limited-edition Teva x Cotopaxi Original Universal sandals in bold new colors.",
    headline: "Made With Recycled Plastic",
    description: "Shop Back to School",
    CTA: "Shop Now",
    imageUrl:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t39.35426-6/296247001_392403992997238_7327211414597606199_n.jpg?stp=dst-jpg_s600x600&_nc_cat=104&ccb=1-7&_nc_sid=cf96c8&_nc_ohc=QlN1G9nM7nYAX-JunVb&_nc_ht=scontent-lax3-1.xx&oh=00_AT-fENwnbjJAngpV9vMy-HaoKzbn5XsxIoM4d9tQDDPWEA&oe=62FF50DC",
  },
  {
    _id: new mongoose.Types.ObjectId(4),
    companyId: mongoose.Types.ObjectId(7),
    primaryText:
      "The Emmy-nominated Netflix comedy special from the late Norm Macdonald is his last gift to the world of comedy he helped shape.",
    headline:
      "Norm Macdonald's Nothing Special gives one last dose of the late comic",
    description: "",
    CTA: "Learn More",
    imageUrl:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t39.35426-6/296023475_332375312347388_3924863146678994082_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=cf96c8&_nc_ohc=KYQlzunjx9MAX-YBZfp&_nc_oc=AQm0vqkVTA7QVYRHa00mFs9NMAChCZRzj143lJU6yr-iRnt1CrkdQvVzUcrsxG90kHE&_nc_ht=scontent-lax3-1.xx&oh=00_AT-TONymC6eNnIvMeRq2A-Odqw0Dk7pBIKqQ13EsIKa7LA&oe=62FF3566",
  },
  {
    _id: new mongoose.Types.ObjectId(5),
    companyId: mongoose.Types.ObjectId(9),
    primaryText: "Visit Valentino.com, discover the new products and shop now!",
    headline: "Valentino Hexagonal Metal Frame With Crystal Studs",
    description: "",
    CTA: "Shop Now",
    imageUrl:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t39.35426-6/295545782_1501904116912531_2564597444359522766_n.jpg?stp=dst-jpg_s600x600&_nc_cat=100&ccb=1-7&_nc_sid=cf96c8&_nc_ohc=n_BrJWHf6S0AX9KUzGW&_nc_oc=AQm0vqkVTA7QVYRHa00mFs9NMAChCZRzj143lJU6yr-iRnt1CrkdQvVzUcrsxG90kHE&_nc_ht=scontent-lax3-2.xx&oh=00_AT-byQJE7TypSo58sFOSRn2DVhFlM-TdoVZ9rkjpvAhGxw&oe=62FFFB74",
  },
  {
    _id: new mongoose.Types.ObjectId(6),
    companyId: mongoose.Types.ObjectId(11),
    primaryText:
      "Say ‘goodnight’ to sleeping hot 🔥 with Purple products—designed to dissipate heat.",
    headline: "Cooler Summers Start Here",
    description: "Shop Purple products, designed to help you sleep cool.",
    CTA: "Shop Now",
    imageUrl:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t39.35426-6/295952890_1671560623216826_2304515553891168883_n.jpg?stp=dst-jpg_s600x600&_nc_cat=110&ccb=1-7&_nc_sid=cf96c8&_nc_ohc=cxCpVQU4KEoAX8ZeADM&_nc_ht=scontent-lax3-1.xx&oh=00_AT_yqHN6f4Xpwz5Vawp6yDUXbi_M6yVJBpsXe6jXoPnoCw&oe=62FFD379",
  },
  {
    _id: new mongoose.Types.ObjectId(7),
    companyId: mongoose.Types.ObjectId(10),
    primaryText:
      '"Dark spots. Breakouts. Rosacea. Dull skin. Fine lines. Our formulas are custom-mixed for YOUR skin concerns.\n\n"',
    headline: "Personalized skincare for dark spots, acne, and more.",
    description:
      "Personalized skincare for dark spots, acne, and more. Results may vary.",
    CTA: "Order Now",
    imageUrl:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t39.35426-6/298835616_563732085536335_7113503346690249142_n.jpg?stp=dst-jpg_s600x600&_nc_cat=108&ccb=1-7&_nc_sid=cf96c8&_nc_ohc=nXsMZPD0JTQAX_r8Gfw&_nc_ht=scontent-lax3-1.xx&oh=00_AT_bJ5VcASg2TI_omgXNjXAvNKWCQiT6fBff7IJscF4mdg&oe=62FFF7AF",
  },
];

const comp = [
  {
    _id: new mongoose.Types.ObjectId(1),
    name: "Levi's",
    url: "levis.com",
  },
  {
    _id: new mongoose.Types.ObjectId(2),
    name: "Puma",
    url: "puma.com",
  },
  {
    _id: new mongoose.Types.ObjectId(3),
    name: "Salesforce",
    url: "salesforce.com",
  },
  {
    _id: new mongoose.Types.ObjectId(4),
    name: "Adidas",
    url: "adidas.com",
  },
  {
    _id: new mongoose.Types.ObjectId(5),
    name: "Nike",
    url: "nike.com",
  },
  {
    _id: new mongoose.Types.ObjectId(6),
    name: "Cotopaxi",
    url: "cotopaxi.com",
  },
  {
    _id: new mongoose.Types.ObjectId(7),
    name: "Netflix",
    url: "netflix.com",
  },
  {
    _id: new mongoose.Types.ObjectId(8),
    name: "Colgate",
    url: "colgate.com",
  },
  {
    _id: new mongoose.Types.ObjectId(9),
    name: "Valentino",
    url: "valentino.com",
  },
  {
    _id: new mongoose.Types.ObjectId(10),
    name: "Curology",
    url: "curology.com",
  },
  {
    _id: new mongoose.Types.ObjectId(11),
    name: "Purple",
    url: "purple.com",
  },
];

function addDataToDB() {
  Ads.insertMany(allAds);
  Company.insertMany(comp);
}

// insert ads with respective companies
// function addCompaniesWithAds() {
//   // add a company, get its id, add a ad with that id
//   allCompanies.map((company, i) => {
//     const newCompany = new Company({
//       name: company.name,
//       url: company.url,
//     });
//     newCompany.save();
//     const companyId = newCompany._id;
//     const ad = new Ads({
//       companyId: companyId,
//       primaryText: allAds[i].primaryText,
//       headline: allAds[i].headline,
//       description: allAds[i].description,
//       CTA: allAds[i].CTA,
//       imageUrl: allAds[i].imageUrl,
//     });
//     ad.save();
//   });
// }

// get all the ads with the keyword
app.post("/post", async (req, res) => {
  // addDataToDB();
  const str = req.body.str;
  // if(!str){
  //     res.status(400).json({message:"Please enter a keyword"});
  //     // res.send("Please enter a valid keyword");
  //     return;
  // }

  // search across ads and companies collections

  const ads = await Ads.find({
    $or: [
      { primaryText: { $regex: str, $options: "i" } },
      { headline: { $regex: str, $options: "i" } },
      { description: { $regex: str, $options: "i" } },
    ],
  })
    .populate("companyId")
    .exec();

  const cmp = await Ads.aggregate([
    {
      $lookup: {
        from: "companies", // collection name in db
        localField: "companyId",
        foreignField: "_id",
        as: "companyId",
      },
    },
    {
      $unwind: "$company",
    },
    {
      $match: {
        "company.name": str,
      },
    },
  ]);

  if (!ads.includes(cmp) && cmp.length > 0) {
    ads.push(cmp);
  }
  console.log(ads);
  res.status(200).send(ads);
});
