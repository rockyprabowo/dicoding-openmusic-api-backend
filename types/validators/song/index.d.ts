export = SongValidator;
/**
 * Represent the validator for {@link Song}
 *
 * @typedef {import('../../data/song/song')} Song
 * @module validators
 */
declare class SongValidator extends Validator {
}
declare namespace SongValidator {
    export { Song };
}
import Validator = require("../base");
/**
 * Represent the validator for {@link Song }
 */
type Song = import('../../data/song/song');
