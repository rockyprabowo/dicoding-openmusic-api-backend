export = AlbumsService;
/**
 * Albums Service
 *
 * @module services/postgresql
 * @typedef {import('../../data/album/album')} Album
 */
declare class AlbumsService extends PostgresBase {
    /**
     * Adds an {@link Album} into database
     */
    addAlbum(): Promise<void>;
    /**
     * Get an {@link Album} by its {@link Album.id id} from database
     */
    getAlbumById(): Promise<void>;
    /**
     * Edit an {@link Album} with {@link Album.id id} from database
     */
    editAlbumById(): Promise<void>;
    /**
     * Delete an {@link Album} with {@link Album.id id} from database
     */
    deleteAlbumById(): Promise<void>;
}
declare namespace AlbumsService {
    export { Album };
}
import PostgresBase = require("./base");
/**
 * Albums Service
 */
type Album = import('../../data/album/album');
