const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3')
const { Upload } = require('@aws-sdk/lib-storage')
const stream = require('stream')
const BaseStorageService = require('@openmusic/common/services/storage/base')

/**
 * OpenMusic API - S3 Storage Service
 *
 * @typedef {import('@aws-sdk/client-s3').CompleteMultipartUploadCommandOutput} CompleteMultipartUploadCommandOutput
 * @module services/s3/s3_storage_service
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
    this.#S3 = new S3Client({
      endpoint,
      region,
      forcePathStyle: true
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
  async writeFile (fileStream, metadata, outputFileName) {
    const uploader = new Upload({
      client: this.#S3,
      params: {
        Bucket: /** @type {string} */ (process.env.AWS_BUCKET_NAME),
        Key: outputFileName || +new Date() + metadata.filename,
        Body: fileStream,
        ContentType: metadata.headers['content-type'],
        ACL: 'public-read'
      }
    })

    /** @type {CompleteMultipartUploadCommandOutput} */
    const data = await uploader.done()

    if (data.Location) {
      return data.Location
    }

    throw new Error('File upload aborted')
  }
}

module.exports = S3StorageService
