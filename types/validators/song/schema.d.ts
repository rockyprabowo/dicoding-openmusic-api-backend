export = SongPayloadSchema;
/**
 * Represents the {@link Song} payload schema
 *
 * @typedef {import('../../data/song/song')} Song
 * @type {Joi.ObjectSchema}
 */
declare const SongPayloadSchema: Joi.ObjectSchema;
declare namespace SongPayloadSchema {
    export { Song };
}
import Joi = require("joi");
/**
 * Represents the {@link Song } payload schema
 */
type Song = import('../../data/song/song');
