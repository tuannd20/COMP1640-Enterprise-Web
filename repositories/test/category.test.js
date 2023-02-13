const mongoose = require("mongoose");
const DB = require("../../database/connection");

const CategoryRepository = require("../category.repository");

beforeEach(async () => {
  await DB.connectionDatabase();
});

afterEach(async () => {
  await mongoose.connection.close();
});

const mockCategory = {
  idDepartment: "15172727cc8",
  nameCategory: "Categoryabc",
  isUsed: false,
};

describe("Good case: Unit test for Category", () => {
  it("Should create a new category", async () => {
    const category = await CategoryRepository.createCategory("15172727cc8");
    expect(category.idDepartment).toEqual(mockCategory.idDepartment);
    expect(category.nameCategory).toEqual(mockCategory.nameCategory);
    expect(category.isUsed).toEqual(mockCategory.isUsed);
  });

  it("Should read a category", async () => {
    const category = await CategoryRepository.readCategoryById("15172727cc8");
    expect(category.idDepartment).toEqual(mockCategory.idDepartment);
    expect(category.nameCategory).toEqual(mockCategory.nameCategory);
    expect(category.isUsed).toEqual(mockCategory.isUsed);
  });

  it("Should update a category", async () => {
    const category = await CategoryRepository.updateCategory(
      "15172727cc8",
      mockCategory,
    );
    expect(category.idDepartment).toEqual(mockCategory.idDepartment);
    expect(category.nameCategory).toEqual(mockCategory.nameCategory);
    expect(category.isUsed).toEqual(mockCategory.isUsed);
  });

  it("Should delete a category", async () => {
    const category = await CategoryRepository.deleteCategory(
      "15172727cc8",
      mockCategory,
    );
    expect(category.idDepartment).toEqual(mockCategory.idDepartment);
    expect(category.nameCategory).toEqual(mockCategory.nameCategory);
    expect(category.isUsed).toEqual(mockCategory.isUsed);
  });
});
