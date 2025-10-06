const assert = require("assert");
const app = require("../../src/app");

describe("quotes service", () => {
  let thisService;
  let quoteCreated;

  beforeEach(async () => {
    thisService = await app.service("quotes");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (quotes)");
  });

  describe("#create", () => {
    const options = {"quoteNo":"new value","projectName":"aasdfasdfasdfadsfadfa","applicationCost":23,"supportCost":23,"firstMilestonePayment":23,"secondMilestonePayment":23,"thirdMilestonePayment":23,"fourthMilestonePayment":23,"fifthMilestonePayment":23,"applicationCostSST":23,"supportCostSST":23,"revision":23,"approved":true,"approvedBy":"aasdfasdfasdfadsfadfa","file":"new value"};

    beforeEach(async () => {
      quoteCreated = await thisService.create(options);
    });

    it("should create a new quote", () => {
      assert.strictEqual(quoteCreated.quoteNo, options.quoteNo);
assert.strictEqual(quoteCreated.projectName, options.projectName);
assert.strictEqual(quoteCreated.applicationCost, options.applicationCost);
assert.strictEqual(quoteCreated.supportCost, options.supportCost);
assert.strictEqual(quoteCreated.firstMilestonePayment, options.firstMilestonePayment);
assert.strictEqual(quoteCreated.secondMilestonePayment, options.secondMilestonePayment);
assert.strictEqual(quoteCreated.thirdMilestonePayment, options.thirdMilestonePayment);
assert.strictEqual(quoteCreated.fourthMilestonePayment, options.fourthMilestonePayment);
assert.strictEqual(quoteCreated.fifthMilestonePayment, options.fifthMilestonePayment);
assert.strictEqual(quoteCreated.applicationCostSST, options.applicationCostSST);
assert.strictEqual(quoteCreated.supportCostSST, options.supportCostSST);
assert.strictEqual(quoteCreated.revision, options.revision);
assert.strictEqual(quoteCreated.approved, options.approved);
assert.strictEqual(quoteCreated.approvedBy, options.approvedBy);
assert.strictEqual(quoteCreated.file, options.file);
    });
  });

  describe("#get", () => {
    it("should retrieve a quote by ID", async () => {
      const retrieved = await thisService.get(quoteCreated._id);
      assert.strictEqual(retrieved._id, quoteCreated._id);
    });
  });

  describe("#update", () => {
    let quoteUpdated;
    const options = {"quoteNo":"updated value","projectName":"345345345345345345345","applicationCost":100,"supportCost":100,"firstMilestonePayment":100,"secondMilestonePayment":100,"thirdMilestonePayment":100,"fourthMilestonePayment":100,"fifthMilestonePayment":100,"applicationCostSST":100,"supportCostSST":100,"revision":100,"approved":false,"approvedBy":"345345345345345345345","file":"updated value"};

    beforeEach(async () => {
      quoteUpdated = await thisService.update(quoteCreated._id, options);
    });

    it("should update an existing quote ", async () => {
      assert.strictEqual(quoteUpdated.quoteNo, options.quoteNo);
assert.strictEqual(quoteUpdated.projectName, options.projectName);
assert.strictEqual(quoteUpdated.applicationCost, options.applicationCost);
assert.strictEqual(quoteUpdated.supportCost, options.supportCost);
assert.strictEqual(quoteUpdated.firstMilestonePayment, options.firstMilestonePayment);
assert.strictEqual(quoteUpdated.secondMilestonePayment, options.secondMilestonePayment);
assert.strictEqual(quoteUpdated.thirdMilestonePayment, options.thirdMilestonePayment);
assert.strictEqual(quoteUpdated.fourthMilestonePayment, options.fourthMilestonePayment);
assert.strictEqual(quoteUpdated.fifthMilestonePayment, options.fifthMilestonePayment);
assert.strictEqual(quoteUpdated.applicationCostSST, options.applicationCostSST);
assert.strictEqual(quoteUpdated.supportCostSST, options.supportCostSST);
assert.strictEqual(quoteUpdated.revision, options.revision);
assert.strictEqual(quoteUpdated.approved, options.approved);
assert.strictEqual(quoteUpdated.approvedBy, options.approvedBy);
assert.strictEqual(quoteUpdated.file, options.file);
    });
  });

  describe("#delete", () => {
  let quoteDeleted;
    beforeEach(async () => {
      quoteDeleted = await thisService.remove(quoteCreated._id);
    });

    it("should delete a quote", async () => {
      assert.strictEqual(quoteDeleted._id, quoteCreated._id);
    });
  });
});