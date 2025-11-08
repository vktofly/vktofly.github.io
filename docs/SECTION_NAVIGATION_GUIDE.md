# Section Navigation Guide

This guide explains which pages can benefit from section navigation (sticky sidebar) like the Skills page.

## How Section Navigation Works

The Skills page uses:
- **Sticky sidebar** with section links
- **Scroll-based highlighting** - active section is highlighted as you scroll
- **Smooth scrolling** to sections when clicked
- **Two-column layout** - sidebar (240px) + content

## Pages That Can Use Section Navigation

### ✅ **About Page** (Recommended)
**Current structure:**
- Philosophy
- Mission
- Work
- Companies
- Research
- Principles
- Influences
- Current Inquiry (2025-2030)
- Beyond Entrepreneurship
- Selected Works & Writing
- Connect

**Benefits:**
- Long page with many sections
- Users often want to jump to specific topics
- Better navigation for deep reading

**Implementation:**
```jsx
import SectionNavigation from "../../components/SectionNavigation";

const sections = [
  { id: "philosophy", label: "Philosophy" },
  { id: "mission", label: "Mission" },
  { id: "work", label: "Work" },
  // ... etc
];

// In layout:
<div className="grid gap-8 md:grid-cols-[240px_1fr]">
  <div className="hidden md:block md:sticky md:top-24 self-start">
    <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
      <SectionNavigation sections={sections} title="About" />
    </div>
  </div>
  <div className="min-w-0">
    {/* Content with id props on Sections */}
  </div>
</div>
```

### ✅ **Books Page** (Recommended)
**Current structure:**
- Currently Reading
- Foundational Books
- Re-reading
- All Books (with categories)

**Benefits:**
- Multiple sections/categories
- Users browse by category
- Quick navigation between sections

**Implementation:**
```jsx
const sections = [
  { id: "currently-reading", label: "Currently Reading" },
  { id: "foundational", label: "Foundational" },
  { id: "re-reading", label: "Re-reading" },
  { id: "all-books", label: "All Books" },
];
```

### ✅ **Resources Page** (Recommended)
**Current structure:**
- Books section
- Podcasts section
- Videos section
- People section

**Benefits:**
- Multiple resource types
- Users want to jump between types
- Better organization

**Implementation:**
```jsx
const sections = [
  { id: "books", label: "Books" },
  { id: "podcasts", label: "Podcasts" },
  { id: "videos", label: "Videos" },
  { id: "people", label: "People" },
];
```

### ⚠️ **Blog Page** (Optional)
**Current structure:**
- All posts
- Filtered by tags

**Benefits:**
- Could add category sections (if you have categories)
- Less necessary since posts are shorter

**Consideration:**
- Only useful if you have many blog posts with clear categories
- Tag filtering might be sufficient

### ⚠️ **Experience Page** (Optional)
**Current structure:**
- Timeline
- Pattern of the Journey
- Reflection

**Benefits:**
- Only 3 sections, might be overkill
- Timeline is already chronological

**Consideration:**
- Could be useful if timeline gets very long
- Current structure works well

### ❌ **Projects Page** (Not Recommended)
**Current structure:**
- Filtered project grid
- Case Studies section

**Benefits:**
- Only 2 sections
- Filtering is more important than navigation

**Consideration:**
- Current filter-based approach is better
- Section nav would add clutter

### ❌ **People Page** (Not Recommended)
**Current structure:**
- Filtered people grid

**Benefits:**
- Single main section
- Filtering is more important

**Consideration:**
- Current approach is sufficient

## Implementation Steps

### 1. Add Section IDs
Ensure each `Section` component has an `id` prop:
```jsx
<Section id="philosophy" title="Philosophy" ...>
```

### 2. Import SectionNavigation
```jsx
import SectionNavigation from "../../components/SectionNavigation";
```

### 3. Define Sections Array
```jsx
const sections = [
  { id: "section-1", label: "Section 1" },
  { id: "section-2", label: "Section 2" },
];
```

### 4. Update Layout
Wrap content in two-column grid:
```jsx
<div className="grid gap-8 md:grid-cols-[240px_1fr] print:grid-cols-1">
  {/* Sticky Sidebar */}
  <div className="hidden md:block md:sticky md:top-24 self-start print:hidden">
    <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
      <SectionNavigation sections={sections} title="Navigation" />
    </div>
  </div>
  
  {/* Main Content */}
  <div className="min-w-0">
    {/* Your sections here */}
  </div>
</div>
```

## Best Practices

1. **Only use for long pages** with 4+ distinct sections
2. **Keep section labels short** (2-3 words max)
3. **Use consistent IDs** - match section IDs exactly
4. **Test on mobile** - sidebar is hidden on mobile (as intended)
5. **Print-friendly** - add `print:hidden` to sidebar

## Example: About Page Implementation

```jsx
"use client";

import Section from "../../components/Section";
import Container from "../../components/Container";
import SectionNavigation from "../../components/SectionNavigation";

const sections = [
  { id: "philosophy", label: "Philosophy" },
  { id: "mission", label: "Mission" },
  { id: "work", label: "Work" },
  { id: "companies", label: "Companies" },
  { id: "research", label: "Research" },
  { id: "principles", label: "Principles" },
  { id: "influences", label: "Influences" },
  { id: "current-inquiry-2025-2030", label: "Current Inquiry" },
  { id: "beyond-entrepreneurship", label: "Beyond Entrepreneurship" },
  { id: "selected-works-writing", label: "Selected Works" },
  { id: "connect", label: "Connect" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Full Width */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero content */}
      </Section>

      {/* Main Content with Navigation */}
      <div className="grid gap-8 md:grid-cols-[240px_1fr] print:grid-cols-1">
        {/* Sticky Navigation Sidebar */}
        <div className="hidden md:block md:sticky md:top-24 self-start print:hidden">
          <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
            <SectionNavigation sections={sections} title="About" />
          </div>
        </div>

        {/* About Content */}
        <div className="min-w-0">
          <Section id="philosophy" title="Philosophy" ...>
            {/* Content */}
          </Section>
          <Section id="mission" title="Mission" ...>
            {/* Content */}
          </Section>
          {/* ... other sections */}
        </div>
      </div>
    </>
  );
}
```

## Summary

**Recommended for Section Navigation:**
- ✅ About Page (11 sections - high priority)
- ✅ Books Page (multiple categories - high priority)
- ✅ Resources Page (4 resource types - medium priority)

**Optional:**
- ⚠️ Blog Page (if you add categories)
- ⚠️ Experience Page (if timeline gets very long)

**Not Recommended:**
- ❌ Projects Page (filtering is better)
- ❌ People Page (filtering is better)
- ❌ Skills Page (already has it)

