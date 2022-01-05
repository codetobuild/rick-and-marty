import { v4 as uuidv4 } from "uuid";

const registerUser = async (userPayload) => {
  try {
    if (!localStorage.getItem("users")) {
      // if users schema is not created yet
      localStorage.setItem("users", JSON.stringify([]));
    }
    // check user in database
    let allUsers = localStorage.getItem("users");

    allUsers = JSON.parse(allUsers);

    console.log(allUsers);

    const userExist = allUsers?.some(
      (user) => user.email === userPayload.email
    );

    if (userExist) {
      // user exist errror
      throw new Error("User already exists");
    } else {
      // create new user in database
      const newUser = { id: uuidv4(), ...userPayload };
      allUsers = [...allUsers, newUser];
      localStorage.setItem("users", JSON.stringify(allUsers));

      return { success: true, msg: "New user created", data: newUser };
    }
  } catch (err) {
    return { success: false, msg: `${err.message}` };
  }
};

export default registerUser;
