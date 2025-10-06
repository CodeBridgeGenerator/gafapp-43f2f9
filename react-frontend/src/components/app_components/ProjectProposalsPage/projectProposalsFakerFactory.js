import { faker } from "@faker-js/faker";
export default (user, count, proposalRefIds, quotationIds, approvedByIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      proposalRef: proposalRefIds[i % proposalRefIds.length],
      quotation: quotationIds[i % quotationIds.length],
      approved: faker.lorem.sentence(""),
      approvedDate: faker.lorem.sentence(""),
      approvedBy: approvedByIds[i % approvedByIds.length],
      rejected: faker.lorem.sentence(""),
      remarks: faker.lorem.sentence(""),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
