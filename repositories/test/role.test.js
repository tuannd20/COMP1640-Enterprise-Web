const mongoose = require("mongoose");
const RoleRepository = require("../role.repository");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

const mockRole = {
  _id: "62afd6301880d15172727cc8",
  nameRole: "Test",
  description: "testing",
};

describe("Good case: Unit test for Role", () => {
  it("Should create a new role", async () => {
    const data = {
      nameRole: "test",
      description: "test add new role",
    };
    const role = await RoleRepository.createRole(data);
    console.log(role);
  });
});
