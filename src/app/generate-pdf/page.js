import PDFGenerator from "../../utils/pdfGenerator";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, bullets } = req.body;

    if (!title || !bullets) {
      return res.status(400).json({ error: "Title and bullets are required." });
    }

    const outputPath = path.join(process.cwd(), "public", `${title}.pdf`);

    try {
      await PDFGenerator.generatePDF({ title, bullets }, outputPath);
      res.status(200).json({ message: "PDF generated", filePath: `/${title}.pdf` });
    } catch (err) {
      console.error("Error generating PDF:", err);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
