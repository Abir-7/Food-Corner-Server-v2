import { User } from "../modules/Users/user.model";

const superUser = {
  id: "super-admin",
  email: "superadmin@gmail.com",
  password: "admin123",
  role: "admin",
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: "admin" });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
