const stream = require('stream')
const NotImplementedError = require('../../exceptions/not_implemented_error')

class BaseStorageService {
  constructor () {
    if (this.constructor === BaseStorageService) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  /**
   * Writes file into file system
   *
   * @param {stream.Readable} fileStream File stream
   * @param {any} metadata Uploaded file metadata
   * @param {string} [outputFileName] Output File Name
   * @returns {Promise<string>} URL of uploaded file
   * @abstract
   */
  writeFile (fileStream, metadata, outputFileName) {
    throw new NotImplementedError()
  }
}

module.exports = BaseStorageService
