const assert = require("assert");
const app = require("../../src/app");

describe("projectProposals service", () => {
  let thisService;
  let projectProposalCreated;

  beforeEach(async () => {
    thisService = await app.service("projectProposals");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (projectProposals)");
  });

  describe("#create", () => {
    const options = {"proposalRef":"aasdfasdfasdfadsfadfa","quotation":"aasdfasdfasdfadsfadfa","approved":true,"approvedDate":1759719391885,"approvedBy":"aasdfasdfasdfadsfadfa","rejected":true,"remarks":"new value"};

    beforeEach(async () => {
      projectProposalCreated = await thisService.create(options);
    });

    it("should create a new projectProposal", () => {
      assert.strictEqual(projectProposalCreated.proposalRef, options.proposalRef);
assert.strictEqual(projectProposalCreated.quotation, options.quotation);
assert.strictEqual(projectProposalCreated.approved, options.approved);
assert.strictEqual(projectProposalCreated.approvedDate, options.approvedDate);
assert.strictEqual(projectProposalCreated.approvedBy, options.approvedBy);
assert.strictEqual(projectProposalCreated.rejected, options.rejected);
assert.strictEqual(projectProposalCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a projectProposal by ID", async () => {
      const retrieved = await thisService.get(projectProposalCreated._id);
      assert.strictEqual(retrieved._id, projectProposalCreated._id);
    });
  });

  describe("#update", () => {
    let projectProposalUpdated;
    const options = {"proposalRef":"345345345345345345345","quotation":"345345345345345345345","approved":false,"approvedDate":null,"approvedBy":"345345345345345345345","rejected":false,"remarks":"updated value"};

    beforeEach(async () => {
      projectProposalUpdated = await thisService.update(projectProposalCreated._id, options);
    });

    it("should update an existing projectProposal ", async () => {
      assert.strictEqual(projectProposalUpdated.proposalRef, options.proposalRef);
assert.strictEqual(projectProposalUpdated.quotation, options.quotation);
assert.strictEqual(projectProposalUpdated.approved, options.approved);
assert.strictEqual(projectProposalUpdated.approvedDate, options.approvedDate);
assert.strictEqual(projectProposalUpdated.approvedBy, options.approvedBy);
assert.strictEqual(projectProposalUpdated.rejected, options.rejected);
assert.strictEqual(projectProposalUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
  let projectProposalDeleted;
    beforeEach(async () => {
      projectProposalDeleted = await thisService.remove(projectProposalCreated._id);
    });

    it("should delete a projectProposal", async () => {
      assert.strictEqual(projectProposalDeleted._id, projectProposalCreated._id);
    });
  });
});