# Formspree Setup Guide

This guide explains how to configure Formspree for the contact form on your portfolio site.

## Step 1: Create a Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account (free tier allows 50 submissions per month)
3. Verify your email address

## Step 2: Create a New Form

1. After logging in, click **"New Form"** or go to your dashboard
2. Give your form a name (e.g., "Portfolio Contact Form")
3. Formspree will generate a unique form ID (looks like: `xvgkqyzw` or `abc123def456`)

## Step 3: Configure Form Fields

The contact form sends the following fields:
- `name` (required)
- `email` (required)
- `company` (optional)
- `message` (required)

Formspree will automatically accept these fields. You can configure:
- **Email notifications**: Set which email address receives form submissions
- **Spam protection**: Enable reCAPTCHA or other spam filters
- **Custom redirect**: Where to redirect after successful submission (optional)

## Step 4: Get Your Form ID

1. In your Formspree dashboard, click on your form
2. You'll see the form endpoint URL: `https://formspree.io/f/YOUR_FORM_ID`
3. Copy the `YOUR_FORM_ID` part (the string after `/f/`)

Example:
- Full URL: `https://formspree.io/f/xvgkqyzw`
- Form ID: `xvgkqyzw`

## Step 5: Set Environment Variable

### For Local Development

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following line:

```env
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

Replace `your_form_id_here` with your actual Formspree form ID.

Example:
```env
NEXT_PUBLIC_FORMSPREE_ID=xvgkqyzw
```

### For Production (GitHub Pages / Vercel / Netlify)

#### GitHub Pages (via GitHub Actions)
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NEXT_PUBLIC_FORMSPREE_ID`
5. Value: Your Formspree form ID
6. Click **Add secret**

Then update your GitHub Actions workflow to use this secret:
```yaml
env:
  NEXT_PUBLIC_FORMSPREE_ID: ${{ secrets.NEXT_PUBLIC_FORMSPREE_ID }}
```

#### Vercel
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `NEXT_PUBLIC_FORMSPREE_ID`
   - **Value**: Your Formspree form ID
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**
5. Redeploy your site

#### Netlify
1. Go to your Netlify site dashboard
2. Click **Site configuration** → **Environment variables**
3. Click **Add variable**
4. **Key**: `NEXT_PUBLIC_FORMSPREE_ID`
5. **Value**: Your Formspree form ID
6. Click **Save**
7. Redeploy your site

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check your Formspree dashboard to see if the submission was received
5. Check your email (if email notifications are enabled)

## Troubleshooting

### Form Still Shows 405 Error
- Make sure `NEXT_PUBLIC_FORMSPREE_ID` is set correctly
- Restart your development server after adding the environment variable
- Check that the form ID doesn't have any extra spaces or characters

### Submissions Not Received
- Check your Formspree dashboard for any error messages
- Verify the form ID is correct
- Check spam folder if email notifications are enabled
- Ensure your Formspree account hasn't exceeded the free tier limit (50/month)

### CORS Errors
- Formspree handles CORS automatically, but if you see errors, make sure you're using the correct endpoint format: `https://formspree.io/f/YOUR_FORM_ID`

## Formspree Free Tier Limits

- **50 submissions per month**
- **Email notifications**
- **Spam protection**
- **Custom redirects**

For more submissions or advanced features, consider upgrading to a paid plan.

## Security Notes

- Never commit `.env.local` to version control (it should be in `.gitignore`)
- The form ID is safe to expose in client-side code (it's in `NEXT_PUBLIC_*`)
- Formspree handles spam protection and rate limiting automatically


