async function saveCharacterToDatabase(payload) {
  try {
    let allSaveCharacters = localStorage.getItem("saveCharacters");
    if (!allSaveCharacters) {
      // initialize save character array
      localStorage.setItem("saveCharacters", JSON.stringify([]));
    }

    const allSaveCharactersArray = JSON.parse(
      localStorage.getItem("saveCharacters")
    );
    // check if character already saved
    const characterExist = allSaveCharactersArray?.some(
      (item) => item.id === payload.id
    );

    if (characterExist) {
      throw new Error("Character already saved before");
    }

    // save character only if not saved yet
    const { episode, location, origin, ...resData } = payload;
    // save only necessary data to save localstorage space
    const currentSavedCharacters = [...allSaveCharactersArray, { ...resData }];
    localStorage.setItem(
      "saveCharacters",
      JSON.stringify(currentSavedCharacters)
    );
    return {
      success: true,
      msg: "Character saved successfully",
      data: resData,
    };
  } catch (err) {
    return { success: false, msg: `${err.message}` };
  }
}

export default saveCharacterToDatabase;
