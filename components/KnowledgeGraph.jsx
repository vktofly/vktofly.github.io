'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Dynamically import ForceGraph3D to avoid SSR issues
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-cosmic-950">
      <div className="w-8 h-8 border-4 border-cosmic-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function KnowledgeGraph() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const { theme, resolvedTheme } = useTheme();
  const fgRef = useRef();

  useEffect(() => {
    fetch('/graph-data.json')
      .then(res => res.json())
      .then(data => setGraphData(data))
      .catch(err => console.error("Failed to load graph data", err));
  }, []);

  const currentTheme = resolvedTheme || theme || 'dark';
  const isDark = currentTheme === 'dark';

  const getNodeColor = (node) => {
    if (node.group === 'blog') return isDark ? '#3b82f6' : '#2563eb'; // blue
    if (node.group === 'project') return isDark ? '#a855f7' : '#7e22ce'; // purple
    if (node.group === 'concept') return isDark ? '#22c55e' : '#16a34a'; // green
    return isDark ? '#9ca3af' : '#4b5563'; // gray
  };

  const handleNodeClick = useCallback(node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    
    if (fgRef.current) {
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
    }
  }, [fgRef]);

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl bg-zinc-50 dark:bg-cosmic-950">
      
      {/* Overlay Legend */}
      <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-cosmic-900/80 backdrop-blur-md p-4 rounded-xl border border-zinc-200 dark:border-white/10 shadow-lg pointer-events-none">
        <h3 className="font-bold text-sm mb-3">Node Types</h3>
        <div className="space-y-2 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span> Blog Posts
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span> Projects
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> Concepts & Skills
          </div>
        </div>
        <p className="mt-4 text-[10px] text-zinc-500 dark:text-zinc-400 max-w-[150px]">
          Scroll to zoom. Drag to rotate. Click a node to focus.
        </p>
      </div>

      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={getNodeColor}
        nodeRelSize={4}
        nodeVal="val"
        linkColor={() => isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
        linkWidth={1}
        backgroundColor={isDark ? '#0f172a' : '#f8fafc'} // match cosmic-950 or zinc-50
        onNodeClick={handleNodeClick}
        enableNodeDrag={false}
      />
    </div>
  );
}
