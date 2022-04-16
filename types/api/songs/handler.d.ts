/**
 * Songs Plugin - Handler class
 */
export type SongsPluginOptions = import('.').SongsPluginOptions;
/**
 * Songs Plugin - Handler class
 */
export type Request = any;
/**
 * Songs Plugin - Handler class
 */
export type ResponseToolkit = any;
/**
 * Songs Plugin - Handler class
 *
 * @module api/songs
 * @typedef {import('.').SongsPluginOptions} SongsPluginOptions
 * @typedef {import('@hapi/hapi').Request} Request
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 */
/**
 * Songs Plugin - Handler
 */
export class SongsHandler {
    /**
     * Album plugin handler
     *
     * @param {SongsPluginOptions} options Songs plugin options
     */
    constructor(options: SongsPluginOptions);
    service: import("../../services/postgresql/songs_service");
    validator: import("../../validators/base");
    /**
     * Handles `POST` request to add a new song.
     *
     * @param {Request} request Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    postSongHandler: (request: any, h: any) => void;
    /**
     * Handles `GET` request to fetch all songs.
     *
     * @param {Request} request Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    getSongsHandler: (request: any, h: any) => void;
    /**
     * Handles `GET` request to fetch a song by its id.
     *
     * @param {Request} request Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    getSongByIdHandler: (request: any, h: any) => void;
    /**
     * Handles `PUT` request to update a song with `id`.
     *
     * @param {Request} request Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    putSongByIdHandler: (request: any, h: any) => void;
    /**
     * Handles `DELETE` request to delete an album with `id`.
     *
     * @param {Request} request Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    deleteSongByIdHandler: (request: any, h: any) => void;
}
