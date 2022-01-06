const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character";

const getCharacters = async () => {
  try {
    const { data } = await axios.get(URL);
    if (!data) {
      throw new Error("Server error");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export default getCharacters;
