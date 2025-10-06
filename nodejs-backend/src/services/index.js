const projects = require("./projects/projects.service.js");
const contacts = require("./contacts/contacts.service.js");
const proposals = require("./proposals/proposals.service.js");
const quotes = require("./quotes/quotes.service.js");
const projectProposals = require("./projectProposals/projectProposals.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(projects);
  app.configure(contacts);
  app.configure(proposals);
  app.configure(quotes);
  app.configure(projectProposals);
  // ~cb-add-configure-service-name~
};
