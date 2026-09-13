import fs from 'fs/promises';
import path from 'path';

// Data sources
import profile from '../data/profile.js';
import experience from '../data/experience.js';
import skills from '../data/skills.js';
import projects from '../data/projects.js';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const API_DIR = path.join(PUBLIC_DIR, 'api');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');

async function main() {
  await fs.mkdir(API_DIR, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });

  // 1. Static API Generation
  console.log('Generating Static API (Data as Code)...');
  await fs.writeFile(path.join(API_DIR, 'profile.json'), JSON.stringify(profile, null, 2));
  await fs.writeFile(path.join(API_DIR, 'experience.json'), JSON.stringify(experience, null, 2));
  await fs.writeFile(path.join(API_DIR, 'skills.json'), JSON.stringify(skills, null, 2));
  await fs.writeFile(path.join(API_DIR, 'projects.json'), JSON.stringify(projects, null, 2));
  console.log('Static API endpoints created.');

  // 2. vCard Generation
  console.log('Generating vCard...');
  const vcfContent = `BEGIN:VCARD
VERSION:3.0
N:Kumar;Vikash;;;
FN:${profile.name}
TITLE:${profile.role}
EMAIL;TYPE=INTERNET:${profile.email}
URL:https://vktofly.github.io
END:VCARD`;
  await fs.writeFile(path.join(PUBLIC_DIR, 'vikash.vcf'), vcfContent);
  console.log('vCard created.');

  // 3. Real-Time GitHub Data Fetch
  console.log('Fetching GitHub Data...');
  try {
    const username = 'vktofly';
    // Using global fetch available in Node 18+
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'vktofly-portfolio-build-script'
      }
    });
    
    if (response.ok) {
      const user = await response.json();
      const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`, {
        headers: {
          'User-Agent': 'vktofly-portfolio-build-script'
        }
      });
      let latestEvent = null;
      if (eventsRes.ok) {
        const events = await eventsRes.json();
        if (events && events.length > 0) {
          latestEvent = events[0];
        }
      }
      
      const githubStats = {
        username: user.login,
        followers: user.followers,
        public_repos: user.public_repos,
        avatar_url: user.avatar_url,
        latest_event: latestEvent ? {
          type: latestEvent.type,
          repo: latestEvent.repo.name,
          date: latestEvent.created_at
        } : null,
        last_fetched: new Date().toISOString()
      };
      
      await fs.writeFile(path.join(DATA_DIR, 'github-stats.json'), JSON.stringify(githubStats, null, 2));
      console.log('GitHub data fetched and saved.');
    } else {
      console.error('GitHub API error:', response.status);
    }
  } catch (err) {
    console.error('Failed to fetch GitHub data', err);
  }
}

main().catch(console.error);
