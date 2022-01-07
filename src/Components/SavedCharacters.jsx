import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CharacterList from "./CharacterList";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { Typography, Container } from "@mui/material";

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

  // filter character based on search text
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
      </Container>
      <CharacterList characters={filteredCharactersData} />
    </>
  );
};

export default SavedCharacters;
