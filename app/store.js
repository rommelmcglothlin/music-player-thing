import Song from "./Models/Song.js";

class Store {
  /**
   * Provides access to application state data
   */
  state = {
    songs: []
  };
}

const store = new Store();
export default store;
