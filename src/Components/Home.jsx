import { useState, useEffect } from "react";

import SearchBar from "./SearchBar";
import CharacterList from "./CharacterList";
import getCharacters from "../API/Characters";
import Navbar from "./Navbar";
import { Typography, Container } from "@mui/material";

const Home = () => {
  const [charactersData, setCharactersData] = useState([]);
  const [filteredCharactersData, setfilteredCharactersData] = useState([]);

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

  // get characters data with api call
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setCharactersData([...data?.results]);
        // console.log(charactersData);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCharacters();
  }, []);

  // set filterCharacters data
  useEffect(() => {
    // console.log(charactersData);
    setfilteredCharactersData([...charactersData]);
  }, [charactersData]);

  return (
    <>
      <Navbar />
      <SearchBar
        filterCharacters={filterCharacters}
        clearFilterTag={clearFilterTag}
        charactersData={charactersData}
      />
      <Container sx={{ marginBottom: 1 }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          All Characters
        </Typography>
      </Container>
      <CharacterList characters={filteredCharactersData} />
    </>
  );
};

export default Home;
