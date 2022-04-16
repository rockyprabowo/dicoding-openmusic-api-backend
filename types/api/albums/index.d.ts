/**
 * Represents the options for Albums Plugin
 */
export type AlbumsService = import('../../services/postgresql/albums_service');
/**
 * Represents the options for Albums Plugin
 */
export type Validator = import('../../validators/base');
/**
 * Represents the options for Albums Plugin
 */
export type AlbumsPluginOptions = {
    /**
     * {@link AlbumsService }
     */
    service: AlbumsService;
    /**
     * Validator for {@link AlbumsPlugin }
     */
    validator: Validator;
};
/**
 * Albums Plugin object
 */
export type Plugin<T> = any;
/**
 * Albums Plugin - Registration
 *
 * @module api/albums
 */
/**
 * Represents the options for Albums Plugin
 *
 * @typedef {import('../../services/postgresql/albums_service')} AlbumsService
 * @typedef {import('../../validators/base')} Validator
 * @typedef {object} AlbumsPluginOptions
 * @property {AlbumsService} service {@link AlbumsService}
 * @property {Validator} validator Validator for {@link AlbumsPlugin}
 */
/**
 * Albums Plugin object
 *
 * @template T
 * @typedef {import('@hapi/hapi').Plugin<T>} Plugin
 * @type {Plugin<AlbumsPluginOptions>}
 */
export const AlbumsPlugin: any;
