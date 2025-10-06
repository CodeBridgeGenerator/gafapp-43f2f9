
const proposalRef = require("./proposalRef/proposalRef.service.js");
const quoteRef = require("./quoteRef/quoteRef.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(proposalRef);
  app.configure(quoteRef);
    // ~cb-add-configure-service-name~
};
