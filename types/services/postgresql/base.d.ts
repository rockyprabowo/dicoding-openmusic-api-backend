export = PostgresBase;
/**
 * Base PostgreSQL DB persistence Service
 *
 * @module services/postgresql
 * @typedef {import('pg').Client} Client
 * @typedef {(Pool | Client)} Connection
 */
declare class PostgresBase extends BaseService {
    /**
     * @function Object() { [native code] }
     * @param {object} [options] Options
     * @param {Connection} [options.connection] Connection
     */
    constructor({ connection }?: {
        connection?: Connection;
    });
    get db(): Connection;
    #private;
}
declare namespace PostgresBase {
    export { Client, Connection };
}
import BaseService = require("../base");
/**
 * Base PostgreSQL DB persistence Service
 */
type Connection = (Pool | Client);
/**
 * Base PostgreSQL DB persistence Service
 */
type Client = import('pg').Client;
import { Pool } from "pg";
