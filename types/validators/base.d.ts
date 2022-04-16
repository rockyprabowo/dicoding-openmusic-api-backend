export = Validator;
/**
 * Represent a base validator class
 *
 * @module validators
 */
declare class Validator {
    /**
     * Validate the {@link payload}
     *
     * @abstract
     * @param {object} payload Object payload
     * @returns {void|never} `void` or `UnimplementedError`
     */
    validate(payload: object): void | never;
}
