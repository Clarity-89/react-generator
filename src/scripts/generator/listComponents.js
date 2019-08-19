const fs = require("fs");

module.exports = (type = "components") => {
  const names = fs.readdirSync("src/" + type);
  return names.map(i => i.replace(".js", ""));
};
