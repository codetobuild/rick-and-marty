import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Box,
  Stack,
  Autocomplete,
  MenuItem,
  Select,
  Typography,
  FormControl,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar";
import CharacterList from "./CharacterList";
import getCharacters from "../API/Characters";
const Home = () => {
  const [charactersData, setCharactersData] = useState([]);
  const [filteredCharactersData, setfilteredCharactersData] = useState([]);

  const filterCharacters = ({ searchText = "", searchBy = "name" }) => {
    console.log(searchText);
    console.log(searchBy);
  };

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

  useEffect(() => {
    // console.log(charactersData);
    setfilteredCharactersData([...charactersData]);
  }, [charactersData]);

  return (
    <div>
      <SearchBar filterCharacters={filterCharacters} />
      <CharacterList characters={filteredCharactersData} />
    </div>
  );
};

export default Home;
