export = AlbumPayloadSchema;
/**
 * Represents the {@link Album} payload schema
 *
 * @typedef {import('../../data/album/album')} Album
 * @type {Joi.ObjectSchema}
 */
declare const AlbumPayloadSchema: Joi.ObjectSchema;
declare namespace AlbumPayloadSchema {
    export { Album };
}
import Joi = require("joi");
/**
 * Represents the {@link Album } payload schema
 */
type Album = import('../../data/album/album');
