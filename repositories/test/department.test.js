const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const DepartmentRepository = require("../department.repository");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Poll", () => {
  it("Should create a new department", async () => {
    const data = {
      nameDepartment: "second Year Test",
      description: "2023-02-09T06:43:37.925+00:00",
      isUsed: true,
    };

    const result = await DepartmentRepository.createDepartment(data);
    console.log(result);
  });

  it("Should read all department", async () => {
    const result = await DepartmentRepository.getAllDepartment();
    console.log(result);
  });

  it("Should update a new department", async () => {
    const data = {
      nameDepartment: "first Year Test",
      description: "2023-02-09T06:43:37.925+00:00",
      isUsed: false,
    };
    const id = "63e5294149637b0af5ff51a4";
    const result = await DepartmentRepository.updateDepartment(id, data);
    console.log(result);
  });

  it("Should delete one department", async () => {
    const id = "63e529f1d8b75d703c442ef9";
    const result = await DepartmentRepository.deleteOneDepartment(id);
    console.log(result);
  });

  it("Should delete all department", async () => {
    const result = await DepartmentRepository.deleteAllDepartment();
    console.log(result);
  });
});
