const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require('path');
// const dbConfig = require('./config/dbConfig.js');


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
}
app.use(cors(corsOptions));

const db = require("./models");
const Role = db.role;
let dev_db_url = process.env.URL;
var mongoDB = dev_db_url;
db.mongoose
  .connect(mongoDB, {
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../recipes-api/build')));
app.use(fileUpload())
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../recipes-api/build', "index.html"));
});


// simple route
/*
app.get("/", (req, res) => {
  res.json({ message: "Workk" });
});
*/
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

