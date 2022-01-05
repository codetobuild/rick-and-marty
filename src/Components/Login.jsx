import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  TextField,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import loginUser from "../API/LoginUser";

const initialFormState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialFormState);

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(user); // call api
    if (data.success) {
      // if login success
      console.log("login successful");
      localStorage.setItem("isLoggedIn", true);
      navigate("/", { replace: true });
      return;
    }
    // if login failed
    toast.error(`${data.msg}`);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      // user already logged in
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />

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
              Login
            </Typography>
            <TextField
              label="Email"
              id="email"
              name="email"
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
              Login
            </Button>
            <Typography
              paragraph
              gutterBottom
              variant="subtitle2"
              sx={{ fontSize: "1rem" }}>
              Don't have an account?{" "}
              <Tooltip title="Log in">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </Tooltip>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
