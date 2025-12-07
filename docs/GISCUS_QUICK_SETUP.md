# Giscus Quick Setup Guide

Follow these steps to enable comments on your blog posts.

## Step 1: Enable GitHub Discussions

1. Go to your GitHub repository: `https://github.com/vktofly/vktofly.github.io`
2. Click **Settings** (top menu)
3. Scroll down to **Features** section
4. Find **Discussions** and check the box to enable it
5. Click **Save**

## Step 2: Get Giscus Configuration

1. Go to [https://giscus.app](https://giscus.app)
2. Fill in the configuration form:
   - **Repository**: `vktofly/vktofly.github.io` (or select from dropdown)
   - **Discussion Category**: Choose "Announcements" (or create a new category like "Blog Comments")
   - **Page ↔ Discussions Mapping**: Select **"Pathname"**
   - **Discussion Term**: Leave as "Discussion"
   - **Features**: 
     - ✅ Enable reactions
     - ✅ Enable strict title matching (optional)
   - **Theme**: Select **"Preferred color scheme"** (matches your site's dark/light mode)
   - **Language**: Select **"English"**
3. Click **Generate** button
4. You'll see a script tag - **don't use it directly**, but note these values from the `data-*` attributes:
   - `data-repo` → This is your `NEXT_PUBLIC_GISCUS_REPO`
   - `data-repo-id` → This is your `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `data-category` → This is your `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `data-category-id` → This is your `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## Step 3: Set Up Local Development

1. Create a file named `.env.local` in the root of your project (same level as `package.json`)
2. Add these lines (replace with your actual values from Step 2):

```env
NEXT_PUBLIC_GISCUS_REPO=vktofly/vktofly.github.io
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxxxx
```

**Important**: Replace the `R_kgDO...` and `DIC_kwDO...` with your actual IDs from giscus.app

3. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 4: Set Up GitHub Secrets (for Production)

1. Go to your GitHub repository: `https://github.com/vktofly/vktofly.github.io`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these (one at a time):

   **Secret 1:**
   - Name: `NEXT_PUBLIC_GISCUS_REPO`
   - Value: `vktofly/vktofly.github.io`
   - Click **Add secret**

   **Secret 2:**
   - Name: `NEXT_PUBLIC_GISCUS_REPO_ID`
   - Value: `R_kgDOxxxxxxxx` (your actual repo ID from giscus.app)
   - Click **Add secret**

   **Secret 3:**
   - Name: `NEXT_PUBLIC_GISCUS_CATEGORY`
   - Value: `Announcements` (or your chosen category)
   - Click **Add secret**

   **Secret 4:**
   - Name: `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
   - Value: `DIC_kwDOxxxxxxxx` (your actual category ID from giscus.app)
   - Click **Add secret**










   

## Step 5: Test It!

1. **Local Testing:**
   - Make sure `.env.local` is set up correctly
   - Run `npm run dev`
   - Visit any blog post (e.g., `http://localhost:3000/blog/your-post-slug/`)
   - Scroll down to see the Comments section
   - You should see the Giscus widget

2. **Production Testing:**
   - After adding the GitHub secrets, push a commit to trigger the build
   - Once deployed, visit your live blog post
   - The comments should appear!

## Troubleshooting

### Comments not showing locally?
- Check that `.env.local` exists and has all 4 variables
- Make sure you restarted your dev server after creating `.env.local`
- Check the browser console for any errors

### Comments not showing in production?
- Verify all 4 secrets are added in GitHub Settings → Secrets
- Check that the workflow file (`.github/workflows/deploy.yml`) includes the env vars (already updated!)
- Make sure you've pushed the latest code

### "Comments are not configured" message?
- This means one or more environment variables are missing
- Double-check your `.env.local` file (local) or GitHub secrets (production)

## Example Values

Here's what your values might look like (these are examples, use your actual values):

```env
NEXT_PUBLIC_GISCUS_REPO=vktofly/vktofly.github.io
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOAbc123XyZ
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOAbc123XyZ
```

## Need Help?

- Giscus documentation: https://github.com/giscus/giscus
- Giscus configuration: https://giscus.app
- Check the full setup guide: `docs/GISCUS_SETUP.md`

