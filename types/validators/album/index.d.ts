export = AlbumValidator;
/**
 * Represent the validator for {@link Album}
 *
 * @typedef {import('../../data/album/album')} Album
 * @module validators
 */
declare class AlbumValidator extends Validator {
}
declare namespace AlbumValidator {
    export { Album };
}
import Validator = require("../base");
/**
 * Represent the validator for {@link Album }
 */
type Album = import('../../data/album/album');
