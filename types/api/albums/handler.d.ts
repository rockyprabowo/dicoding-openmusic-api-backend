export = AlbumsHandler;
/**
 * Albums Plugin - Handler class
 *
 * @module api/albums
 * @typedef {import('.').AlbumsPluginOptions} AlbumsPluginOptions
 * @typedef {import('@hapi/hapi').Request} Request
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 */
/**
 * Albums Plugin - Handler
 */
declare class AlbumsHandler {
    /**
     * Album plugin handler
     *
     * @param {AlbumsPluginOptions} options Albums plugin options
     */
    constructor(options: AlbumsPluginOptions);
    albumsService: import("../../services/postgresql/albums_service");
    albumValidator: import("../../validators/base");
    /**
     * Handles `POST` request to add a new album.
     *
     * @param {Request} request Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    postAlbumHandler: (request: any, h: any) => void;
    /**
     * Handles `GET` request to fetch all album.
     *
     * @param {Request} request Request object Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    getAlbumsHandler: (request: any, h: any) => void;
    /**
     * Handles `GET` request to fetch an album by its `id`.
     *
     * @param {Request} request Request object Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    getAlbumByIdHandler: (request: any, h: any) => void;
    /**
     * Handles `PUT` request to update an album with `id`.
     *
     * @param {Request} request Request object Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    putAlbumByIdHandler: (request: any, h: any) => void;
    /**
     * Handles `DELETE` request to delete an album with `id`.
     *
     * @param {Request} request Request object Request object
     * @param {ResponseToolkit} h Response toolkit
     */
    deleteAlbumByIdHandler: (request: any, h: any) => void;
}
declare namespace AlbumsHandler {
    export { AlbumsPluginOptions, Request, ResponseToolkit };
}
/**
 * Albums Plugin - Handler class
 */
type AlbumsPluginOptions = import('.').AlbumsPluginOptions;
/**
 * Albums Plugin - Handler class
 */
type Request = any;
/**
 * Albums Plugin - Handler class
 */
type ResponseToolkit = any;
