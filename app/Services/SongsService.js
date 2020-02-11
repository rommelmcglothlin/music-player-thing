import Song from "../Models/Song.js";
import STORE from "../store.js";

// @ts-ignore
//TODO Change YOURNAME to your actual name
let _sandBoxUrl = "//bcw-sandbox.herokuapp.com/api/romrom/songs/";

class SongsService {
  constructor() {
    this.getMySongs();
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  async getMusicByQuery(query) {
    // NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?&term=" + query;
    let response = await fetch(url);
    let data = await response.json();
    STORE.state.songs = data.results.map(s => new Song(s));
  }

  async nowPlaying(_id) {
    let playing = STORE.state.songs.find(s => s._id == _id);
    if (!playing) {
      playing = STORE.state.myPlaylist.find(s => s._id == _id);
    }
    STORE.state.nowPlaying = playing;
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let response = await fetch(_sandBoxUrl);
    let data = await response.json();
    STORE.state.myPlaylist = data.data.map(newSong => new Song(newSong));
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} _id
   */
  // REVIEW Most likely there is an issue here
  // FIXME
  async addSong(_id) {
    let nowPlaying = STORE.state.nowPlaying;
    let found = STORE.state.myPlaylist.find(s => s._id == nowPlaying._id);

    if (found) {
      throw new Error("This has already been added to your playlist.");
    }

    let response = await fetch(_sandBoxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nowPlaying)
    });

    let songData = await response.json();
    let inPlaylist = new Song(songData.data);
    STORE.state.myPlaylist.push(inPlaylist);
    STORE.state.nowPlaying = inPlaylist;
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    await fetch(_sandBoxUrl + id, {
      method: "DELETE"
    });
    let i = STORE.state.myPlaylist.findIndex(s => s._id == id);
    if (i != 1) {
      STORE.state.myPlaylist.splice(i, 1);
    }
    STORE.state.nowPlaying = new Song();
  }
}

const service = new SongsService();
export default service;
