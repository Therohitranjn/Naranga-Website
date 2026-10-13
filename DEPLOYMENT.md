# 🚀 Netlify Deployment Guide — Mera Naranga (मेरा नारंगा)

This guide walks you through deploying the **Mera Naranga** Next.js application to **Netlify** using Netlify's official Next.js Runtime integration.

---

## 📋 Overview & Readiness

- **Framework**: Next.js 14 (App Router)
- **Deployment Platform**: Netlify (Serverless Next.js Runtime v5)
- **External Database Required**: **No**. The site deploys and functions as-is without requiring any external database or paid services.
- **API Routes**: `/api/auth/login` and `/api/submissions` run automatically as Netlify Serverless Functions.

---

## 🛠 Step 1: Push Code to GitHub

1. If you haven't initialized Git yet:
   ```bash
   git init
   git add .
   git commit -m "feat: prepare Mera Naranga for Netlify deployment"
   ```

2. Create a new repository on [GitHub](https://github.com/new) (e.g., `mera-naranga`).

3. Link and push your code:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/mera-naranga.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Step 2: Deploy to Netlify

1. Log in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** → **"Import an existing project"**.
3. Select **GitHub** and authorize access to your `mera-naranga` repository.
4. Netlify will automatically detect the Next.js framework:
   - **Branch to deploy**: `main`
   - **Base directory**: *(leave empty)*
   - **Build command**: `npm run build`
   - **Publish directory**: *(managed automatically by `@netlify/plugin-nextjs` via `netlify.toml`)*
5. Click **"Deploy site"**.

---

## ⚙️ Step 3: Environment Variables (Optional)

In your Netlify Dashboard, navigate to:
**Site configuration** → **Environment variables** → **Add a variable**

| Variable Name | Description | Default if omitted |
| :--- | :--- | :--- |
| `ADMIN_USER` | Admin Portal Username | `WelcomeNaranga` |
| `ADMIN_PASSWORD` | Admin Portal Password | `Welcome@2026` |
| `NODE_ENV` | Production environment flag | `production` |

> 🔒 **Security Notice:**
> Sensitive passwords and tokens should always be managed through Netlify Environment Variables rather than committed to public repositories.

---

## 💾 Step 4: Storage Behavior Disclosure

1. **Current Submissions Storage**:
   - The `/api/submissions` endpoint currently operates using in-memory serverless storage with a client-side localStorage backup.
   - **Important Note:** In serverless environments like Netlify, in-memory arrays reset when function instances spin down (cold starts) or when a new deployment is triggered.
   - Submissions submitted by visitors are received and logged, but are not permanently retained across serverless restarts.

2. **Future Permanent Database (Optional)**:
   - A complete PostgreSQL schema is already configured in `prisma/schema.prisma`.
   - When you decide to enable permanent database persistence, you can connect a free PostgreSQL provider (such as [Neon](https://neon.tech) or [Supabase](https://supabase.com)) by simply adding `DATABASE_URL` to your Netlify Environment Variables.
   - **No architectural rewrite will be needed.**

---

## 🔍 Verification After Deployment

Once the build finishes:
1. Open the Netlify provided URL (e.g., `https://your-site-name.netlify.app`).
2. Verify that the homepage, navbar, footer, language switcher, and all pages load correctly.
3. Visit `/admin/login` and test authentication with your configured credentials.
4. Submit a test community entry on `/places-to-visit` or `/contact` and ensure the success alert appears without errors.
