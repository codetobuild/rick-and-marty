import React from "react";
import Character from "./Character";

import {
  Container,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";

const CharacterList = (props) => {
  const { characters } = props;

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}>
      {characters?.map((character) => (
        <Character key={character.id} character={character} />
      ))}
    </Container>
  );
};

export default CharacterList;
