const nodemailer = require('nodemailer');
const fs = require('fs');

const htmlTemplateForInvoice = fs.readFileSync('templates/invoiceMailTemplate.html');

async function emailSender(targetEmail, pdfInvoicePath) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'adsonpersonalemail@gmail.com',
      pass: 'fksidbaysjslmwvh',
    },
  });

  await transporter.sendMail({
    from: 'Trooper Ecommerce <adsonpersonalemail@gmail.com>',
    to: targetEmail,
    subject: 'Trooper Ecommerce - Confirmação de Compra',
    html: htmlTemplateForInvoice,
    attachments: [
      {
        filename: pdfInvoicePath,
        contentType: 'application/pdf',
      },
    ],
  });
}

emailSender('danielmacield@gmail.com');

module.exports = emailSender;
