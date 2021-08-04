const DT = require("sequelize").DataTypes;

module.exports = (db => {
    return db.define("site", {
        siteID: {
            type: DT.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteText: DT.STRING,
        siteTextCredit: DT.STRING,
        siteTextCreditURL: DT.STRING,
        audioNarrationURL: DT.STRING
    });
});
