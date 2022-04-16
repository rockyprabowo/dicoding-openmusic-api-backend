export = InvariantError;
/**
 * Represent an invariant errors
 *
 * @module exceptions
 */
declare class InvariantError extends ClientError {
    /**
     * @function Object() { [native code] }
     * @param {string} [message] Error message
     */
    constructor(message?: string);
}
import ClientError = require("./client_error");
