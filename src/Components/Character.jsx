import React from "react";
import { Button, Box, Typography } from "@mui/material";
import "../App.css";

const Character = (props) => {
  const { character, handleSaveCharacter, removeCharacter } = props;

  const handleClick = (payload) => {
    handleSaveCharacter(payload); // raise event
  };

  return (
    <div style={{ width: "230px", height: "230px", cursor: "pointer" }}>
      <div className="card_flipper">
        <Box
          className="card_flipper_front"
          sx={{ borderRadius: 2, overflow: "hidden" }}>
          <img
            src={character.image}
            alt={character.name}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          className="card_flipper_back"
          sx={{
            borderRadius: 2,
            padding: 2,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <div>
            <Typography variant="subtitle1">Name: {character.name}</Typography>
            <Typography variant="subtitle1">
              Gender: {character.gender}
            </Typography>
            <Typography variant="subtitle1">
              Species: {character.species}
            </Typography>
            <Typography variant="subtitle1">
              Status: {character.status}
            </Typography>
          </div>

          {removeCharacter ? (
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => removeCharacter(character)}>
              REMOVE
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => handleClick(character)}>
              SAVE
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Character;
