const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport')

class PlaylistExportMailer {
  #transporter

  constructor () {
    this.#transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
      }
    })
  }

  /**
   * Sends an e-mail with
   *
   * @param {string} targetEmail Target Email
   * @param {string} content Attachment content
   * @returns {Promise<SMTPTransport.SentMessageInfo>} Sent message info
   */
  sendEmail (targetEmail, content) {
    const message = {
      from: `OpenMusic <${process.env.MAIL_ADDRESS}>`,
      to: targetEmail,
      subject: 'Playlist Export',
      text: "Attached to this mail is the playlist you've exported.\n\nOpenMusic",
      attachments: [
        {
          filename: 'playlist.json',
          content
        }
      ]
    }

    return this.#transporter.sendMail(message)
  }
}

module.exports = PlaylistExportMailer
