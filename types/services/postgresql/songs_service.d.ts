export = SongsService;
/**
 * Songs Service
 *
 * @module services/postgresql
 * @typedef {import('../../data/song/song')} Song
 */
declare class SongsService extends PostgresBase {
    /**
     * Adds a {@link Song} into the database
     */
    addSong(): Promise<void>;
    /**
     * Get all {@link Song} from the database
     */
    getSongs(): Promise<void>;
    /**
     * Get all {@link Song} by its {@link Song.id id} from the database
     */
    getSongById(): Promise<void>;
    /**
     * Edit the {@link Song} with {@link Song.id id} from the database
     */
    editSongById(): Promise<void>;
    /**
     * Delete the {@link Song} with {@link Song.id id} from the database
     */
    deleteSongById(): Promise<void>;
}
declare namespace SongsService {
    export { Song };
}
import PostgresBase = require("./base");
/**
 * Songs Service
 */
type Song = import('../../data/song/song');
