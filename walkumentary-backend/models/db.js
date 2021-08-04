const Sequelize = require("sequelize");
const db = new Sequelize("postgres://kylegilbert@localhost:5432/walkumentarysyracusecic", {logging: false});

const Site = require("./Site")(db);

(async () => {
    await db.authenticate();
    console.log("Walkumentary Syracuse database is connected");

    db.sync();
})();

module.exports = {db, Site};