const logoutUser = async () => {
  try {
    if (!localStorage.getItem("isLoggedIn")) {
      throw new Error("");
    }
    localStorage.removeItem("isLoggedIn");
    return { success: true, msg: "Logged out in successfully" };
  } catch (err) {
    return { success: false, msg: "Logged out error" };
  }
};

export default logoutUser;
