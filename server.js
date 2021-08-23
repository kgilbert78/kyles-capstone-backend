const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());

// const googleMapsAPIKey = require("../apiKeys/googleMapsAPIKey");

const {db, Site, Location, Photo, SoundEffect, TextCredit} = require("./models/db");

server.get("/", (req, res) => {
    res.send({hello: "World!"});
});

server.get("/sites/", async (req,res) => {
    let siteData = await Site.findAll({
        include: [ {model: Location} ]
    });
    res.send({siteData});
});

server.get("/sites/:id", async (req,res) => {
    let selectedSiteData = await Site.findAll({
        where: {siteID: req.params.id},
        include: [
            {model: Photo},
            {model: Location},
            {model: SoundEffect},
            {model: TextCredit}
        ]
    });
    res.send({selectedSiteData});
});

// server.post("/api", async (req, res) => {
//     //console.log(req.body);
//     // res.send({apiKey: `${googleMapsAPIKey}`});
//     res.send({googleMapsAPIKey});
// });

let port = process.env.PORT;
if (!port) {
    port = 3005;
};

server.listen(port, () => {
    console.log(`the server is listening on port ${port}`)
});