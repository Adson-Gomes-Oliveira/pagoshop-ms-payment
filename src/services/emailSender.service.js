const nodemailer = require('nodemailer');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const htmlTemplateForInvoice = fs.readFileSync('templates/invoiceMailTemplate.html');

async function emailSender(targetEmail, pdfInvoiceContent) {
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
        filename: `invoices_pdf/${uuid()}.pdf`,
        content: pdfInvoiceContent,
        contentType: 'application/pdf',
      },
    ],
  });
}

module.exports = emailSender;
