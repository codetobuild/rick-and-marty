const loginUser = async (userPayload) => {
  try {
    if (!localStorage.getItem("users")) {
      throw new Error("User not found");
    }
    // check user in database
    let allUsers = localStorage.getItem("users");

    allUsers = JSON.parse(allUsers);

    const user = allUsers?.find((user) => user.email === userPayload.email);

    if (!user) {
      throw new Error("User not found");
    } else {
      if (user.password !== userPayload.password) {
        throw new Error("Invalid credentials");
      } else {
        return { success: true, message: "User found", data: user };
      }
    }
  } catch (err) {
    return { success: false, msg: `${err.message}` };
  }
};

export default loginUser;
