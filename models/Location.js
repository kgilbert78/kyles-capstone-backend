const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("location", {
        locationID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteID: DT.INTEGER,
        latForMapDisplay: DT.DECIMAL,
        lngForMapDisplay: DT.DECIMAL,
        latForGeolocation: DT.DECIMAL,
        lngForGeolocation: DT.DECIMAL,
        popUpDescription: DT.TEXT,
        timesVisited: DT.INTEGER
    });
});