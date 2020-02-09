import Song from "./Models/Song.js";

class Store {
  /**
   * Provides access to application state data
   */
  state = {
    /**@type {Song[]} */
    songs: [],
    /**@type {Song[]} */
    myPlaylist: [],
    nowPlaying: new Song()
  };
}

const STORE = new Store();
export default STORE;
