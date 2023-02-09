const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const RuleRepository = require("../rule.repository");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Rule", () => {
  it("Should create a new rule", async () => {
    const data = {
      title: "title rule test",
      contentRule: "Content rule test",
    };
    const rule = await RuleRepository.createRule(data);
    console.log(rule);
  });
});
describe("Good case: Unit test for Rule", () => {
  it("Should update a rule", async () => {
    const id = "63e485140cacb098d509c371";
    const data = {
      title: "title rule test update",
      contentRule: "Content rule test update",
    };
    const rule = await RuleRepository.updateRule(id, data);
    console.log(rule);
  });
});
describe("Good case: Unit test for Rule", () => {
  it("Should delete one rule", async () => {
    // eslint-disable-next-line no-underscore-dangle
    const id = "63e3ca5dc0d29c629db7895b";
    const rule = await RuleRepository.deleteOneRule(id);
    console.log(rule);
  });
});
describe("Good case: Unit test for Rule", () => {
  it("Should delete all staff", async () => {
    // eslint-disable-next-line no-underscore-dangle
    const rule = await RuleRepository.deleteAllRule();
    console.log(rule);
  });
});
