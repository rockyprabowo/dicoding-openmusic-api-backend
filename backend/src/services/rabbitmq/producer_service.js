const amqp = require('amqplib')

/**
 * Represent a RabbitMQ based message queue producer service
 *
 * @module services/rabbitmq/producer_service
 */
class ProducerService {
  /**
   * Sends a message to a message queue
   *
   * @param {string} queue Queue name
   * @param {string} message Message
   */
  sendMessage = async (queue, message) => {
    const connection = await amqp.connect(/** @type {string} */ (process.env.RABBITMQ_SERVER))
    const channel = await connection.createChannel()
    await channel.assertQueue(queue, {
      durable: true
    })

    channel.sendToQueue(queue, Buffer.from(message))

    setTimeout(() => {
      connection.close()
    }, 1000)
  }
}

module.exports = ProducerService
