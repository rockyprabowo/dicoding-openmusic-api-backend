export = Song;
/**
 * Represents a Song
 *
 * @module data/song
 * @typedef {import('../album/album')} Album
 */
declare class Song {
    static generateId(): string;
    /**
     * @function Object() { [native code] }
     * @param {object} obj Object payload
     * @param {string} [obj.id] id
     * @param {string} obj.title title
     * @param {number} obj.year year
     * @param {string} obj.performer performer
     * @param {string} obj.genre genre
     * @param {string} [obj.duration] duration
     * @param {string} [obj.albumId] albumId
     */
    constructor({ id, title, year, performer, genre, duration, albumId }: {
        id?: string;
        title: string;
        year: number;
        performer: string;
        genre: string;
        duration?: string;
        albumId?: string;
    });
    id: string;
    title: string;
    year: number;
    performer: string;
    genre: string;
    duration: string;
    albumId: string;
}
declare namespace Song {
    export { Album };
}
/**
 * Represents a Song
 */
type Album = import('../album/album');
