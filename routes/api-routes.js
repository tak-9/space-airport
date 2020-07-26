module.exports = function (app) {
    
    app.get("/api/hello", (req, res) => {
        res.json({hello: "world"});
    });

}