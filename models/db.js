const Sequelize = require("sequelize");

let db;

let dbURL = process.env.DATABASE_URL;
if (!dbURL) {
    db = new Sequelize("postgres://kylegilbert@localhost:5432/walkumentarysyracusecic", {
        logging: false,
        dialect: "postgres",
        protocol: "postgres"
    });
} else {
    db = new Sequelize(dbURL, {
        logging: false,
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // very important
            }
        }
    });
}

const Site = require("./Site")(db);
const Location = require("./Location")(db);
const Photo = require("./Photo")(db);
const SoundEffect = require("./SoundEffect")(db);
const TextCredit = require("./TextCredit")(db);

(async () => {
    await db.authenticate();
    console.log("Walkumentary Syracuse database is connected");

    Site.hasOne(Location, {foreignKey: "siteID"});
    Site.hasMany(Photo, {foreignKey: "siteID"});
    Site.hasMany(SoundEffect, {foreignKey: "siteID"});
    Site.hasMany(TextCredit, {foreignKey: "siteID"});

    await db.sync({force: true}); // when adding columns: db.sync({force: true})

    const sites = await Site.findAll();
    if (sites.length===0){
        const newSite = await Site.create({
            name: "Capstone",
            text: "My first site",
            credit: "Kyle",
            creditURL: "heroku.com",
            audioNarrationURL: "audio.mp3"});

        await Location.create({
            siteID: newSite.siteID,
            latForMapDisplay: 43.0472300,
            lngForMapDisplay: -76.1508000,
            latForGeolocation: 43.0472300,
            lngForGeolocation: -76.1508000,
            popUpDescription: "Brief description goes here",
            timesVisited: 1
        });

        await Photo.create({
            siteID: newSite.siteID,
            url: "google.com",
            caption: "caption",
            credit: "credit",
            creditURL: "url",
            altTag: "alt"
        });

        await SoundEffect.create({
            siteID: newSite.siteID,
            name: "horse & carriage",
            url: "audio/horseCarriage.mp3",
            credit: "credit",
            creditURL: "url"
        });
        
        await TextCredit.create({
            siteID: newSite.siteID,
            url: "google.com",
            credit: "credit",
            creditURL: "url"
        });

    };
})();

module.exports = {db, Site, Location, Photo, SoundEffect, TextCredit};