const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylist(playlistId) {
        const query = {
            text: `SELECT songs.id, songs.title, songs.year, songs.performer, songs.genre, songs.duration
                   FROM songs
                            INNER JOIN playlistsongs ON songs.id = playlistsongs.song_id
                   WHERE playlistsongs.playlist_id = $1`,
            values: [playlistId],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = PlaylistsService;
