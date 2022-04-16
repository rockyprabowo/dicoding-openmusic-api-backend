/**
 * Represents the options for Songs Plugin
 */
export type SongsService = import('../../services/postgresql/songs_service');
/**
 * Represents the options for Songs Plugin
 */
export type Validator = import('../../validators/base');
/**
 * Represents the options for Songs Plugin
 */
export type SongsPluginOptions = {
    /**
     * {@link SongsService }
     */
    service: SongsService;
    /**
     * Validator for {@link AlbumsPlugin }
     */
    validator: Validator;
};
/**
 * Songs Plugin object
 */
export type Plugin<T> = any;
/**
 * Songs Plugin
 *
 * @module api/songs
 */
/**
 * Represents the options for Songs Plugin
 *
 * @typedef {import('../../services/postgresql/songs_service')} SongsService
 * @typedef {import('../../validators/base')} Validator
 * @typedef {object} SongsPluginOptions
 * @property {SongsService} service {@link SongsService}
 * @property {Validator} validator Validator for {@link AlbumsPlugin}
 */
/**
 * Songs Plugin object
 *
 * @template T
 * @typedef {import('@hapi/hapi').Plugin<T>} Plugin
 * @type {Plugin<SongsPluginOptions>}
 */
export const SongsPlugin: any;
