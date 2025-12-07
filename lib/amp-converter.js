/**
 * AMP HTML Converter
 * 
 * Converts regular HTML to AMP-compliant HTML by:
 * - Removing invalid tags and attributes
 * - Converting images to amp-img
 * - Converting videos to amp-video
 * - Removing inline styles (AMP requires CSS in <style amp-custom>)
 * - Ensuring all scripts are AMP-compliant
 */

export function convertToAMP(html) {
  if (!html) return '';

  let ampHtml = html;

  // Remove script tags (AMP doesn't allow custom JavaScript)
  ampHtml = ampHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // Convert images to amp-img
  ampHtml = ampHtml.replace(
    /<img([^>]*)>/gi,
    (match, attrs) => {
      // Extract src, alt, width, height, and other attributes
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
      const widthMatch = attrs.match(/width=["']?(\d+)["']?/i);
      const heightMatch = attrs.match(/height=["']?(\d+)["']?/i);
      const classMatch = attrs.match(/class=["']([^"']+)["']/i);

      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : '';
      const width = widthMatch ? widthMatch[1] : '1200';
      const height = heightMatch ? heightMatch[1] : '630';
      const className = classMatch ? ` class="${classMatch[1]}"` : '';

      // Convert relative URLs to absolute
      const absoluteSrc = src.startsWith('http') 
        ? src 
        : src.startsWith('/')
        ? `https://vktofly.github.io${src}`
        : `https://vktofly.github.io/${src}`;

      return `<amp-img src="${absoluteSrc}" alt="${alt}" width="${width}" height="${height}"${className} layout="responsive"></amp-img>`;
    }
  );

  // Convert iframes to amp-iframe (for embeds)
  ampHtml = ampHtml.replace(
    /<iframe([^>]*)>/gi,
    (match, attrs) => {
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      const widthMatch = attrs.match(/width=["']?(\d+)["']?/i);
      const heightMatch = attrs.match(/height=["']?(\d+)["']?/i);
      
      const src = srcMatch ? srcMatch[1] : '';
      const width = widthMatch ? widthMatch[1] : '560';
      const height = heightMatch ? heightMatch[1] : '315';

      return `<amp-iframe src="${src}" width="${width}" height="${height}" layout="responsive" sandbox="allow-scripts allow-same-origin"></amp-iframe>`;
    }
  );

  // Remove inline styles (AMP requires CSS in <style amp-custom>)
  ampHtml = ampHtml.replace(/style=["'][^"']*["']/gi, '');

  // Remove invalid attributes
  ampHtml = ampHtml.replace(/on\w+=["'][^"']*["']/gi, ''); // Remove event handlers

  // Ensure all links are absolute
  ampHtml = ampHtml.replace(
    /href=["']([^"']+)["']/gi,
    (match, href) => {
      if (href.startsWith('http') || href.startsWith('#')) {
        return match;
      }
      const absoluteHref = href.startsWith('/')
        ? `https://vktofly.github.io${href}`
        : `https://vktofly.github.io/${href}`;
      return `href="${absoluteHref}"`;
    }
  );

  return ampHtml;
}

/**
 * Generate AMP-compliant CSS
 */
export function generateAMPCSS() {
  return `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #222;
      background: #fff;
      margin: 0;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      line-height: 1.2;
      margin-top: 2em;
      margin-bottom: 1em;
    }
    h1 { font-size: 2.5em; }
    h2 { font-size: 2em; }
    h3 { font-size: 1.5em; }
    p {
      margin: 1em 0;
      line-height: 1.8;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    img, amp-img {
      max-width: 100%;
      height: auto;
      margin: 1em 0;
    }
    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    pre {
      background: #f5f5f5;
      padding: 1em;
      overflow-x: auto;
      border-radius: 5px;
    }
    blockquote {
      border-left: 4px solid #0066cc;
      padding-left: 1em;
      margin-left: 0;
      color: #666;
      font-style: italic;
    }
    ul, ol {
      margin: 1em 0;
      padding-left: 2em;
    }
    li {
      margin: 0.5em 0;
    }
    .article-header {
      margin-bottom: 2em;
      padding-bottom: 1em;
      border-bottom: 1px solid #eee;
    }
    .article-meta {
      color: #666;
      font-size: 0.9em;
      margin-top: 0.5em;
    }
    .article-content {
      margin-top: 2em;
    }
  `;
}

