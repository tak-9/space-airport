const axios = require('axios');
const db = require("../models");

module.exports = function (app) {
    
    // This API gets the Capsules data from Space API. 
    // Then, returns data sorted by Launching date. 
    app.get("/api/capsules", (req, res) => {
        console.log("/api/capsules");
        let url = "https://api.spacexdata.com/v3/capsules"
        axios.get(url)
        .then(resp => {
            let data = sortDate(resp.data);
            res.json(data);
        })
        .catch(err => {
            console.log("err", err)
            res.json({msg: "Error"});
        });
    });

    // This API returns the Landing Pad data for the specified Landing Pad ID.  
    // This function peforms the following tasks:
    //  1. Checks if there's cached data in MySQL
    //  2. If there is cached data in MySQL, return it. 
    //  3. Otherwise, get data from SpaceX API and save it in MySQL. Then, return it to client. 
    app.get("/api/landpad/:id", async(req, res) => {
        console.log("/api/landpad");

        let id = (req.params.id).trim();

        // Validate parameter.
        if ( id.length > 15 || id.length === 0 ) {
            // Return error and end here.
            res.status(400).json({ "msg": "Invalid ID was specified." });
            return;
        }

        let sqlStr = 
            "SELECT la.id, la.full_name, la.status, lo.name as location_name, lo.region, lo.latitude, lo.longitude " +
            "FROM Landings la " +
            "LEFT JOIN Locations lo on lo.id = la.LocationId " +
            "WHERE la.id = '" + id + "';"

        console.log(sqlStr);
        let skipSpacexAPI = false;
        await db.sequelize.query(sqlStr, {type: db.sequelize.QueryTypes.SELECT})
        .then(function (results) {
            console.log("results", results);
            if (results.length === 0) {
                // Not Found in Cache 
                skipSpacexAPI = false;
            } else { 
                // Returns data if it's found in Cache. 
                skipSpacexAPI = true;
                res.json(results[0]);
            }
        })
        .catch(function (err) {
            console.log("catch get", err);
            res.status(400).json({ "msg": "Error in checking cache." });
            skipSpacexAPI = true;
            return;
        });
    
        if (skipSpacexAPI) {
            // Finish if data is already found in Cache.
            return;
        } else {
            let url = "https://api.spacexdata.com/v3/landpads/" + id;
            console.log(url);
            axios.get(url)
            .then(resp => {
                // Insert or Update location data
                const locationData = resp.data.location;            
                db.Location.upsert(locationData, {
                    where: {name: locationData.name}
                })
                .then(dbResult => {
                    console.log("upsert success", dbResult);
                    // Then, Insert Lading Pad data for the previous result
                    const landingData = {
                        id: resp.data.id,
                        full_name: resp.data.full_name, 
                        status: resp.data.status,
                        LocationId: dbResult[0].id
                    }
                    console.log("landingData",landingData);
                    db.Landing.create(landingData)
                    .then(() => {
                        console.log("insert done.");
                        let sendingData = {
                            id: resp.data.id,
                            full_name: resp.data.full_name,
                            status: resp.data.status,
                            location_name: resp.data.location.name, 
                            region: resp.data.location.region, 
                            latitude: resp.data.location.latitude, 
                            longitude: resp.data.location.longitude
                        }
                        res.json(sendingData);
                    })
                    .catch((err) => {
                        console.log("err",err);
                        res.status(400).json({ "msg": "Error in inserting a Landing data." });
                    });    
                })
                .catch((err) => {
                    // Error handling for Location data.
                    console.log("err",err);
                    res.status(400).json({ "msg": "Error in inserting a Location data." });
                });
            })
            .catch(err => {
                // Error handling for HTTP GET request.
                console.log("err", err);
                if (err.response.status === 404){
                    res.json({msg: "ID is not found."});
                }    
                res.json({msg: "Error"});
            });
        }
    })

}

// This sorts JSON data by Lauching date.
var sortDate = function(data) {
    let sortedData = data.sort(function(a,b){
        let capsuleA = a.original_launch_unix;
        let capsuleB = b.original_launch_unix;
        if (capsuleA < capsuleB){
            return 1;
        } else if (capsuleA > capsuleB){
            return -1;
        }
        return 0;
    })
    return sortedData;
}

