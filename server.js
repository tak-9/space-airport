var express = require("express");
var db = require("./models");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets 
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes for API 
require("./routes/api-routes.js")(app);

// Send every other request to the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//db.sequelize.sync({force:true})
db.sequelize.sync({})
.then(function() {
    app.listen(PORT, async function() {
        console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});    
