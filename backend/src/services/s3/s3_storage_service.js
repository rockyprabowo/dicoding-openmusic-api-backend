const AWS = require('aws-sdk')
const stream = require('stream')
const BaseStorageService = require('@openmusic/common/services/storage/base')

/**
 * OpenMusic API - S3 Storage Service
 *
 * @module services/s3/s3_storage_service
 */
/**
 * @typedef {import('aws-sdk').S3.ManagedUpload} ManagedUpload
 * @typedef {import('aws-sdk').S3.ManagedUpload.SendData} SendData
 */

/**
 * Represent a S3 storage service
 *
 * @memberof module:services/s3/s3_storage_service
 */
class S3StorageService extends BaseStorageService {
  #S3

  constructor () {
    super()
    const region = process.env.AWS_S3_REGION || undefined
    const endpoint = process.env.AWS_S3_ENDPOINT || undefined
    this.#S3 = new AWS.S3({
      endpoint,
      region
    })
  }

  /**
   * Upload the file to a S3 Bucket
   *
   * @param {stream.Readable} fileStream File stream
   * @param {any} metadata Uploaded file metadata
   * @param {string} [outputFileName] Output File Name
   * @returns {Promise<string>} URL of uploaded file
   * @override
   */
  writeFile (fileStream, metadata, outputFileName) {
    const parameter = {
      Bucket: /** @type {string} */ (process.env.AWS_BUCKET_NAME),
      Key: outputFileName || +new Date() + metadata.filename,
      Body: fileStream,
      ContentType: metadata.headers['content-type']
    }

    return new Promise((resolve, reject) => {
      this.#S3.upload(parameter,
        /** @type {function(Error,SendData):void} */
        (err, data) => {
          if (err) {
            return reject(err)
          }
          return resolve(data.Location)
        })
    })
  }
}

module.exports = S3StorageService
