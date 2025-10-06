const assert = require("assert");
const app = require("../../src/app");

describe("proposals service", () => {
  let thisService;
  let proposalCreated;

  beforeEach(async () => {
    thisService = await app.service("proposals");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (proposals)");
  });

  describe("#create", () => {
    const options = {"proposalRef":"new value","proposalName":"new value","projectName":"aasdfasdfasdfadsfadfa","dueDate":1759719391797,"approved":true,"approvedBy":"aasdfasdfasdfadsfadfa","remarks":"new value","file":"new value"};

    beforeEach(async () => {
      proposalCreated = await thisService.create(options);
    });

    it("should create a new proposal", () => {
      assert.strictEqual(proposalCreated.proposalRef, options.proposalRef);
assert.strictEqual(proposalCreated.proposalName, options.proposalName);
assert.strictEqual(proposalCreated.projectName, options.projectName);
assert.strictEqual(proposalCreated.dueDate, options.dueDate);
assert.strictEqual(proposalCreated.approved, options.approved);
assert.strictEqual(proposalCreated.approvedBy, options.approvedBy);
assert.strictEqual(proposalCreated.remarks, options.remarks);
assert.strictEqual(proposalCreated.file, options.file);
    });
  });

  describe("#get", () => {
    it("should retrieve a proposal by ID", async () => {
      const retrieved = await thisService.get(proposalCreated._id);
      assert.strictEqual(retrieved._id, proposalCreated._id);
    });
  });

  describe("#update", () => {
    let proposalUpdated;
    const options = {"proposalRef":"updated value","proposalName":"updated value","projectName":"345345345345345345345","dueDate":null,"approved":false,"approvedBy":"345345345345345345345","remarks":"updated value","file":"updated value"};

    beforeEach(async () => {
      proposalUpdated = await thisService.update(proposalCreated._id, options);
    });

    it("should update an existing proposal ", async () => {
      assert.strictEqual(proposalUpdated.proposalRef, options.proposalRef);
assert.strictEqual(proposalUpdated.proposalName, options.proposalName);
assert.strictEqual(proposalUpdated.projectName, options.projectName);
assert.strictEqual(proposalUpdated.dueDate, options.dueDate);
assert.strictEqual(proposalUpdated.approved, options.approved);
assert.strictEqual(proposalUpdated.approvedBy, options.approvedBy);
assert.strictEqual(proposalUpdated.remarks, options.remarks);
assert.strictEqual(proposalUpdated.file, options.file);
    });
  });

  describe("#delete", () => {
  let proposalDeleted;
    beforeEach(async () => {
      proposalDeleted = await thisService.remove(proposalCreated._id);
    });

    it("should delete a proposal", async () => {
      assert.strictEqual(proposalDeleted._id, proposalCreated._id);
    });
  });
});