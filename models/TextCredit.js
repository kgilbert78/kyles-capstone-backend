const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("textCredit", {
        textCreditID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteID: DT.INTEGER,
        url: DT.STRING,
        credit: DT.STRING,
        creditURL: DT.STRING,
    });
});