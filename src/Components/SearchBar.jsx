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
  const { filterCharacters, charactersData, clearFilterTag } = props;

  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [autosuggesstions, setAutosuggesstions] = useState([]);
  const [filterTag, setFilterTag] = useState("");

  const handleClick = (e) => {
    const filterCondition = { searchBy, searchText: inputValue };
    // raise event
    if (searchBy && inputValue) {
      filterCharacters(filterCondition);
      setFilterTag(inputValue);
      setInputValue("");
    }
  };
  const handleTagDelete = (e) => {
    // clear all filters so display all data again
    clearFilterTag(); // raise event
    setFilterTag(""); // reset filter tag
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

  // component function
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
