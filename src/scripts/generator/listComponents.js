const fs = require("fs");

module.exports = (type = "components") => {
  console.log("type", type);
  try {
    const names = fs.readdirSync("src/" + type);
    return names.map((i) => i.replace(".js", ""));
  } catch (e) {
    console.error(e);
  }
};
