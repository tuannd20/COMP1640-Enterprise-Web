const StaffRepository = require("../repositories/staff.repository");
const { createTokenJwt } = require("../utilities/jwt");
const DepartmentService = require("./department.service");
const RoleService = require("./role.service");

const createStaff = async (data) => {
  try {
    const departments = await DepartmentService.getAllDepartment();
    const roles = await RoleService.getAllRole();

    const staffResponse = await StaffRepository.createStaff(
      data,
      departments,
      roles,
    );

    return staffResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllStaff = async () => {
  try {
    const staffs = await StaffRepository.getAllStaff();

    return staffs;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayStaffById = async (id) => {
  try {
    const staff = await StaffRepository.displayStaffById(id);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (id, data) => {
  try {
    const departments = await DepartmentService.getAllDepartment();
    const roles = await RoleService.getAllRole();
    const staffResponse = await StaffRepository.updateStaff(
      id,
      data,
      departments,
      roles,
    );
    return staffResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const deleteOneStaff = async (_id) => {
//   try {
//     // eslint-disable-next-line no-underscore-dangle
//     const id = _id;
//     const staff = await StaffRepository.deleteOneStaff(id);
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// const deleteAllStaff = async () => {
//   try {
//     const staff = await StaffRepository.deleteAllStaff();
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

const checkPassword = async (data) => {
  try {
    const staff = await StaffRepository.findStaff(data);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findStaffByEmail = async (email) => {
  try {
    const staff = await StaffRepository.findStaff(email);
    // const staffDetail = {
    //   fullName: staff.fullName,
    //   email: staff.email,
    //   role: staff.idRole.nameRole,
    //   department: staff.idDepartment.nameDepartment,
    // };

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line consistent-return
const createToken = async (data) => {
  try {
    const staffDetail = {
      fullName: data.fullName,
      email: data.email,
      role: data.idRole.nameRole,
    };

    const token = await createTokenJwt(staffDetail);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const findLeader = async (options) => {
  try {
    const staff = await StaffRepository.findLeader(options);
    return staff;
  } catch (err) {
    console.log("🚀 ~ file: staff.service.js:104 ~ findLeader ~ err:", err);
    return err;
  }
};

const findByEmail = async (emailAccount) => {
  try {
    const email = await StaffRepository.findByEmail(emailAccount);
    return email;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findByPhoneNumber = async (id, phoneNumber) => {
  try {
    const phone = await StaffRepository.findByPhoneNumberExist(id, phoneNumber);
    return phone;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const handleUpdateProfile = async (id, profile) => {
  try {
    console.log(profile);

    if (profile.avatarImage === null) {
      const payload = {
        address: profile.address,
        phoneNumber: profile.phoneNumber,
      };
      const profileAccount = await StaffRepository.handleEditProfile(
        id,
        payload,
      );
      return profileAccount;
    }

    const profileAccountAvatar =
      await StaffRepository.handleEditProfileWithAvatar(id, profile);

    return profileAccountAvatar;
  } catch (error) {
    return error;
  }
};

const handleUpdateProfileWithPhoneNumber = async (id, profile) => {
  try {
    const profileAccountAvatar =
      await StaffRepository.handleEditProfileWithPhone(id, profile);

    return profileAccountAvatar;
  } catch (error) {
    return error;
  }
};

const handleUpdatePasswordOfAccount = async (id, password) => {
  try {
    const profilePassword = await StaffRepository.handleUpdatePassword(
      id,
      password,
    );

    return profilePassword;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findLeader,
  createStaff,
  updateStaff,
  getAllStaff,
  displayStaffById,
  findStaffByEmail,
  checkPassword,
  createToken,
  findByEmail,
  findByPhoneNumber,
  handleUpdateProfile,
  handleUpdateProfileWithPhoneNumber,
  handleUpdatePasswordOfAccount,
};
