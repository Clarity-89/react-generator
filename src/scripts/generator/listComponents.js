const fs = require("fs");
const path = require("path");

module.exports = app => {
    const names = fs.readdirSync(
        path.join(__dirname, `../../${app}/components`)
    );
    return names.filter(name => name !== ".DS_Store");
};
