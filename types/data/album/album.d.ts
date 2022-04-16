export = Album;
/**
 * Represents an Album
 *
 * @module data/album
 * @typedef {import('../song/song')} Song
 */
declare class Album {
    static generateId(): string;
    /**
     * @function Object() { [native code] }
     * @param {object} obj Object payload
     * @param {string} [obj.id] id
     * @param {string} obj.name name
     * @param {number} obj.year year
     */
    constructor({ id, name, year }: {
        id?: string;
        name: string;
        year: number;
    });
    id: string;
    name: string;
    year: number;
}
declare namespace Album {
    export { Song };
}
/**
 * Represents an Album
 */
type Song = import('../song/song');
