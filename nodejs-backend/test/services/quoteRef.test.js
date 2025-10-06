const assert = require("assert");
const app = require("../../src/app");

describe("quoteRef service", () => {
  let thisService;
  let quoteRefCreated;

  beforeEach(async () => {
    thisService = await app.service("quoteRef");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (quoteRef)");
  });

  describe("#create", () => {
    const options = {"name":"new value","abbr":"new value","type":["new value"],"prefix":"new value","number":23,"suffix":23};

    beforeEach(async () => {
      quoteRefCreated = await thisService.create(options);
    });

    it("should create a new quoteRef", () => {
      assert.strictEqual(quoteRefCreated.name, options.name);
assert.strictEqual(quoteRefCreated.abbr, options.abbr);
assert.strictEqual(quoteRefCreated.type, options.type);
assert.strictEqual(quoteRefCreated.prefix, options.prefix);
assert.strictEqual(quoteRefCreated.number, options.number);
assert.strictEqual(quoteRefCreated.suffix, options.suffix);
    });
  });

  describe("#get", () => {
    it("should retrieve a quoteRef by ID", async () => {
      const retrieved = await thisService.get(quoteRefCreated._id);
      assert.strictEqual(retrieved._id, quoteRefCreated._id);
    });
  });

  describe("#update", () => {
    let quoteRefUpdated;
    const options = {"name":"updated value","abbr":"updated value","type":["updated value"],"prefix":"updated value","number":100,"suffix":100};

    beforeEach(async () => {
      quoteRefUpdated = await thisService.update(quoteRefCreated._id, options);
    });

    it("should update an existing quoteRef ", async () => {
      assert.strictEqual(quoteRefUpdated.name, options.name);
assert.strictEqual(quoteRefUpdated.abbr, options.abbr);
assert.strictEqual(quoteRefUpdated.type, options.type);
assert.strictEqual(quoteRefUpdated.prefix, options.prefix);
assert.strictEqual(quoteRefUpdated.number, options.number);
assert.strictEqual(quoteRefUpdated.suffix, options.suffix);
    });
  });

  describe("#delete", () => {
  let quoteRefDeleted;
    beforeEach(async () => {
      quoteRefDeleted = await thisService.remove(quoteRefCreated._id);
    });

    it("should delete a quoteRef", async () => {
      assert.strictEqual(quoteRefDeleted._id, quoteRefCreated._id);
    });
  });
});