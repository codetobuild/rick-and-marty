import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerUser from "../API/RegisterUser";
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

const initialFormState = {
  fullname: "",
  email: "",
  password: "",
};

// compoment function
const Register = () => {
  const [user, setUser] = useState(initialFormState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(user); // call api
    if (!data.success) {
      toast.error(`${data.msg} `);
      console.error(data.msg);
      return;
    }
    // redirect to login page
    navigate("/login", { replace: true });
  };

  useEffect();

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
              Register
            </Typography>
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
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Tooltip>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Register;
