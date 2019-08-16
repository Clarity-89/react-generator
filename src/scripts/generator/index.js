const config = require("./config");

module.exports = function(plop) {
  plop.setGenerator("component", config);
};
