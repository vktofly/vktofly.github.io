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
    title: 'The Infinite Growth Machine',
    slug: 'infinite-growth-machine',
    description:
      'On the compounding logic of knowledge creation and systems that evolve deliberately.',
    longDescription: 'A comprehensive exploration of how knowledge compounds and systems evolve...', // Optional
    href: '#', // External link to project
    github: 'https://github.com/vktofly/project', // Optional
    image: '/images/projects/infinite-growth.jpg', // Optional - add to public/images/projects/ or use Unsplash
    category: 'systems', // 'ai' | 'quantum' | 'robotics' | 'space' | 'philosophy' | 'systems'
    tags: ['Philosophy', 'Systems', 'Writing'],
    status: 'active', // 'active' | 'completed' | 'archived'
    featured: true, // Show on homepage
    date: '2024-01-15', // Launch/completion date
    technologies: ['React', 'Next.js', 'TypeScript'], // Optional
    metrics: { // Optional - impressive numbers
      users: '10K+',
      revenue: '$500K',
      impact: '50+ companies',
      companies: '23+',
    },
  },
  // Add more projects here...
  // {
  //   title: 'Project Name',
  //   slug: 'project-slug',
  //   description: 'Brief description (1-2 sentences)',
  //   href: 'https://project-url.com',
  //   tags: ['Technology', 'Category'],
  //   featured: true,
  // },
];

export default projects;


