# Quick Start: Adding Your Personal Data

This is a quick reference guide for populating your portfolio with personal data.

## 🚀 5-Minute Setup

### Step 1: Update Profile (`data/profile.js`)
```javascript
const profile = {
  name: 'Your Name',
  role: 'Your Title',
  headline: 'Your Value Proposition',
  location: 'Your Location',
  email: 'your.email@example.com',
  summary: 'Your professional summary',
};
```

### Step 2: Add Projects (`data/projects.js`)
```javascript
const projects = [
  {
    title: 'Project Name',
    slug: 'project-slug',
    description: 'What it does',
    href: 'https://project-url.com',
    tags: ['Technology', 'Category'],
    featured: true, // Shows on homepage
  },
  // Add 2-3 more projects
];
```

### Step 3: Add Experience (`data/experience.js`)
```javascript
const experience = [
  {
    company: 'Company Name',
    role: 'Your Role',
    period: '2020 — Present',
    summary: 'What you accomplished',
  },
  // Add more roles
];
```

### Step 4: Add Skills (`data/skills.js`)
```javascript
const skills = [
  {
    name: 'Category',
    items: ['Skill 1', 'Skill 2', 'Skill 3'],
  },
  // Add more categories
];
```

### Step 5: Update Socials (`data/socials.js`)
```javascript
const socials = {
  email: 'your.email@example.com',
  github: 'https://github.com/username',
  twitter: 'https://x.com/username',
  linkedin: 'https://linkedin.com/in/username',
};
```

## ✅ Done!

Your portfolio is now personalized. See `docs/DATA_STRUCTURE_GUIDE.md` for detailed information.

