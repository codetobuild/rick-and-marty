import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CharacterList from "./CharacterList";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { Typography, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavedCharacters = () => {
  const [charactersData, setCharactersData] = useState([]);
  const [filteredCharactersData, setfilteredCharactersData] = useState([]);
  const navigate = useNavigate();

  // access only if logged in
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login", { replace: true });
    }
  });

  // get saved characters from local storage
  useEffect(() => {
    let savedCharacters = localStorage.getItem("saveCharacters");

    savedCharacters = JSON.parse(savedCharacters);
    console.log(savedCharacters);
    setCharactersData([...savedCharacters]);
  }, []);

  // set filterCharacters state
  useEffect(() => {
    setfilteredCharactersData([...charactersData]);
  }, [charactersData]);

  // remove saved character
  const removeCharacter = (payload) => {
    let characters = localStorage.getItem("saveCharacters");
    characters = JSON.parse(characters);
    const updatedCharacters = characters?.filter(
      (item) => item.id !== payload.id
    );
    localStorage.setItem("saveCharacters", JSON.stringify(updatedCharacters));
    setCharactersData([...JSON.parse(localStorage.getItem("saveCharacters"))]);
    toast.success(`${payload.name} removed successfully`);
  };

  // filter characters based on search text
  const filterCharacters = ({ searchText = "", searchBy = "name" }) => {
    console.log(searchText);
    console.log(searchBy);
    const currentFilteredCharacters = charactersData.filter((item) => {
      searchText = searchText.trim().toLocaleLowerCase();
      return searchText === item[searchBy].trim().toLocaleLowerCase();
    });
    setfilteredCharactersData([...currentFilteredCharacters]);
  };
  // clear all filters
  const clearFilterTag = () => {
    setfilteredCharactersData([...charactersData]);
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
      <Navbar />
      <SearchBar
        filterCharacters={filterCharacters}
        charactersData={charactersData}
        clearFilterTag={clearFilterTag}
      />
      <Container sx={{ marginBottom: 1 }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Saved Characters
        </Typography>
        {charactersData.length === 0 && (
          <Typography
            variant="overline"
            sx={{ fontSize: "1.2rem", color: "gray" }}>
            You have no saved characters
          </Typography>
        )}
      </Container>
      <CharacterList
        characters={filteredCharactersData}
        removeCharacter={removeCharacter}
      />
    </>
  );
};

export default SavedCharacters;
