/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
const StaffModel = require("../database/models/Staff");
const ResponseHandler = require("../common/response.handle");
const {
  DEPARTMENT_AND_ROLE_IS_REQUIRED,
  EMAIL_ALREADY_EXISTS,
  ROLE_IS_REQUIRED,
  DEPARTMENT_IS_REQUIRED,
  PHONE_NUMBER_ALREADY_EXISTS,
} = require("../constants/error");
const { createTokenjwt } = require("../utilities/jwt");

// eslint-disable-next-line consistent-return
const createStaff = async (data, departments, roles) => {
  try {
    let departmentRenders = [];
    let roleRenders = [];
    // eslint-disable-next-line array-callback-return
    departmentRenders = departments.map((department) => ({
      _id: department._id,
      name: department.nameDepartment,
    }));
    roleRenders = roles.map((role) => ({ _id: role._id, name: role.nameRole }));

    const { email, phoneNumber, idRole, idDepartment } = data;

    const checkDataOfStaff = await findByEmail(email);
    const checkDataOfStaffPhoneNumber = await findByPhoneNumber(phoneNumber);

    if (
      idRole === "" &&
      idDepartment === "" &&
      checkDataOfStaff.email === email &&
      checkDataOfStaffPhoneNumber.phoneNumber === phoneNumber
    ) {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        EMAIL_ALREADY_EXISTS,
        DEPARTMENT_AND_ROLE_IS_REQUIRED,
        PHONE_NUMBER_ALREADY_EXISTS,
      );

      return responseCheckEmail;
    }

    if (!checkDataOfStaff && !checkDataOfStaffPhoneNumber) {
      const staff = await StaffModel.create(data);

      const result = {
        staffRenders: staff,
        departmentRenders,
        roleRenders,
      };

      const response = ResponseHandler.responseAccountHandler(
        true,
        result,
        200,
        null,
      );
      return response;
    }

    if (checkDataOfStaffPhoneNumber.phoneNumber === phoneNumber) {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        null,
        PHONE_NUMBER_ALREADY_EXISTS,
      );

      return responseCheckEmail;
    }

    if (idRole === "" && idDepartment === "") {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        DEPARTMENT_AND_ROLE_IS_REQUIRED,
        null,
      );

      return responseCheckEmail;
    }

    if (idRole === "" && idDepartment !== "") {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        ROLE_IS_REQUIRED,
        null,
      );

      return responseCheckEmail;
    }

    if (idRole !== "" && idDepartment === "") {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        DEPARTMENT_IS_REQUIRED,
        null,
      );

      return responseCheckEmail;
    }

    if (checkDataOfStaff.email === email) {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        EMAIL_ALREADY_EXISTS,
      );

      return responseCheckEmail;
    }
  } catch (err) {
    return err;
  }
};

const getAllStaff = async () => {
  try {
    const staffs = await StaffModel.find()
      .sort({ createdAt: -1 })
      .populate(["idDepartment", "idRole"]);

    return staffs;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findStaff = async (data) => {
  try {
    const staff = await StaffModel.findOne({ email: data }).populate([
      "idRole",
      "idDepartment",
    ]);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const displayAllStaff = async () => {
//   try {
//     const staff = await StaffModel.find();

//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

const displayStaffById = async (id) => {
  try {
    const staff = await StaffModel.findById(id).populate([
      "idDepartment",
      "idRole",
    ]);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line consistent-return
const updateStaff = async (id, data, departments, roles) => {
  try {
    let departmentRenders = [];
    let roleRenders = [];
    // eslint-disable-next-line array-callback-return
    departmentRenders = departments.map((department) => ({
      _id: department._id,
      name: department.nameDepartment,
    }));
    roleRenders = roles.map((role) => ({ _id: role._id, name: role.nameRole }));

    const { email, phoneNumber, idRole, idDepartment } = data;

    const checkDataOfStaff = await findByEmail(email);
    const checkDataOfStaffPhoneNumber = await findByPhoneNumber(phoneNumber);

    if (
      idRole === "" &&
      idDepartment === "" &&
      checkDataOfStaff.email === email &&
      checkDataOfStaffPhoneNumber.phoneNumber === phoneNumber
    ) {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        EMAIL_ALREADY_EXISTS,
        DEPARTMENT_AND_ROLE_IS_REQUIRED,
        PHONE_NUMBER_ALREADY_EXISTS,
      );

      return responseCheckEmail;
    }

    // eslint-disable-next-line no-underscore-dangle, max-len
    if (!checkDataOfStaff && !checkDataOfStaffPhoneNumber) {
      const staff = await StaffModel.updateMany(id, data);

      const result = {
        staffRenders: staff,
        departmentRenders,
        roleRenders,
      };

      const response = ResponseHandler.responseAccountHandler(
        true,
        result,
        200,
        null,
      );
      return response;
    }

    if (checkDataOfStaffPhoneNumber.phoneNumber === phoneNumber) {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        null,
        PHONE_NUMBER_ALREADY_EXISTS,
      );

      return responseCheckEmail;
    }
    if (idRole === "" && idDepartment === "") {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        DEPARTMENT_AND_ROLE_IS_REQUIRED,
        null,
      );

      return responseCheckEmail;
    }

    if (idRole === "" && idDepartment !== "") {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        ROLE_IS_REQUIRED,
        null,
      );

      return responseCheckEmail;
    }

    if (idRole !== "" && idDepartment === "") {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        null,
        DEPARTMENT_IS_REQUIRED,
        null,
      );

      return responseCheckEmail;
    }

    if (checkDataOfStaff.email === email) {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        true,
        resultBody,
        400,
        EMAIL_ALREADY_EXISTS,
      );

      return responseCheckEmail;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const deleteOneStaff = async (_id) => {
//   try {
//     // eslint-disable-next-line no-underscore-dangle
//     const id = _id;
//     const staff = await StaffModel.findByIdAndRemove(id);
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// const deleteAllStaff = async () => {
//   try {
//     const staff = await StaffModel.deleteMany();
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// eslint-disable-next-line consistent-return
const createToken = async (data) => {
  try {
    const token = createTokenjwt(data);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const findLeader = async (options) => {
  try {
    const staff = await StaffModel.findOne(options);
    return staff;
  } catch (err) {
    console.log("🚀 ~ file: staff.repository.js:112 ~ findLeader ~ err:", err);
    return err;
  }
};
const findByEmail = async (emailAccount) => {
  try {
    const email = await StaffModel.findOne({ email: emailAccount }).select(
      "email",
    );
    return email;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findByPhoneNumber = async (phoneNumber) => {
  try {
    const phone = await StaffModel.findOne({ phoneNumber }).select(
      "phoneNumber",
    );
    return phone;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createStaff,
  updateStaff,
  displayStaffById,
  getAllStaff,
  findStaff,
  createToken,
  findLeader,
  findByEmail,
  findByPhoneNumber,
};
