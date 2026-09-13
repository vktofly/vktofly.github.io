"use client";

import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function InteractivePlayground({ files, template = "react", dependencies = {} }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <Sandpack
        template={template}
        theme="dark"
        files={files}
        customSetup={{
          dependencies,
        }}
        options={{
          showNavigator: true,
          showTabs: true,
          closableTabs: true,
          editorHeight: 400,
          wrapContent: true,
        }}
      />
    </div>
  );
}
