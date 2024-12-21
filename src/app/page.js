"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ title: "", bullets: "" });
  const [downloadLink, setDownloadLink] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission and PDF generation
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");

    try {
      // Dynamically import the pdf-lib library
      const { PDFDocument } = await import('pdf-lib');

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([350, 400]);
      page.moveTo(110, 200);
      page.drawText('Hello World!');
      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      console.log(pdfDataUri)

      setDownloadLink(pdfDataUri);

    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Submit Your Information</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Enter the title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bullets"
          >
            Bullets
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bullets"
            name="bullets"
            placeholder="Enter your bullets here"
            rows="5"
            value={formData.bullets}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      {downloadLink && (
        <div className="mt-4">
            <a
              href={downloadLink}
              download={`${formData.title}.pdf`}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
