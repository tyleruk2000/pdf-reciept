import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export default class PDFGenerator {
  static async generatePDF(data, outputPath) {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add a page to the document
      const page = pdfDoc.addPage([600, 400]);

      // Set up fonts
      const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      // Title
      page.drawText("Submitted Information", {
        x: 200,
        y: pageHeight - 50,
        size: 20,
        font,
      });

      // Title text
      page.drawText(`Title: ${data.title}`, {
        x: 50,
        y: pageHeight - 100,
        size: 14,
        font,
      });

      // Bullets text
      page.drawText("Bullets:", {
        x: 50,
        y: pageHeight - 140,
        size: 14,
        font,
      });

      // Draw bullets content
      page.drawText(data.bullets, {
        x: 50,
        y: pageHeight - 160,
        size: 12,
        font,
        maxWidth: pageWidth - 100,
        lineHeight: 14,
      });

      // Serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();

      // Write the PDF to the output file
      fs.writeFileSync(outputPath, pdfBytes);

      return outputPath;
    } catch (err) {
      throw new Error("Error generating PDF: " + err.message);
    }
  }
}
