export = ClientError;
/**
 * Represent a Client related errors
 *
 * @module exceptions
 */
declare class ClientError extends Error {
    /**
     * @function Object() { [native code] }
     * @param {string} [message] Error message
     * @param {number} [statusCode] HTTP status code
     */
    constructor(message?: string, statusCode?: number);
    statusCode: number;
}
