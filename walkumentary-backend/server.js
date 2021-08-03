const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());

const googleMapsAPIKey = require("../apiKeys/googleMapsAPIKey");

server.get("/", (req, res) => {
    res.send({hello: "World!"});
});

server.post("/api", async (req, res) => {
    //console.log(req.body);
    // res.send({apiKey: `${googleMapsAPIKey}`});
    res.send({googleMapsAPIKey});
});

server.listen(3005, () => {
    console.log("the server is listening on port 3005")
});