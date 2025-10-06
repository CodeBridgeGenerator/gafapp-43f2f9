const assert = require("assert");
const app = require("../../src/app");

describe("projects service", () => {
  let thisService;
  let projectCreated;

  beforeEach(async () => {
    thisService = await app.service("projects");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (projects)");
  });

  describe("#create", () => {
    const options = {"company":"aasdfasdfasdfadsfadfa","contact":"aasdfasdfasdfadsfadfa","projectName":"new value","idGAF":"new value","title":"new value","problemStatement":"new value","relevantAITechnologies":"new value","expectedOutcomes":"new value","currentSolutions":"new value","targetUsers":"new value","dataAvailability":"new value","requirements":"new value","budgetAllocation":"new value","referredCollaborationTimeline":"new value","tags":"new value","founded":"new value","headquarters":"new value","deadline":"new value","daysRemaining":"new value","budget":"new value","category":"new value","enterprise":"new value","posted":"new value","others":"new value","path":"new value"};

    beforeEach(async () => {
      projectCreated = await thisService.create(options);
    });

    it("should create a new project", () => {
      assert.strictEqual(projectCreated.company, options.company);
assert.strictEqual(projectCreated.contact, options.contact);
assert.strictEqual(projectCreated.projectName, options.projectName);
assert.strictEqual(projectCreated.idGAF, options.idGAF);
assert.strictEqual(projectCreated.title, options.title);
assert.strictEqual(projectCreated.problemStatement, options.problemStatement);
assert.strictEqual(projectCreated.relevantAITechnologies, options.relevantAITechnologies);
assert.strictEqual(projectCreated.expectedOutcomes, options.expectedOutcomes);
assert.strictEqual(projectCreated.currentSolutions, options.currentSolutions);
assert.strictEqual(projectCreated.targetUsers, options.targetUsers);
assert.strictEqual(projectCreated.dataAvailability, options.dataAvailability);
assert.strictEqual(projectCreated.requirements, options.requirements);
assert.strictEqual(projectCreated.budgetAllocation, options.budgetAllocation);
assert.strictEqual(projectCreated.referredCollaborationTimeline, options.referredCollaborationTimeline);
assert.strictEqual(projectCreated.tags, options.tags);
assert.strictEqual(projectCreated.founded, options.founded);
assert.strictEqual(projectCreated.headquarters, options.headquarters);
assert.strictEqual(projectCreated.deadline, options.deadline);
assert.strictEqual(projectCreated.daysRemaining, options.daysRemaining);
assert.strictEqual(projectCreated.budget, options.budget);
assert.strictEqual(projectCreated.category, options.category);
assert.strictEqual(projectCreated.enterprise, options.enterprise);
assert.strictEqual(projectCreated.posted, options.posted);
assert.strictEqual(projectCreated.others, options.others);
assert.strictEqual(projectCreated.path, options.path);
    });
  });

  describe("#get", () => {
    it("should retrieve a project by ID", async () => {
      const retrieved = await thisService.get(projectCreated._id);
      assert.strictEqual(retrieved._id, projectCreated._id);
    });
  });

  describe("#update", () => {
    let projectUpdated;
    const options = {"company":"345345345345345345345","contact":"345345345345345345345","projectName":"updated value","idGAF":"updated value","title":"updated value","problemStatement":"updated value","relevantAITechnologies":"updated value","expectedOutcomes":"updated value","currentSolutions":"updated value","targetUsers":"updated value","dataAvailability":"updated value","requirements":"updated value","budgetAllocation":"updated value","referredCollaborationTimeline":"updated value","tags":"updated value","founded":"updated value","headquarters":"updated value","deadline":"updated value","daysRemaining":"updated value","budget":"updated value","category":"updated value","enterprise":"updated value","posted":"updated value","others":"updated value","path":"updated value"};

    beforeEach(async () => {
      projectUpdated = await thisService.update(projectCreated._id, options);
    });

    it("should update an existing project ", async () => {
      assert.strictEqual(projectUpdated.company, options.company);
assert.strictEqual(projectUpdated.contact, options.contact);
assert.strictEqual(projectUpdated.projectName, options.projectName);
assert.strictEqual(projectUpdated.idGAF, options.idGAF);
assert.strictEqual(projectUpdated.title, options.title);
assert.strictEqual(projectUpdated.problemStatement, options.problemStatement);
assert.strictEqual(projectUpdated.relevantAITechnologies, options.relevantAITechnologies);
assert.strictEqual(projectUpdated.expectedOutcomes, options.expectedOutcomes);
assert.strictEqual(projectUpdated.currentSolutions, options.currentSolutions);
assert.strictEqual(projectUpdated.targetUsers, options.targetUsers);
assert.strictEqual(projectUpdated.dataAvailability, options.dataAvailability);
assert.strictEqual(projectUpdated.requirements, options.requirements);
assert.strictEqual(projectUpdated.budgetAllocation, options.budgetAllocation);
assert.strictEqual(projectUpdated.referredCollaborationTimeline, options.referredCollaborationTimeline);
assert.strictEqual(projectUpdated.tags, options.tags);
assert.strictEqual(projectUpdated.founded, options.founded);
assert.strictEqual(projectUpdated.headquarters, options.headquarters);
assert.strictEqual(projectUpdated.deadline, options.deadline);
assert.strictEqual(projectUpdated.daysRemaining, options.daysRemaining);
assert.strictEqual(projectUpdated.budget, options.budget);
assert.strictEqual(projectUpdated.category, options.category);
assert.strictEqual(projectUpdated.enterprise, options.enterprise);
assert.strictEqual(projectUpdated.posted, options.posted);
assert.strictEqual(projectUpdated.others, options.others);
assert.strictEqual(projectUpdated.path, options.path);
    });
  });

  describe("#delete", () => {
  let projectDeleted;
    beforeEach(async () => {
      projectDeleted = await thisService.remove(projectCreated._id);
    });

    it("should delete a project", async () => {
      assert.strictEqual(projectDeleted._id, projectCreated._id);
    });
  });
});