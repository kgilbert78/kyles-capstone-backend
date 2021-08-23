const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const auth0Domain = 'https://dev-oh-yzpnl.us.auth0.com';

const checkPermissions = (permissions) => {
  return jwtAuthz(permissions, {
    customScopeKey: "permissions",
    checkAllScopes: true,
    failWithError: false
  });
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0Domain}/.well-known/jwks.json`
  }),

  audience: `https://walkumentary-syracuse-backend.herokuapp.com/`,
  issuer: [`${auth0Domain}/`],
  algorithms: ['RS256']
});


// const googleMapsAPIKey = require("../apiKeys/googleMapsAPIKey");

const {db, Site, Location, Photo, SoundEffect, TextCredit} = require("./models/db");

server.get("/", (req, res) => {
    res.send({hello: "World!"});
});

server.get("/sites/", checkJwt, async (req,res) => {
    let siteData = await Site.findAll({
        include: [ {model: Location} ]
    });
    res.send({siteData});
});

server.get("/sites/:id", checkJwt, async (req,res) => {
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