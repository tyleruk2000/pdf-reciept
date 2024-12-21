import { PDFDocument } from 'pdf-lib';

const fontSize = 18;
const maxPageSize = 300;
const maxPageInPoint = (maxPageSize / 25.4) * 72;;
const lineGap = 2;
const bottomMargin = 5;

// Function to generate a PDF
export const generatePDF = async ({ title, bullets }) => {
  try {

    const bulletList = bullets.split('\n');
    const pageCount =  ((bulletList.length*(fontSize+lineGap)+fontSize+bottomMargin)/maxPageInPoint);
    console.log(pageCount)  
    //Manage Dimensions
    const widthInMM = 80;
    const widthInPoints = (widthInMM / 25.4) * 72;

    const heightInMM = maxPageSize;
    let heightInPoints = (heightInMM / 25.4) * 72;
    if (pageCount < 1) {
        heightInPoints = ((fontSize+15+((fontSize+lineGap)+bottomMargin)*bulletList.length));
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([widthInPoints, heightInPoints]);

    // Customize PDF content with title and bullets
    page.moveTo(10, heightInPoints-20);
    page.drawText(`${title}`, { size: fontSize});
    page.drawLine({
        start: { x: 0, y: heightInPoints-12-fontSize },
        end: { x: widthInPoints, y: heightInPoints-12-fontSize },
        thickness: 2,
        opacity: 0.75,
      })
    
    let bulletY = heightInPoints-30
    bulletList.forEach((bullet, index) => {
      bulletY = bulletY-(fontSize+lineGap)
      console.log(bulletY);

      if (bulletY < bottomMargin) {
        console.log("new page")
        page = pdfDoc.addPage([widthInPoints, heightInPoints]);
        bulletY = heightInPoints-30
      }

      page.moveTo(10, bulletY);
      const cleanLine = bullet.replace(/^-\s\[\s\]\s/, "");  // This will remove "- [ ] " at the start
      let bulletPoint = '[ ] ';
      if (cleanLine === "") {
        bulletPoint = '';
      }
      page.drawText(`${bulletPoint}${cleanLine}`, { size: fontSize });
    });

    // Generate PDF in base64 format
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    return pdfDataUri;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
