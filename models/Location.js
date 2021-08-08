const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("location", {
        locationID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteID: DT.INTEGER,
        latForMapDisplay: DT.FLOAT,
        lngForMapDisplay: DT.FLOAT,
        latForGeolocation: DT.FLOAT,
        lngForGeolocation: DT.FLOAT,
        popUpDescription: DT.STRING,
        timesVisited: DT.INTEGER
    });
});