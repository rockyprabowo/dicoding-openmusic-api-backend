
/**
 * Exports Plugin - Types
 *
 * @typedef {import('~api/exports')} ExportsPlugin
 * @typedef {import('~api/exports/handler').ExportsHandler} ExportsHandler
 * @typedef {import('~services/rabbitmq/producer_service')} ProducerService
 * @typedef {import('~validators/export')} ExportValidator
 * @typedef {import('@openmusic/common/services/postgresql/collaborations_service')} CollaborationsService
 */

/**
 * Represents the options for {@link ExportsPlugin}
 *
 * @typedef {object} ExportsPluginOptions
 * @property {ProducerService} producerService Producer Service for {@link ExportsHandler}
 * @property {ExportValidator} validator Validator for {@link ExportsHandler}
 */

module.exports = {}
