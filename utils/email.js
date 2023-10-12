import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Nischay <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
          user: process.env.BREVO_LOGIN_NAME,
          pass: process.env.BREVO_SMTP_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    // render html
    const html = pug.renderFile(
      `${__dirname}/../../emailTemplates/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    // define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    // create transport and send

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Project');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for 10 minutes)',
    );
  }
}

export default Email;
