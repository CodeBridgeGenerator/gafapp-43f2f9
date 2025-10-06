import { faker } from "@faker-js/faker";
export default (user, count, companyIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      company: companyIds[i % companyIds.length],
      contactName: faker.lorem.sentence(""),
      position: faker.lorem.sentence(""),
      linkedIn: faker.lorem.sentence(""),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
