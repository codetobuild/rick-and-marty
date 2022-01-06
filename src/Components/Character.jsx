import React from "react";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";

const Character = (props) => {
  const { character } = props;
  return (
    <Card
      sx={{ width: 200, bgcolor: "skyblue", borderRadius: 2, marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        image={`${character.image}`}
        alt={`${character.name}`}
      />
    </Card>
  );
};

export default Character;
