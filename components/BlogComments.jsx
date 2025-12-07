"use client";

import { useEffect, useRef } from "react";

export default function BlogComments({ slug }) {
  const commentsRef = useRef(null);
  const isGiscusLoaded = useRef(false);

  useEffect(() => {
    if (isGiscusLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", process.env.NEXT_PUBLIC_GISCUS_REPO || "");
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "");
    script.setAttribute("data-category", process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements");
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    const currentRef = commentsRef.current;
    if (currentRef) {
      currentRef.appendChild(script);
      isGiscusLoaded.current = true;
    }

    return () => {
      // Cleanup: remove script if component unmounts
      if (currentRef && currentRef.contains(script)) {
        currentRef.removeChild(script);
        isGiscusLoaded.current = false;
      }
    };
  }, [slug]);

  // Check if Giscus is configured
  const isConfigured = 
    process.env.NEXT_PUBLIC_GISCUS_REPO && 
    process.env.NEXT_PUBLIC_GISCUS_REPO_ID &&
    process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!isConfigured) {
    return (
      <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 text-center">
          <h3 className="text-xl font-semibold mb-3 text-palette-primary dark:text-zinc-100">
            Comments
          </h3>
          <p className="text-sm text-palette-secondary dark:text-zinc-400 mb-4">
            Comments are not configured yet. To enable comments, please set up Giscus.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Configure <code className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-xs">NEXT_PUBLIC_GISCUS_REPO</code>,{" "}
            <code className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-xs">NEXT_PUBLIC_GISCUS_REPO_ID</code>, and{" "}
            <code className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-xs">NEXT_PUBLIC_GISCUS_CATEGORY_ID</code> in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold tracking-tight text-palette-primary dark:text-zinc-100 mb-2">
          Comments
        </h3>
        <p className="text-sm text-palette-secondary dark:text-zinc-400">
          Share your thoughts and join the discussion. Comments are powered by GitHub Discussions.
        </p>
      </div>
      <div 
        ref={commentsRef}
        className="mt-6"
      />
    </div>
  );
}

