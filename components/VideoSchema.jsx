import JsonLd from './JsonLd';

/**
 * Video Schema Component
 * 
 * Displays VideoObject structured data for video content
 * 
 * @param {string} name - Video title
 * @param {string} description - Video description
 * @param {string} thumbnailUrl - URL to video thumbnail
 * @param {string} uploadDate - Upload date in ISO 8601 format (YYYY-MM-DD)
 * @param {string} duration - Duration in ISO 8601 format (e.g., "PT1H30M" for 1 hour 30 minutes)
 * @param {string} contentUrl - Direct URL to video file
 * @param {string} embedUrl - URL for embedding the video
 * 
 * Example:
 * <VideoSchema 
 *   name="Introduction to Quantum Computing"
 *   description="A comprehensive introduction to quantum computing principles"
 *   thumbnailUrl="https://example.com/thumbnail.jpg"
 *   uploadDate="2024-01-15"
 *   duration="PT45M"
 *   contentUrl="https://example.com/video.mp4"
 *   embedUrl="https://youtube.com/embed/xyz"
 * />
 */
export default function VideoSchema({ 
  name, 
  description, 
  thumbnailUrl, 
  uploadDate, 
  duration, 
  contentUrl, 
  embedUrl 
}) {
  if (!name || !description || !thumbnailUrl) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": contentUrl,
    "embedUrl": embedUrl,
    "publisher": {
      "@type": "Person",
      "name": "Vikash",
      "url": "https://vktofly.github.io"
    }
  };

  return <JsonLd data={schema} />;
}
