import STORE from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = "";
  STORE.state.songs.forEach(song => {
    template += song.Template;
  });
  document.getElementById("songs").innerHTML = template;
}

function _drawPreview() {
  if (!STORE.state.nowPlaying.title) {
    document.getElementById("preview").innerHTML = "";
  }
  document.getElementById("preview").innerHTML =
    STORE.state.nowPlaying.SongPreview;
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = "";
  STORE.state.playlist.forEach(song => {
    template += song.PlaylistTemplate;
  });
  document.getElementById("playlist").innerHTML = template;
}

function _drawError(error) {
  alert(error);
}

//Public
export default class SongsController {
  constructor() {
    this.getMyPlaylist();
  }

  /**Takes in the form submission event and sends the query to the service */
  async search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      await SongService.getMusicByQuery(e.target.query.value);
      _drawResults();
    } catch (error) {
      console.error(error);
    }
  }

  /**@param {string} _id */
  async getNowPlaying(_id) {
    try {
      await SongService.nowPlaying(_id);
      _drawPreview();
    } catch (error) {
      _drawError(error);
    }
  }

  async getMyPlaylist() {
    try {
      await SongService.getMySongs();
      // _drawPlaylist();
    } catch (error) {
      _drawError(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      await SongService.addSong(id);
      _drawPlaylist();
      _drawPreview();
    } catch (error) {
      _drawError(error);
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    try {
      await SongService.removeSong(id);
      _drawPreview();
      _drawPlaylist();
    } catch (error) {
      _drawError(error);
    }
  }
}
