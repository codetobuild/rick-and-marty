import React from "react";
import Character from "./Character";
import { Container, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import saveCharacterToDatabase from "../../API/saveCharacter";
import MyToastContainer from "../MyToastContainer";

const CharacterList = (props) => {
  const { characters, removeCharacter } = props;
  const navigate = useNavigate();
  const checkLoggedIn = () => localStorage.getItem("isLoggedIn");

  const handleSaveCharacter = async (payload) => {
    try {
      if (!checkLoggedIn()) {
        // is not logged in navigate to login
        navigate("/login");
        return;
      }
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
      <MyToastContainer />
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
              <Paper sx={{ boxShadow: 0 }}>
                <Character
                  character={character}
                  handleSaveCharacter={handleSaveCharacter}
                  removeCharacter={removeCharacter}
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
