export default class Song {
  constructor(data) {
    if (!data) {
      return;
    }
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "500x500");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
    this.trackId = data.trackId;
  }

  get Template() {
    return /* html */ `
        <div class="trigger text-light">
          <img src="${this.albumArt}" height="100" onclick="app.songsController.getNowPlaying('${this._id}')"/>
            <div class="el">
              <p class="text-center color-emphasis-1 m-auto">${this.artist}</p>
              <p class="text-center m-auto">${this.title}</p>
             </div>
        </div>
        `;
  }

  get SongPreview() {
    let button = this.trackId
      ? /* html */ `
      <button class="btn btn-location btn-success" onclick="app.songsController.addSong('${this._id}')"><i class="fas fa-plus-square"></i></button>
      `
      : /* html */ `
      <button class="btn btn-location btn-danger" onclick="app.songsController.removeSong('${this._id}')"><i class="fas fa-trash-alt"></i></button>
      `;

    return /* html */ `
        <div class="d-flex alight-items-center">
              <h1 class="text-center text-light">N<span><i class="fas fa-play-circle"></i></span>W PLAYING</h1>
        </div>
        <div class="pt-5 container">
          <img src="${this.albumArt}"alt="Avatar" class="image">
            <div class="pt-5 overlay">
            <div class="text">
              <h1 class="align-items-center color-emphasis-1">${this.artist}</h1>
              <div class="pt-2 text-light">
              <h3>Song: ${this.title}</h3>
              <h4>Album: ${this.album}</h4>
              <h6>Price: $${this.price} USD <span class="m-auto">${button}</span></h6>
              <div class="d-flex align-items-center">
              <audio controls>
              <source src="${this.preview}" type="">
                  </audio> 
                </div>
             </div>
          </div>
        </div>
    `;
  }

  get PlaylistTemplate() {
    return /* html */ `
        <div class="border p-2 mb-2">
        <div class="d-flex text-light align-items-center justify-content-between">
        <div onclick="app.songsController.getNowPlaying('${this._id}')">
          <img src="${this.albumArt}" height="80">
          <span class="ml-2 color-emphasis-1">${this.artist}</span>
          <span class="ml-2">${this.title}</span>
        </div>
         <button class="btn btn-location btn-danger" onclick="app.songsController.removeSong('${this._id}')"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
        `;
  }
}
