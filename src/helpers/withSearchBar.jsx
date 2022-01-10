import React, { useState, useEffect } from "react";

const withSearchBar = (WrappedComponent) => {
  const WithSearchBar = (props) => {
    const { setfilteredCharactersData, charactersData } = props;
    const [inputValue, setInputValue] = useState("");
    const [searchBy, setSearchBy] = useState("name");
    const [autosuggesstions, setAutosuggesstions] = useState([]);
    const [filterTag, setFilterTag] = useState("");

    const handleSearch = (e) => {
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

    const dataProps = {
      inputValue,
      setInputValue,
      autosuggesstions,
      handleSearch,
      filterTag,
      handleTagDelete,
      searchBy,
      setSearchBy,
    };

    return <WrappedComponent dataProps={dataProps} />;
  };
  return WithSearchBar;
};

export default withSearchBar;
