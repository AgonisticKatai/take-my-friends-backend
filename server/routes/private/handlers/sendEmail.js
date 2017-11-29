const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function registerEmail (email) {
  const registerEmailText = `Thanks for signing up and welcome to Take My Friends. Complete your user profile to enjoy an incredible user experience and thus be able to find among your circle of friends who works on what you need. Take My Friends © - 2017 - all rights reserved`
  const msg = {
    to: email,
    from: 'noreply@takemyfriends.com',
    subject: 'User registry - Take My Friends',
    text: registerEmailText,
    html: `<strong>${registerEmailText}</strong>`
  }
  await sgMail.send(msg)
}

async function messageNotificationEmail (email, name, lastname) {
  console.log('sending message...')
  const messageReceivedEmailText = `You have received a new message from ${name} ${lastname}! Please, access your messages inbox to read it. Take My Friends © - 2017 - all rights reserved`
  const msg = {
    to: email,
    from: 'noreply@takemyfriends.com',
    subject: 'You have received a new message - Take My Friends',
    text: messageReceivedEmailText,
    html: `<strong>${messageReceivedEmailText}</strong>`
  }
  await sgMail.send(msg)
}

module.exports = { registerEmail, messageNotificationEmail }
