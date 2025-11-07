# Portfolio Data Structure Guide

This guide explains where personal data goes throughout your portfolio site and how to structure it for maximum impact.

## 📁 Data Files Overview

All personal data is stored in the `data/` directory:

```
data/
├── profile.js      # Core personal information
├── projects.js     # Your projects/work
├── experience.js   # Career history
├── skills.js       # Technical skills & expertise
└── socials.js      # Social media links
```

---

## 1. Profile Data (`data/profile.js`)

**Where it's used:**
- Homepage hero section
- About page
- SEO metadata
- Structured data (JSON-LD)
- Footer (optional)

**Structure:**
```javascript
{
  name: 'Your Full Name',
  role: 'Your Professional Title',
  headline: 'One-line value proposition',
  location: 'City, Country or "Remote"',
  email: 'your.email@example.com',
  summary: '2-3 sentence professional summary',
  
  // Optional but recommended:
  website: 'https://yourwebsite.com',
  bio: 'Longer bio (2-3 paragraphs)',
  currentFocus: 'What you're working on now',
  availableFor: ['Consulting', 'Speaking', 'Collaboration'],
  timezone: 'UTC+5:30',
  languages: ['English', 'Hindi'],
}
```

**Best Practices:**
- ✅ Keep headline under 60 characters
- ✅ Summary should be 1-2 sentences, SEO-friendly
- ✅ Use professional email (not personal if possible)
- ✅ Location helps with local SEO

---

## 2. Projects Data (`data/projects.js`)

**Where it's used:**
- Homepage "Featured Projects" section
- Projects page (all projects)
- Individual project pages (if you create them)
- SEO structured data

**Structure:**
```javascript
{
  title: 'Project Name',
  slug: 'project-url-slug',
  description: 'Brief description (1-2 sentences)',
  longDescription: 'Detailed description (optional)',
  href: 'https://project-url.com', // External link
  github: 'https://github.com/username/repo', // Optional
  image: '/images/project-image.jpg', // Optional
  tags: ['Technology', 'Category'],
  status: 'active' | 'completed' | 'archived',
  featured: true, // Show on homepage
  date: '2024-01-15', // Launch/completion date
  technologies: ['React', 'Next.js', 'TypeScript'],
  metrics: { // Optional - impressive numbers
    users: '10K+',
    revenue: '$500K',
    impact: '50+ companies',
  },
}
```

**Best Practices:**
- ✅ Start with your 2-3 best projects
- ✅ Include metrics/impact when possible
- ✅ Use descriptive tags for filtering
- ✅ Add images for visual appeal
- ✅ Link to live demos or GitHub repos
- ✅ Update regularly with new work

---

## 3. Experience Data (`data/experience.js`)

**Where it's used:**
- Experience page timeline
- About page (optional)
- SEO structured data

**Structure:**
```javascript
{
  company: 'Company Name',
  role: 'Your Role Title',
  period: '2020 — Present' | '2020 — 2023',
  location: 'City, Country' | 'Remote',
  summary: 'What you accomplished (2-3 sentences)',
  
  // Optional but powerful:
  achievements: [
    'Led team of 10 engineers',
    'Increased revenue by 200%',
    'Launched 5 products',
  ],
  technologies: ['React', 'Python', 'AWS'],
  companyUrl: 'https://company.com',
  companyLogo: '/logos/company.png',
  type: 'full-time' | 'part-time' | 'contract' | 'founder',
}
```

**Best Practices:**
- ✅ Use action verbs (Led, Built, Designed, Launched)
- ✅ Include quantifiable achievements
- ✅ List most recent first
- ✅ Be specific about impact
- ✅ Include technologies used
- ✅ Add company logos for credibility

---

## 4. Skills Data (`data/skills.js`)

**Where it's used:**
- Skills page
- About page (optional)
- Resume/PDF generation (if implemented)

**Structure:**
```javascript
{
  name: 'Category Name',
  items: ['Skill 1', 'Skill 2', 'Skill 3'],
  level: 'expert' | 'advanced' | 'intermediate', // Optional
  years: 5, // Optional
}
```

**Best Practices:**
- ✅ Group related skills together
- ✅ Be honest about proficiency
- ✅ Include both technical and soft skills
- ✅ Update as you learn new technologies
- ✅ Consider adding proficiency levels
- ✅ Include domain expertise, not just tools

