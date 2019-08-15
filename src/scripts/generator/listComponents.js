const fs = require("fs");
const path = require("path");

module.exports = () => {
    const names = fs.readdirSync(
        path.join(__dirname, `../../components`)
    );
    return names//.filter(name => name !== ".DS_Store");
};
