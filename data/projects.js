/**
 * Projects Data
 * 
 * Your portfolio projects. Featured projects appear on homepage.
 * 
 * Best Practices:
 * - Start with your 2-3 best projects
 * - Include metrics/impact when possible
 * - Use descriptive tags for filtering
 * - Add images for visual appeal
 * - Link to live demos or GitHub repos
 * - Update regularly with new work
 */

const projects = [
  {
    title: 'Natural-Language-to-Chart Analytics Dashboard',
    slug: 'nl-to-chart-dashboard',
    description: 'SaaS app converting natural language into secure, read-only SQL queries against Supabase with React/Recharts visualizations.',
    github: 'https://github.com/vktofly',
    category: 'ai',
    tags: ['Next.js', 'Python', 'Supabase', 'OpenAI API'],
    status: 'completed',
    featured: true,
    date: '2024',
  },
  {
    title: 'Real-Time "Reasoning" UI',
    slug: 'real-time-reasoning-ui',
    description: 'Chat UI using Next.js Server-Sent Events to stream an AI agent’s internal "thoughts" token-by-token akin to ChatGPT’s reasoning mode.',
    github: 'https://github.com/vktofly',
    category: 'ai',
    tags: ['Next.js', 'SSE', 'Claude API', 'Tailwind CSS'],
    status: 'completed',
    featured: true,
    date: '2024',
  },
  {
    title: 'Self-Optimizing Agent Pipeline',
    slug: 'self-optimizing-agent-pipeline',
    description: 'Cyclic, multi-step RAG agent where prompts are programmatically optimized and compiled by DSPy to eliminate manual prompt engineering.',
    github: 'https://github.com/vktofly',
    category: 'ai',
    tags: ['DSPy', 'LangGraph', 'Python'],
    status: 'completed',
    featured: true,
    date: '2024',
  },
  {
    title: 'KV-Cache Compression & Optimization Prototype',
    slug: 'kv-cache-compression',
    description: 'Mathematical simulation in Python demonstrating token-eviction strategies and PagedAttention logic to reduce memory bottlenecks during long-context LLM generation.',
    github: 'https://github.com/vktofly',
    category: 'systems',
    tags: ['Python', 'PagedAttention', 'LLM Inference'],
    status: 'completed',
    featured: false,
    date: '2024',
  },
  {
    title: 'Direct Preference Optimization (DPO) from Scratch',
    slug: 'dpo-from-scratch',
    description: 'Implemented the mathematical DPO loss function in PyTorch, fine-tuning a local Llama-3-8B model to align outputs without traditional RLHF.',
    github: 'https://github.com/vktofly',
    category: 'ai',
    tags: ['PyTorch', 'LLM Alignment', 'DPO', 'Mathematics'],
    status: 'completed',
    featured: false,
    date: '2024',
  },
  {
    title: 'Custom GPU Kernel via OpenAI Triton',
    slug: 'custom-gpu-kernel-triton',
    description: 'Authored a custom Sliding Window Attention mechanism using Triton, benchmarking its memory footprint and throughput against standard PyTorch.',
    github: 'https://github.com/vktofly',
    category: 'systems',
    tags: ['Triton', 'GPU Kernel', 'CUDA', 'Attention'],
    status: 'completed',
    featured: false,
    date: '2024',
  },
  {
    title: 'Embedding Data Drift Monitor',
    slug: 'embedding-data-drift-monitor',
    description: 'MLOps pipeline using Qdrant and Prefect to track the distribution of vector embeddings over time, computing statistical divergence (MMD & Centroid Shift).',
    github: 'https://github.com/vktofly',
    category: 'systems',
    tags: ['Qdrant', 'Prefect', 'Python', 'MLOps'],
    status: 'completed',
    featured: false,
    date: '2024',
  },
  {
    title: 'High-Throughput Local Inference Engine',
    slug: 'high-throughput-local-inference-engine',
    description: 'FastAPI-based OpenAI-compatible inference server running locally, integrating Prometheus middleware to track throughput and latency.',
    github: 'https://github.com/vktofly',
    category: 'systems',
    tags: ['FastAPI', 'Prometheus', 'LLMs'],
    status: 'completed',
    featured: false,
    date: '2024',
  },
  {
    title: 'The Infinite Growth Machine',
    slug: 'infinite-growth-machine',
    description: 'On the compounding logic of knowledge creation and systems that evolve deliberately.',
    category: 'philosophy',
    tags: ['Philosophy', 'Systems', 'Writing'],
    status: 'active',
    featured: true,
    date: '2024-01-15',
  }
];

export default projects;
