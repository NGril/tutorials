/* 
- this file is also called index.js as it is a practice in JS
- it is done to shorten imports
- if we wanted to import something from this file we would just need to specify the directory in which this is located (actions)
- webpack is the one that enables this, if the concrete file is not specified webpack looks for an index.js file
*/

// Action creator
export const selectSong = (song) => {
  // Return an action
  return {
    type: "SONG_SELECTED",
    payload: song,
  };
};
