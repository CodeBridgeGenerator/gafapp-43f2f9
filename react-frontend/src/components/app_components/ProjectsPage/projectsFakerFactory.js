
import { faker } from "@faker-js/faker";
export default (user,count,companyIds,contactIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
company: companyIds[i % companyIds.length],
contact: contactIds[i % contactIds.length],
projectName: faker.lorem.sentence(""),
idGAF: faker.lorem.sentence(""),
title: faker.lorem.sentence(""),
problemStatement: faker.lorem.sentence(""),
relevantAITechnologies: faker.lorem.sentence(""),
expectedOutcomes: faker.lorem.sentence(""),
currentSolutions: faker.lorem.sentence(""),
targetUsers: faker.lorem.sentence(""),
dataAvailability: faker.lorem.sentence(""),
requirements: faker.lorem.sentence(""),
budgetAllocation: faker.lorem.sentence(""),
referredCollaborationTimeline: faker.lorem.sentence(""),
tags: faker.lorem.sentence(""),
founded: faker.lorem.sentence(""),
headquarters: faker.lorem.sentence(""),
deadline: faker.lorem.sentence(""),
daysRemaining: faker.lorem.sentence(""),
budget: faker.lorem.sentence(""),
category: faker.lorem.sentence(""),
enterprise: faker.lorem.sentence(""),
posted: faker.lorem.sentence(""),
others: faker.lorem.sentence(""),
path: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
