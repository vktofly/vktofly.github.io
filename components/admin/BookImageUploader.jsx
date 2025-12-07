"use client";

import { useState } from "react";

export default function BookImageUploader({ books: booksProp }) {
  const [books] = useState(booksProp || []);
  const [selectedBook, setSelectedBook] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({});
  const [generatedFile, setGeneratedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (!selectedBook) {
      alert("Please select a book first");
      return;
    }

    // Convert to base64 or use a file hosting service
    // For GitHub Pages, we'll use base64 data URL or upload to a service
    // For now, let's use a simple approach: convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      setImageUrl(base64Image);
      setUploadedImages({
        ...uploadedImages,
        [selectedBook.slug]: base64Image,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlInput = (url) => {
    setImageUrl(url);
    if (selectedBook) {
      setUploadedImages({
        ...uploadedImages,
        [selectedBook.slug]: url,
      });
    }
  };

  const generateUpdatedFile = () => {
    const updatedBooks = books.map((book) => {
      if (uploadedImages[book.slug]) {
        return {
          ...book,
          coverImage: uploadedImages[book.slug],
        };
      }
      return book;
    });

    // Generate the file content
    const header = `/**
 * Books Data
 * 
 * A curated collection of books that have shaped thinking, philosophy, and work.
 * Each book represents a node in the knowledge compounding system.
 * 
 * Images are automatically fetched from Open Library or Google Books API.
 */

`;

    const fileContent = `${header}const books = ${JSON.stringify(updatedBooks, null, 2)};

export default books;
`;

    setGeneratedFile(fileContent);
  };

  const copyToClipboard = () => {
    if (generatedFile) {
      navigator.clipboard.writeText(generatedFile);
      alert("File content copied to clipboard! Paste it into data/books.js");
    }
  };

  const downloadFile = () => {
    if (generatedFile) {
      const blob = new Blob([generatedFile], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "books.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Book Selection */}
      <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
        <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-2">
          Select Book
        </label>
        <select
          value={selectedBook?.slug || ""}
          onChange={(e) => {
            const book = books.find((b) => b.slug === e.target.value);
            setSelectedBook(book);
            setImageUrl(book?.coverImage || uploadedImages[book?.slug] || "");
          }}
          className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">-- Select a book --</option>
          {books.map((book) => (
            <option key={book.slug} value={book.slug}>
              {book.title} {book.author ? `by ${book.author}` : ""}
            </option>
          ))}
        </select>
      </div>

      {selectedBook && (
        <>
          {/* Current Image Preview */}
          {selectedBook.coverImage && (
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
              <h3 className="text-sm font-medium text-palette-primary dark:text-zinc-200 mb-2">
                Current Cover
              </h3>
              <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Drag and Drop Area */}
          <div
            className={`p-8 border-2 border-dashed rounded-lg transition-colors ${
              dragActive
                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-palette-primary dark:text-zinc-200 font-medium mb-2">
                Drag and drop book cover image here
              </p>
              <p className="text-sm text-palette-secondary dark:text-zinc-400 mb-4">
                or
              </p>
              <label className="inline-block px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 cursor-pointer transition-colors">
                Browse Files
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* URL Input Alternative */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
            <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-2">
              Or Enter Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => handleUrlInput(e.target.value)}
              placeholder="https://example.com/book-cover.jpg"
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Preview New Image */}
          {imageUrl && (
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
              <h3 className="text-sm font-medium text-palette-primary dark:text-zinc-200 mb-2">
                New Cover Preview
              </h3>
              <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={`${selectedBook.title} cover`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Generate File Button */}
      {Object.keys(uploadedImages).length > 0 && (
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-palette-primary dark:text-zinc-200">
                Updated {Object.keys(uploadedImages).length} book
                {Object.keys(uploadedImages).length !== 1 ? "s" : ""}
              </h3>
              <p className="text-xs text-palette-secondary dark:text-zinc-400 mt-1">
                Generate updated data file
              </p>
            </div>
            <button
              onClick={generateUpdatedFile}
              className="px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors"
            >
              Generate File
            </button>
          </div>
        </div>
      )}

      {/* Generated File Display */}
      {generatedFile && (
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-palette-primary dark:text-zinc-200">
              Generated File Content
            </h3>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Copy
              </button>
              <button
                onClick={downloadFile}
                className="px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg overflow-auto max-h-96">
            <pre className="text-xs font-mono text-palette-primary dark:text-zinc-200 whitespace-pre-wrap">
              {generatedFile.substring(0, 500)}...
            </pre>
          </div>
          <p className="text-xs text-palette-secondary dark:text-zinc-400 mt-2">
            Replace the content of <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">data/books.js</code> with
            this content
          </p>
        </div>
      )}
    </div>
  );
}

