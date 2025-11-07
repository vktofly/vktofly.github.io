# Data Flow: Where Your Information Appears

This document shows exactly where each piece of data appears on your site.

## 📊 Data Flow Diagram

```
data/
├── profile.js ──────┬─> Homepage (Hero: name, role, headline, photo)
│                    ├─> About Page (Full profile)
│                    ├─> Footer (Copyright name)
│                    ├─> SEO Metadata (All pages)
│                    └─> Structured Data (JSON-LD)
│
├── projects.js ─────┬─> Homepage (Featured: first 2 with featured: true)
│                    └─> Projects Page (All projects)
│
├── experience.js ────└─> Experience Page (Timeline)
│
├── skills.js ───────└─> Skills Page (All categories)
│
└── socials.js ──────┬─> Footer (Social links)
                     ├─> About Page (Contact section)
                     ├─> Contact Page (Optional)
                     └─> Structured Data (sameAs)
```

---

## 🏠 Homepage (`app/page.jsx`)

**Uses:**
- ✅ `profile.name` → Hero title
- ✅ `profile.role` → Hero subtitle
- ✅ `profile.headline` → Hero description
- ✅ `profile.summary` → Structured data
- ✅ `profile.email` → Structured data
- ✅ `projects` (filtered) → Featured Projects section (first 2)
- ✅ `socials.*` → Structured data (sameAs)

**What to update:**
- Profile data for hero section
- Projects with `featured: true` for homepage showcase

---

## 📄 About Page (`app/about/page.jsx`)

**Uses:**
- ✅ `profile.name` → Page title, structured data
- ✅ `profile.role` → Structured data
- ✅ `profile.summary` → Structured data
- ✅ `profile.email` → Structured data
- ✅ Profile photo → Displayed prominently
- ✅ `socials.*` → Structured data (sameAs)
- ✅ Markdown content → `content/aboutme.md`

**What to update:**
- Profile data
- `content/aboutme.md` for long-form content
- Social links

---

## 💼 Projects Page (`app/projects/page.jsx`)

**Uses:**
- ✅ `projects` → All projects displayed as cards

**What to update:**
- Add all your projects to `data/projects.js`
- Include images, links, descriptions
- Use tags for categorization

---

## 🎯 Experience Page (`app/experience/page.jsx`)

**Uses:**
- ✅ `experience` → Timeline of all roles

**What to update:**
- Add all work experience to `data/experience.js`
- Include achievements and impact
- List most recent first

---

## 🛠️ Skills Page (`app/skills/page.jsx`)

**Uses:**
- ✅ `skills` → All skill categories displayed

**What to update:**
- Organize skills by category
- Keep it honest and current
- Update as you learn new technologies

---

## 📧 Contact Page (`app/contact/page.jsx`)

**Uses:**
- ✅ `profile.email` → Contact form and direct email link

**What to update:**
- Profile email
- Optional: Add social links to contact page

---

## 🔗 Footer (`components/Footer.jsx`)

**Uses:**
- ✅ `profile.name` → Copyright text
- ✅ `socials.github` → GitHub link
- ✅ `socials.twitter` → X/Twitter link
- ✅ `socials.linkedin` → LinkedIn link

**What to update:**
- Social links in `data/socials.js`
- Footer automatically updates

---

## 🔍 SEO & Metadata (All Pages)

**Uses:**
- ✅ `profile.name` → Page titles
- ✅ `profile.role` → Meta descriptions
- ✅ `profile.summary` → SEO descriptions
- ✅ `profile.email` → Structured data
- ✅ `socials.*` → Structured data (sameAs)

**What to update:**
- Keep profile data accurate
- Update summary for SEO

---

## 📱 Structured Data (JSON-LD)

**Uses:**
- ✅ `profile.*` → Person schema
- ✅ `socials.*` → sameAs property
- ✅ `projects` → Project schema (if implemented)
- ✅ `experience` → Organization schema (if implemented)

**What to update:**
- All profile and social data
- Structured data updates automatically

---

## 🎨 Visual Elements

### Profile Photo
- **Location:** `public/proflephoto/profile photo.jpg`
- **Used in:** Homepage, About page
- **Update:** Replace the image file

### Project Images
- **Location:** `public/images/projects/`
- **Used in:** Project cards (if implemented)
- **Update:** Add images and reference in project data

### OG Images
- **Location:** `public/og/`
- **Used in:** Social media sharing
- **Update:** Create custom OG images per page

---

## 🔄 Update Frequency

### Daily/Weekly
- Current focus/status
- New projects
- Blog posts

### Monthly
- Skills updates
- Experience additions
- Project metrics

### Quarterly
- Full content review
- SEO optimization
- Design refresh

---

## 💡 Pro Tips

1. **Single Source of Truth**: All data comes from `data/` files
2. **Consistency**: Update related data together
3. **Version Control**: Commit data changes regularly
4. **Backup**: Keep a copy of your data files
5. **Documentation**: Comment your data for future reference

---

## 🚀 Quick Reference

| Data File | Primary Use | Update When |
|-----------|------------|-------------|
| `profile.js` | Hero, About, SEO | Name/role changes |
| `projects.js` | Projects page | New projects |
| `experience.js` | Experience page | New roles |
| `skills.js` | Skills page | Learn new skills |
| `socials.js` | Footer, links | Social changes |

---

Remember: Your portfolio is a living document. Keep data fresh and accurate!

