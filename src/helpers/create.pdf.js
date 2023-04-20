const PDFPrinter = require('pdfmake');
const { v4: uuid } = require('uuid');
const fs = require('fs');

const fonts = {
  Sono: {
    normal: 'templates/fonts/Sono-Regular.ttf',
    bold: 'templates/fonts/Sono-Bold.ttf',
  },
};

const generatePDF = async (contentInfo) => {
  const addressInfos = JSON.parse(contentInfo.buyer_address);
  const productInfos = JSON.parse(contentInfo.products_ordered);

  const productFormatedToInvoice = productInfos.map((product) => [
    product.product,
    `R$ ${product.price}`,
    product.quantity,
  ]);

  const printer = new PDFPrinter(fonts);
  const doc = {
    content: [
      { text: 'Nota Físcal Eletrônica', style: 'header' },
      '',
      { text: '---------------------------------', style: 'divisor' },
      { text: 'Informações da Pessoa Compradora', style: 'header2' },
      { text: '---------------------------------', style: 'divisor' },
      { text: `Nome completo: ${contentInfo.name}`, style: 'field' },
      { text: `CPF: ${contentInfo.cpf}`, style: 'field' },
      { text: `Contato: ${contentInfo.email}`, style: 'field' },
      { text: `Cidade: ${addressInfos.city}`, style: 'field' },
      { text: `Estado: ${addressInfos.state}`, style: 'field' },
      { text: '---------------------------------', style: 'divisor' },
      { text: 'Informações dos proutos adquiridos', style: 'header2' },
      { text: '---------------------------------', style: 'divisor' },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['60%', '20%', '20%'],
          body: [
            ['Produto', 'Preço', 'Quantidade'],
            ...productFormatedToInvoice,
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        alignment: 'center',
      },
      header2: {
        fontSize: 12,
      },
      field: {
        fontSize: 9,
      },
    },
    defaultStyle: {
      font: 'Sono',
    },
  };

  const options = {};

  const pdfName = `templates/temp_invoices/${uuid()}.pdf`;

  const pdfDoc = printer.createPdfKitDocument(doc, options);
  await pdfDoc.pipe(fs.createWriteStream(pdfName));
  await pdfDoc.end();

  return pdfName;
};

// const testAddress = JSON.stringify({
//   city: 'Conquista',
//   state: 'BA',
// });

// const testProduct = JSON.stringify([
//   {
//     product: 'test',
//     price: 4555,
//     quantity: 4,
//   },
// ]);

// generatePDF({
//   name: 'BLA BLA',
//   cpf: '454125',
//   email: 'balbla@email.com',
//   buyer_address: testAddress,
//   products_ordered: testProduct,
// });

module.exports = generatePDF;
