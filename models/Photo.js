const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("photo", {
        photoID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteID: DT.INTEGER,
        url: DT.STRING,
        caption: DT.TEXT,
        credit: DT.STRING,
        creditURL: DT.STRING,
        altTag: DT.TEXT
    });
});