---

## 5. Socials Data (`data/socials.js`)

**Where it's used:**
- Footer links
- About page
- Contact page
- SEO structured data (sameAs)
- Header (optional)

**Structure:**
```javascript
{
  email: 'your.email@example.com',
  github: 'https://github.com/username',
  twitter: 'https://x.com/username',
  linkedin: 'https://linkedin.com/in/username',
  
  // Optional platforms:
  website: 'https://yourwebsite.com',
  blog: 'https://yourblog.com',
  medium: 'https://medium.com/@username',
  youtube: 'https://youtube.com/@username',
  instagram: 'https://instagram.com/username',
  mastodon: 'https://mastodon.social/@username',
  discord: 'https://discord.gg/invite',
  calendly: 'https://calendly.com/username', // For booking
}
```

**Best Practices:**
- ✅ Use full URLs (https://)
- ✅ Keep profiles professional
- ✅ Update links regularly
- ✅ Add Calendly if you do consultations
- ✅ Include your personal website/blog

---

## 📍 Where Data Appears on Site

### Homepage (`app/page.jsx`)
- **Profile**: Name, role, headline, photo
- **Projects**: Featured projects (first 2)
- **Socials**: Used in structured data

### About Page (`app/about/page.jsx`)
- **Profile**: Full profile data
- **Profile Photo**: Displayed prominently
- **Socials**: Can be added to contact section

### Projects Page (`app/projects/page.jsx`)
- **Projects**: All projects displayed as cards

### Experience Page (`app/experience/page.jsx`)
- **Experience**: Timeline of all roles

### Skills Page (`app/skills/page.jsx`)
- **Skills**: All skill categories

### Contact Page (`app/contact/page.jsx`)
- **Profile**: Email from profile
- **Socials**: Can be added as contact methods

### Footer (`components/Footer.jsx`)
- **Socials**: Social media links
- **Profile**: Copyright with name

---

## 🎯 Best Practices for Portfolio Sites

### 1. **Tell a Story**
- Start with your "why" not just "what"
- Show progression in your career
- Connect projects to your mission

### 2. **Show Impact, Not Just Features**
- Use metrics: "Increased X by Y%"
- Show before/after when possible
- Quantify your achievements

### 3. **Keep It Updated**
- Add new projects regularly
- Update current focus
- Refresh metrics and achievements

### 4. **Make It Personal**
- Include your philosophy/vision
- Show personality in writing
- Add personal interests (optional)

### 5. **Optimize for Your Goals**
- **Job seeking**: Emphasize relevant experience
- **Consulting**: Show case studies and results
- **Founder**: Highlight companies and impact
- **Researcher**: Show publications and research

### 6. **SEO Optimization**
- Use keywords naturally in descriptions
- Include location for local SEO
- Add structured data (already done)
- Write unique descriptions for each project

### 7. **Visual Appeal**
- Add project screenshots/images
- Use consistent color scheme
- Include company logos
- Professional profile photo

### 8. **Call to Action**
- Clear contact methods
- "Available for" section
- Booking links (Calendly)
- Social proof (testimonials if possible)

---

## 📝 Quick Checklist

- [ ] Profile data complete and accurate
- [ ] At least 3-5 projects with descriptions
- [ ] Experience timeline with achievements
- [ ] Skills organized by category
- [ ] All social links working
- [ ] Professional profile photo
- [ ] Project images/screenshots
- [ ] Metrics and impact numbers
- [ ] Contact information clear
- [ ] "Now" section updated
- [ ] Recent projects featured
- [ ] SEO descriptions unique

---

## 🚀 Next Steps

1. **Populate your data files** with real information
2. **Add project images** to `public/images/projects/`
3. **Create detailed project pages** (optional but recommended)
4. **Add testimonials** (if you have them)
5. **Update regularly** - portfolios are living documents

---

## 💡 Pro Tips

1. **Use Markdown** for longer descriptions (already supported)
2. **Add blog posts** about your projects (deep dives)
3. **Include case studies** with metrics
4. **Show your process** - how you work
5. **Add a "Now" page** - what you're currently working on
6. **Include side projects** - shows passion
7. **Add speaking engagements** - builds authority
8. **Show open source contributions** - demonstrates collaboration

---

## 📚 Examples

See the enhanced data files in `data/` directory for examples of well-structured data following these best practices.

