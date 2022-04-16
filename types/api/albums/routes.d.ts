export = routes;
/**
 * Albums Plugin - Routes
 *
 * @module api/albums
 * @typedef {import('@hapi/hapi').ServerRoute} ServerRoute Hapi route definitions
 * @param {AlbumsHandler} handler Albums handler
 * @returns {ServerRoute[]} Hapi route definitions
 */
declare function routes(handler: AlbumsHandler): ServerRoute[];
declare namespace routes {
    export { ServerRoute };
}
import AlbumsHandler = require("./handler");
/**
 * Hapi route definitions
 */
type ServerRoute = any;
