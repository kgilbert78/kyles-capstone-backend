const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("textCredit", {
        textCreditID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteID: DT.INTEGER,
        credit: DT.STRING,
        url: DT.STRING,
    });
});