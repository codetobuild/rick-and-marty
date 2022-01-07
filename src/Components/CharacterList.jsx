import React from "react";
import Character from "./Character";
import { Container, Grid, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import saveCharacterToDatabase from "../API/saveCharacter";

const CharacterList = (props) => {
  const { characters,  } = props;

  const handleSaveCharacter = async (payload) => {
    try {
      const savedCharacter = await saveCharacterToDatabase(payload);
      console.log("data saved", savedCharacter);
      if (!savedCharacter.success) {
        throw new Error(`${savedCharacter.msg}`);
      }
      toast.success(`${savedCharacter.msg}`);
    } catch (err) {
      toast.error(`${err.message}`);
      console.log(err.message);
    }
  };

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
      <Container>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 3 }}
          justifyContent="center"
          sx={{
            marginBottom: "30px",
          }}>
          {characters?.map((character) => (
            <Grid item xs="auto" key={character.id}>
              <Paper>
                <Character
                  character={character}
                  handleSaveCharacter={handleSaveCharacter}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CharacterList;
