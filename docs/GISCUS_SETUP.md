# Giscus Comments Setup Guide

This guide explains how to configure Giscus (GitHub Discussions) for blog post comments on your portfolio site.

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions. It's:
- **Free** - No cost, no limits
- **Privacy-friendly** - No tracking, no ads
- **Open source** - Comments stored in your GitHub repository
- **Theme-aware** - Automatically matches your site's light/dark mode
- **Moderated** - Uses GitHub's built-in moderation tools

## Step 1: Enable GitHub Discussions

1. Go to your GitHub repository (e.g., `vktofly/vktofly.github.io`)
2. Click **Settings** → **General** → **Features**
3. Under "Discussions", check **"Discussions"** to enable it
4. Click **Save**

## Step 2: Install Giscus App

1. Go to [https://giscus.app](https://giscus.app)
2. Scroll down to the configuration section
3. Fill in the following:
   - **Repository**: Select your repository (e.g., `vktofly/vktofly.github.io`)
   - **Discussion Category**: Choose "Announcements" or create a new category like "Blog Comments"
   - **Page ↔ Discussions Mapping**: Select "Pathname"
   - **Discussion Term**: Leave as "Discussion"
   - **Features**: Enable "Reactions" if desired
   - **Theme**: Select "Preferred color scheme" (matches your site's theme)
   - **Language**: Select "English" (or your preferred language)

4. Click **Generate** to get your configuration

## Step 3: Get Your Configuration Values

After generating, you'll see a script tag with your configuration. You need these values:

- `data-repo`: Your repository (e.g., `vktofly/vktofly.github.io`)
- `data-repo-id`: A numeric ID (e.g., `R_kgDO...`)
- `data-category`: The category name (e.g., `Announcements`)
- `data-category-id`: A numeric ID (e.g., `DIC_kwDO...`)

## Step 4: Set Environment Variables

### For Local Development

1. Create or edit `.env.local` in the root of your project
2. Add the following variables:

```env
NEXT_PUBLIC_GISCUS_REPO=vktofly/vktofly.github.io
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id_here
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id_here
```

Replace the placeholder values with your actual values from Step 3.

### For Production (GitHub Pages / Vercel / Netlify)

#### GitHub Pages (via GitHub Actions)
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `NEXT_PUBLIC_GISCUS_REPO`
   - `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

Then update your GitHub Actions workflow to use these secrets:
```yaml
env:
  NEXT_PUBLIC_GISCUS_REPO: ${{ secrets.NEXT_PUBLIC_GISCUS_REPO }}
  NEXT_PUBLIC_GISCUS_REPO_ID: ${{ secrets.NEXT_PUBLIC_GISCUS_REPO_ID }}
  NEXT_PUBLIC_GISCUS_CATEGORY: ${{ secrets.NEXT_PUBLIC_GISCUS_CATEGORY }}
  NEXT_PUBLIC_GISCUS_CATEGORY_ID: ${{ secrets.NEXT_PUBLIC_GISCUS_CATEGORY_ID }}
```

#### Vercel
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: `NEXT_PUBLIC_GISCUS_REPO`
   - **Value**: Your repository (e.g., `vktofly/vktofly.github.io`)
   - **Environment**: Production, Preview, Development (select all)
4. Repeat for all four variables
5. Click **Save**
6. Redeploy your site

#### Netlify
1. Go to your Netlify site dashboard
2. Click **Site configuration** → **Environment variables**
3. Add each variable:
   - **Key**: `NEXT_PUBLIC_GISCUS_REPO`
   - **Value**: Your repository
4. Repeat for all four variables
5. Click **Save**
6. Redeploy your site

## Step 5: Test Comments

1. Start your development server: `npm run dev`
2. Navigate to any blog post (e.g., `/blog/your-post-slug/`)
3. Scroll down to the "Comments" section
4. You should see the Giscus comments widget
5. Try leaving a comment (you'll need to authorize with GitHub)

## How It Works

- Each blog post gets its own discussion thread based on the post's pathname
- Comments are stored as GitHub Discussions in your repository
- Users need a GitHub account to comment
- You can moderate comments through GitHub's interface
- Comments automatically sync with your site

## Customization

The comments component (`components/BlogComments.jsx`) can be customized:

- **Theme**: Change `data-theme` to match your site's theme
- **Position**: Change `data-input-position` to "top" or "bottom"
- **Reactions**: Enable/disable with `data-reactions-enabled`
- **Language**: Change `data-lang` to your preferred language

## Troubleshooting

### Comments Not Showing
- Verify all environment variables are set correctly
- Check that GitHub Discussions is enabled in your repository
- Ensure the Giscus app has access to your repository
- Check browser console for any errors

### Comments Not Matching Theme
- Giscus uses `preferred_color_scheme` which respects your site's dark mode
- If issues persist, you can set a specific theme: `light` or `dark`

### Comments Not Creating Discussions
- Verify the repository and category IDs are correct
- Check that the Giscus app is installed and has proper permissions
- Ensure the category exists in your repository's Discussions

## Security Notes

- The repository and IDs are safe to expose in client-side code (they're in `NEXT_PUBLIC_*`)
- Never commit `.env.local` to version control (it should be in `.gitignore`)
- Giscus handles authentication through GitHub OAuth
- All comments are stored in your GitHub repository

## Alternative: Using Formspree for Comments

If you prefer a simpler solution without GitHub authentication, you can modify the `BlogComments` component to use Formspree (similar to your contact form). However, this would require a backend to store and display comments.

