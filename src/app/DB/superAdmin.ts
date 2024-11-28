import { User } from "../modules/Users/user.model";

const superUser = {
  id: "super-admin",
  email: "superadmin@gmail.com",
  password: "admin123",
  role: "superAdmin",
  isVerified: true, // remove it when use real email
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: "superAdmin" });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
