export = NotFoundError;
/**
 * Represent a not found error
 *
 * @module exceptions
 */
declare class NotFoundError extends ClientError {
    /**
     * @function Object() { [native code] }
     * @param {string} [message] Error message
     */
    constructor(message?: string);
}
import ClientError = require("./client_error");
