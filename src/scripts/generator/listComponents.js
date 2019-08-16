const fs = require("fs");
const path = require("path");

module.exports = () => {
  return fs.readdirSync(path.join(__dirname, `../../components`));
};
