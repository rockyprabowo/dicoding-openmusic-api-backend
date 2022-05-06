const fs = require('fs')
const stream = require('stream')
const BaseStorageService = require('@openmusic/common/services/storage/base')

class LocalStorageService extends BaseStorageService {
  #directory
  #urlGenerator

  get directory () { return this.#directory }

  /**
   * @param {string} [directory] Directory
   * @param {function(string): string} [urlGenerator] URL Generator
   * @override
   */
  constructor (directory, urlGenerator) {
    super()
    if (directory && urlGenerator) {
      this.#directory = directory
      this.#urlGenerator = urlGenerator
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
      }
    } else {
      throw new Error('Constructor parameter missing.')
    }
  }

  /**
   * Upload the file to local storage
   *
   * @param {stream.Readable} fileStream File stream
   * @param {any} metadata Uploaded file metadata
   * @param {string} [outputFileName] Output File Name
   * @returns {Promise<string>} URL of uploaded file
   */
  writeFile (fileStream, metadata, outputFileName) {
    const filename = outputFileName || +new Date() + metadata.filename
    const path = `${this.#directory}/${filename}`

    const outputFileStream = fs.createWriteStream(path)

    return new Promise((resolve, reject) => {
      outputFileStream.on('error', (error) => reject(error))
      fileStream.pipe(outputFileStream)
      fileStream.on('end', () => resolve(this.#urlGenerator(filename)))
    })
  }
}

module.exports = LocalStorageService
