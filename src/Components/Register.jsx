import { useState, useEffect } from "react";

import {
  TextField,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";

const initialFormState = {
  fullname: "",
  email: "",
  password: "",
};

const Register = () => {
  const [user, setUser] = useState(initialFormState);
  const [registerMessage, setRegisterMessage] = useState("");

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const getRandomId = () => {
    let random = (Math.random() + 1).toString(36).substring(7);
    return random;
  };
  const validateUser = (userPayload) => {
    if (!localStorage.getItem("users")) {
      // users array doest exist
      localStorage.setItem("users", JSON.stringify([]));
      return true;
    } else {
      let users = localStorage.getItem("users");
      users = JSON.parse(users);

      // check if user exists
      const userExist = users?.some((user) => user.email == userPayload.email);

      if (userExist) {
        setRegisterMessage("User already exists");

        return false; // user already exist
      } else {
        return true;
      }
    }
  };

  const saveNewUser = (userPayload) => {
    if (validateUser(userPayload)) {
      const userId = getRandomId();
      const newUser = { id: userId, ...userPayload };
      console.log("saving user...");

      let users = localStorage.getItem("users");
      users = JSON.parse(users);
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      console.log("all users", users);

      return newUser;
    } else {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = saveNewUser(user);

    if (!newUser) {
      console.error("Error while registering");
      return;
    }
    // log user
    // redirect user to home page

    setRegisterMessage("Registered Successfully");

    console.log("new user saved", newUser);
  };

  useEffect(() => {
    setTimeout(() => {
      setRegisterMessage("");
    }, 3000);
  }, [registerMessage]);

  return (
    <Container sx={{ marginTop: 10 }}>
      <Card
        sx={{
          maxWidth: 500,
          marginX: "auto",
          boxShadow: 4,
          bgcolor: "#EEF2FF",
        }}>
        <CardContent>
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            sx={{ margin: 5 }}>
            Register
          </Typography>
          {registerMessage && (
            <Typography
              sx={{
                border: 1,
                borderRadius: 1,
                textAlign: "center",
                padding: 1,
              }}>
              {registerMessage}
            </Typography>
          )}
          <TextField
            label="Fullname"
            id="fullname"
            name="fullname"
            margin="normal"
            value={user.fullname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            margin="normal"
            value={user.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            margin="normal"
            value={user.password}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            sx={{ paddingX: 5, paddingY: 1, marginY: 2 }}
            onClick={handleSubmit}>
            Register
          </Button>
          <Typography
            paragraph
            gutterBottom
            variant="subtitle2"
            sx={{ fontSize: "1rem" }}>
            Already have an account?{" "}
            <Tooltip title="Log in">
              <a href="/" style={{ textDecoration: "none" }}>
                Login here
              </a>
            </Tooltip>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
