const assert = require("assert");
const app = require("../../src/app");

describe("proposalRef service", () => {
  let thisService;
  let proposalRefCreated;

  beforeEach(async () => {
    thisService = await app.service("proposalRef");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (proposalRef)");
  });

  describe("#create", () => {
    const options = {"name":"new value","abbr":"new value","type":["new value"],"prefix":"new value","number":23,"suffix":23};

    beforeEach(async () => {
      proposalRefCreated = await thisService.create(options);
    });

    it("should create a new proposalRef", () => {
      assert.strictEqual(proposalRefCreated.name, options.name);
assert.strictEqual(proposalRefCreated.abbr, options.abbr);
assert.strictEqual(proposalRefCreated.type, options.type);
assert.strictEqual(proposalRefCreated.prefix, options.prefix);
assert.strictEqual(proposalRefCreated.number, options.number);
assert.strictEqual(proposalRefCreated.suffix, options.suffix);
    });
  });

  describe("#get", () => {
    it("should retrieve a proposalRef by ID", async () => {
      const retrieved = await thisService.get(proposalRefCreated._id);
      assert.strictEqual(retrieved._id, proposalRefCreated._id);
    });
  });

  describe("#update", () => {
    let proposalRefUpdated;
    const options = {"name":"updated value","abbr":"updated value","type":["updated value"],"prefix":"updated value","number":100,"suffix":100};

    beforeEach(async () => {
      proposalRefUpdated = await thisService.update(proposalRefCreated._id, options);
    });

    it("should update an existing proposalRef ", async () => {
      assert.strictEqual(proposalRefUpdated.name, options.name);
assert.strictEqual(proposalRefUpdated.abbr, options.abbr);
assert.strictEqual(proposalRefUpdated.type, options.type);
assert.strictEqual(proposalRefUpdated.prefix, options.prefix);
assert.strictEqual(proposalRefUpdated.number, options.number);
assert.strictEqual(proposalRefUpdated.suffix, options.suffix);
    });
  });

  describe("#delete", () => {
  let proposalRefDeleted;
    beforeEach(async () => {
      proposalRefDeleted = await thisService.remove(proposalRefCreated._id);
    });

    it("should delete a proposalRef", async () => {
      assert.strictEqual(proposalRefDeleted._id, proposalRefCreated._id);
    });
  });
});