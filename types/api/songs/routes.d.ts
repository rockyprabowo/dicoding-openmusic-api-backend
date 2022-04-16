export = routes;
/**
 * Songs Plugin - Routes
 *
 * @module api/songs
 * @typedef {import('@hapi/hapi').ServerRoute} ServerRoute
 * @param {SongsHandler} handler Songs handler
 * @returns {ServerRoute[]} Hapi route definitions
 */
declare function routes(handler: SongsHandler): ServerRoute[];
declare namespace routes {
    export { ServerRoute };
}
import { SongsHandler } from "./handler";
/**
 * Songs Plugin - Routes
 */
type ServerRoute = any;
