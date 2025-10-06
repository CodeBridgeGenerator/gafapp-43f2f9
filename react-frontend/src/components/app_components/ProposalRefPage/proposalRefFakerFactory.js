
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.datatype.number(""),
abbr: faker.datatype.number(""),
type: faker.datatype.number(""),
prefix: faker.lorem.sentence(1),
number: faker.datatype.number(""),
suffix: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
