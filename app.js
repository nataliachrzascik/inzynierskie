const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require('./config/dbConfig.js');


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
}
app.use(cors(corsOptions));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(dbConfig.KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  }));
  app.use(bodyParser.json({limit: "50mb"}));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Workk" });
});

require('./routes/authRoutes.js')(app);
require('./routes/userRoutes.js')(app);
require('./routes/addRecipe.js')(app);

require('./routes/getRecipes.js')(app);

require('./routes/getOneRecipe.js')(app);

require('./routes/addComment.js')(app);


require('./routes/getMyRecipes.js')(app);

require('./routes/changeMyPersonalData.js')(app);

require('./routes/getMyData.js')(app);

require('./routes/getUserProfile.js')(app);

require('./routes/addToFavourites.js')(app);

require('./routes/addToFriends.js')(app);

require('./routes/getFavouriteRecipes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
      
    }
  });
}

