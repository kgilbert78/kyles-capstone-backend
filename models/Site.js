const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("site", {
        siteID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DT.STRING,
        text: DT.STRING,
        audioNarrationURL: DT.STRING
    });
});
