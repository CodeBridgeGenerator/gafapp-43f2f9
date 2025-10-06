const assert = require("assert");
const app = require("../../src/app");

describe("contacts service", () => {
  let thisService;
  let contactCreated;

  beforeEach(async () => {
    thisService = await app.service("contacts");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (contacts)");
  });

  describe("#create", () => {
    const options = {"company":"aasdfasdfasdfadsfadfa","contactName":"new value","position":"new value","linkedIn":"new value"};

    beforeEach(async () => {
      contactCreated = await thisService.create(options);
    });

    it("should create a new contact", () => {
      assert.strictEqual(contactCreated.company, options.company);
assert.strictEqual(contactCreated.contactName, options.contactName);
assert.strictEqual(contactCreated.position, options.position);
assert.strictEqual(contactCreated.linkedIn, options.linkedIn);
    });
  });

  describe("#get", () => {
    it("should retrieve a contact by ID", async () => {
      const retrieved = await thisService.get(contactCreated._id);
      assert.strictEqual(retrieved._id, contactCreated._id);
    });
  });

  describe("#update", () => {
    let contactUpdated;
    const options = {"company":"345345345345345345345","contactName":"updated value","position":"updated value","linkedIn":"updated value"};

    beforeEach(async () => {
      contactUpdated = await thisService.update(contactCreated._id, options);
    });

    it("should update an existing contact ", async () => {
      assert.strictEqual(contactUpdated.company, options.company);
assert.strictEqual(contactUpdated.contactName, options.contactName);
assert.strictEqual(contactUpdated.position, options.position);
assert.strictEqual(contactUpdated.linkedIn, options.linkedIn);
    });
  });

  describe("#delete", () => {
  let contactDeleted;
    beforeEach(async () => {
      contactDeleted = await thisService.remove(contactCreated._id);
    });

    it("should delete a contact", async () => {
      assert.strictEqual(contactDeleted._id, contactCreated._id);
    });
  });
});