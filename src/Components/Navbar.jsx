import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Typography, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "../App.css";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const NavlinkStyle = {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "5px 8px",
  };

  return (
    <nav
      style={{
        width: "100%",
        backgroundColor: "#3a86ff",
        marginBottom: "20px",
      }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h3" component="h1" sx={{ color: "#ffffff" }}>
            R&M
          </Typography>
        </NavLink>
        {largerWindow()}
        {smallerWindow()}
      </Container>
    </nav>
  );

  function largerWindow() {
    return (
      <div className="large">
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <li style={{ listStyleType: "none" }}>
            <NavLink
              to="/savedcharacters"
              style={{ ...NavlinkStyle, color: "white" }}>
              Saved characters
            </NavLink>
          </li>
          <li style={{ listStyleType: "none" }}>
            {localStorage.getItem("isLoggedIn") ? (
              <NavLink to="" style={{ ...NavlinkStyle, color: "white" }}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login" style={{ ...NavlinkStyle, color: "white" }}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    );
  }

  function smallerWindow() {
    return (
      <div className="small">
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}>
          <MenuIcon sx={{ color: "white", width: "40px", height: "40px" }} />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}>
          <MenuItem onClick={handleClose}>
            <NavLink
              to="/savedcharacters"
              style={{ ...NavlinkStyle, color: "black" }}>
              Saved characters
            </NavLink>
          </MenuItem>

          {localStorage.getItem("isLoggedIn") ? (
            <MenuItem onClick={handleClose}>
              <NavLink to="" style={{ ...NavlinkStyle, color: "black" }}>
                Logout
              </NavLink>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleClose}>
              <NavLink to="/login" style={{ ...NavlinkStyle, color: "black" }}>
                Login
              </NavLink>
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
};

export default Navbar;
