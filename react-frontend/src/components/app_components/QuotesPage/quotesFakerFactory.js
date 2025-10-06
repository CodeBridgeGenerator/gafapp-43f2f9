import { faker } from "@faker-js/faker";
export default (user, count, projectNameIds, approvedByIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      quoteNo: faker.lorem.sentence(1),
      projectName: projectNameIds[i % projectNameIds.length],
      applicationCost: faker.lorem.sentence(1),
      supportCost: faker.lorem.sentence(1),
      firstMilestonePayment: faker.lorem.sentence(1),
      secondMilestonePayment: faker.lorem.sentence(1),
      thirdMilestonePayment: faker.lorem.sentence(1),
      fourthMilestonePayment: faker.lorem.sentence(1),
      fifthMilestonePayment: faker.lorem.sentence(1),
      applicationCostSST: faker.lorem.sentence(1),
      supportCostSST: faker.lorem.sentence(1),
      revision: faker.lorem.sentence(1),
      approved: faker.lorem.sentence(1),
      approvedBy: approvedByIds[i % approvedByIds.length],
      file: faker.lorem.sentence(1),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
