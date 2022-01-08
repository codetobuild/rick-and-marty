import { useState, useEffect } from "react";

import {
  Container,
  TextField,
  Box,
  Chip,
  Stack,
  Autocomplete,
  MenuItem,
  Select,
  Typography,
  FormControl,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const { setfilteredCharactersData, charactersData } = props;

  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [autosuggesstions, setAutosuggesstions] = useState([]);
  const [filterTag, setFilterTag] = useState("");

  const handleClick = (e) => {
    // handle empty input
    if (searchBy.length === 0 || inputValue.length === 0) {
      return;
    }

    // filter character based on search text
    const filterCharacters = () => {
      const currentFilteredCharacters = charactersData.filter((item) => {
        const SEARCH_TEXT = inputValue.trim().toLocaleLowerCase();
        const TARGET_SEARCH_TEXT = item[searchBy].trim().toLocaleLowerCase();
        return SEARCH_TEXT === TARGET_SEARCH_TEXT;
      });
      setfilteredCharactersData([...currentFilteredCharacters]);
    };
    filterCharacters();
    setFilterTag(inputValue);
    setInputValue("");
  };

  const clearFilters = () => {
    setfilteredCharactersData([...charactersData]);
  };

  const handleTagDelete = (e) => {
    clearFilters(); // clear all filters
    setFilterTag(""); // clear filter tag
  };

  // update autosuggestions
  useEffect(() => {
    let currentAutosuggestions = [];
    if (charactersData?.length) {
      currentAutosuggestions = charactersData.map((item) =>
        String(item[searchBy])
      );
    }
    // remove duplicate suggestions
    currentAutosuggestions = [...new Set(currentAutosuggestions)];
    setAutosuggesstions(currentAutosuggestions);
  }, [searchBy, charactersData]);

  // component 
  return (
    <Container
      sx={{
        marginBottom: "30px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          width: 350,
          boxShadow: 2,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
        }}>
        <Stack spacing={1} sx={{ flexGrow: 1 }}>
          <Autocomplete
            freeSolo
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={autosuggesstions}
            id="auto-complete"
            autoComplete
            includeInputInList
            renderInput={(params) => (
              <TextField
                {...params}
                // onChange={handleChange}
                name="searchText"
                sx={{ paddingY: 1, paddingX: 2 }}
                variant="standard"
                placeholder="Search Characters"
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            )}
          />
        </Stack>
        <IconButton
          tooltip="search"
          sx={{ width: 50, height: 50 }}
          onClick={handleClick}>
          <SearchIcon sx={{ color: "gray" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          margin: 2,
          width: 200,
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
        }}>
        <Typography sx={{ flexGrow: 1 }}>Search by</Typography>
        <FormControl sx={{ flexGrow: 1 }}>
          <Select
            name="searchBy"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            variant="standard">
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="species">Species</MenuItem>
            <MenuItem value="gender">Gender</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {filterTag && (
        <Stack direction="row" spacing={1} sx={{ flex: "0 0 100%", margin: 1 }}>
          <Chip label={filterTag} onDelete={handleTagDelete} sx={{}} />
        </Stack>
      )}
    </Container>
  );
};

export default SearchBar;
