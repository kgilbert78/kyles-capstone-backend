const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("soundEffect", {
        soundEffectID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteID: DT.INTEGER,
        name: DT.STRING,
        caption: DT.STRING,
        url: DT.STRING,
        credit: DT.STRING,
        creditURL: DT.STRING
    });
});