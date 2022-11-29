const express = require('express');
const app = express();
const port = 4000
require("dotenv/config") // NOTE: this package to can use process.env.DB_STRING
const cors =  require('cors');
const path = require("path");
const mongoose = require('mongoose');
const route = require('./src/routes');

app.use(cors({origin : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
// ROUTE init
route(app);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser : true});
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`ERROR: ${error}`)
})

app.listen(process.env.PORT || port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

