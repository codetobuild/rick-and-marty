import { useState } from "react";

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
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(initialFormState);

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

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
            Login
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
              <a href="/" style={{ textDecoration: "none" }}>
                Register here
              </a>
            </Tooltip>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
