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

    if (checkDataOfStaff !== null && checkDataOfStaffPhoneNumber !== null) {
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
          false,
          resultBody,
          400,
          EMAIL_ALREADY_EXISTS,
          DEPARTMENT_AND_ROLE_IS_REQUIRED,
          PHONE_NUMBER_ALREADY_EXISTS,
        );

        return responseCheckEmail;
      }

      if (
        idRole === "" &&
        idDepartment !== "" &&
        checkDataOfStaff.email === email &&
        checkDataOfStaffPhoneNumber.phoneNumber === phoneNumber
      ) {
        const resultBody = {
          staffRenders: data,
          departmentRenders,
          roleRenders,
        };

        const responseCheckEmail = ResponseHandler.responseAccountHandler(
          false,
          resultBody,
          400,
          EMAIL_ALREADY_EXISTS,
          ROLE_IS_REQUIRED,
          PHONE_NUMBER_ALREADY_EXISTS,
        );

        return responseCheckEmail;
      }

      if (
        idRole !== "" &&
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
          false,
          resultBody,
          400,
          EMAIL_ALREADY_EXISTS,
          DEPARTMENT_IS_REQUIRED,
          PHONE_NUMBER_ALREADY_EXISTS,
        );

        return responseCheckEmail;
      }
    }

    if (idRole === "" && idDepartment === "") {
      const resultBody = {
        staffRenders: data,
        departmentRenders,
        roleRenders,
      };

      const responseCheckEmail = ResponseHandler.responseAccountHandler(
        false,
        resultBody,
        400,
        null,
        DEPARTMENT_AND_ROLE_IS_REQUIRED,
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
        false,
        resultBody,
        400,
        null,
        DEPARTMENT_IS_REQUIRED,
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
        false,
        resultBody,
        400,
        null,
        ROLE_IS_REQUIRED,
        null,
      );

      return responseCheckEmail;
    }

    if (checkDataOfStaff !== null) {
      if (checkDataOfStaff.email === email) {
        const resultBody = {
          staffRenders: data,
          departmentRenders,
          roleRenders,
        };

        const responseCheckEmail = ResponseHandler.responseAccountHandler(
          false,
          resultBody,
          400,
          EMAIL_ALREADY_EXISTS,
        );

        return responseCheckEmail;
      }
    }

    if (checkDataOfStaffPhoneNumber !== null) {
      if (checkDataOfStaffPhoneNumber.phoneNumber === phoneNumber) {
        const resultBody = {
          staffRenders: data,
          departmentRenders,
          roleRenders,
        };

        const responseCheckEmail = ResponseHandler.responseAccountHandler(
          false,
          resultBody,
          400,
          null,
          null,
          PHONE_NUMBER_ALREADY_EXISTS,
        );

        return responseCheckEmail;
      }
    }

    if (!checkDataOfStaffPhoneNumber && !checkDataOfStaff) {
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

    const checkDataOfStaff = await findByEmailExist(id, email);

    const checkDataOfStaffPhoneNumber = await findByPhoneNumberExist(
      id,
      phoneNumber,
    );

    if (
      idRole === "" &&
      idDepartment === "" &&
      checkDataOfStaff[0].email === email &&
      checkDataOfStaffPhoneNumber[0].phoneNumber === phoneNumber
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
    if (
      checkDataOfStaff.length == 0 &&
      checkDataOfStaffPhoneNumber.length == 0
    ) {
      const staff = await StaffModel.updateMany({ _id: id }, data);

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

    if (checkDataOfStaffPhoneNumber.length != 0) {
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

    if (checkDataOfStaff.length != 0) {
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

const banAccountStaff = async (id, data) => {
  try {
    const { lockAccount } = data;
    const staff = await StaffModel.updateMany(
      { _id: id },
      { lockAccount: false },
    );

    return staff;
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

const findByEmailExist = async (id, email) => {
  try {
    const checkEmailExists = await StaffModel.find()
      .where("email")
      .equals(email)
      .where("_id")
      .ne(id);
    return checkEmailExists;
  } catch (err) {
    return err;
  }
};

const findByPhoneNumberExist = async (id, phoneNumber) => {
  try {
    const checkPhoneNumberExists = await StaffModel.find()
      .where("phoneNumber")
      .equals(phoneNumber)
      .where("_id")
      .ne(id);
    return checkPhoneNumberExists;
  } catch (err) {
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
  findByPhoneNumberExist,
  findByEmailExist,
  banAccountStaff,
};
