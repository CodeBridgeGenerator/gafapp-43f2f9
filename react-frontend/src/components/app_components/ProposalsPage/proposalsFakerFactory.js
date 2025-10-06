import { faker } from "@faker-js/faker";
export default (user, count, projectNameIds, approvedByIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      proposalRef: faker.lorem.sentence(1),
      proposalName: faker.lorem.sentence(1),
      projectName: projectNameIds[i % projectNameIds.length],
      dueDate: faker.lorem.sentence(1),
      approved: faker.lorem.sentence(1),
      approvedBy: approvedByIds[i % approvedByIds.length],
      remarks: faker.lorem.sentence(1),
      file: faker.lorem.sentence(1),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
