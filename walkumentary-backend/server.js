const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());

// const googleMapsAPIKey = require("../apiKeys/googleMapsAPIKey");

const {db, Site} = require("./models/db");
// const Op = require("sequelize").Op;

server.get("/", (req, res) => {
    res.send({hello: "World!"});
});

server.post("/site", (req, res) => {
    console.log(req.body);
    res.send(req.body);
    // res.send({ site: Site.findAll({
    //     where: {
    //         siteName: { Op.iLike: `${req.body.query}` }
    //     }})
    // });
});

// server.post("/api", async (req, res) => {
//     //console.log(req.body);
//     // res.send({apiKey: `${googleMapsAPIKey}`});
//     res.send({googleMapsAPIKey});
// });

server.listen(3005, () => {
    console.log("the server is listening on port 3005")
});