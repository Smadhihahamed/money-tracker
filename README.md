# Money Tracker

A free, mobile-friendly spending and income tracker for Singapore dollars (SGD), published with GitHub Pages.

## Features

- Dashboard summaries for day, week, month and year
- Record spending and income with date, category, payment method and notes
- Include or exclude an income entry from net gain/loss without deleting it
- Search, edit and delete transactions
- Import and export CSV backups
- Import compatible bank-statement CSVs with a preview, date interpretation and duplicate skipping (manual import only)
- Supabase email authentication and per-user cloud transaction storage (requires the setup below)
- Local-only mode when signed out

## Supabase setup

Before sign-in and cloud syncing will work:

1. Open `index.html` in this repository and edit the file.
2. Find `PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE` and replace only that placeholder with the project's **publishable** key from Supabase Project Settings → API Keys. Never use a `service_role`, secret, or database password in frontend code.
3. Commit the change to `main`, then wait for the GitHub Pages workflow to deploy.
4. In Supabase Authentication → URL Configuration, set the Site URL to `https://smadhihahamed.github.io/money-tracker/` and add `https://smadhihahamed.github.io/money-tracker/**` to the allowed Redirect URLs.
5. Confirm email sign-in is enabled in Authentication providers.
6. The database must have a `public.transactions` table with `id` (uuid), `user_id` (uuid), `transaction_date` (date), `type` (text), `amount` (numeric), `category` (text), `payment_method` (text), `description` (text), `include_in_balance` (boolean), and `created_at` (timestamptz), with RLS enabled and authenticated-user policies for select, insert, update and delete that check `auth.uid() = user_id`.

When signing in to an account with no saved cloud transactions, the app asks whether to import the records already stored in the current browser. If saved copies differ, the app asks before merging and preserves cloud-only rows. Declining keeps the browser and account-cache copies separate. Once signed in, changes are synced to that user's cloud table and protected by RLS.

## Privacy and limits

- This app does **not** connect directly to UOB or any other bank. You record transactions manually or import a CSV you choose.
- Bank-statement CSVs are parsed in the browser. Common date, description, amount, debit and credit headers are supported. Dates written with slashes are interpreted as DD/MM/YYYY. Review the preview carefully before confirming; amount signs and headers vary by bank. This is not live bank sync.
- Do not enter bank passwords, PINs, OTPs or Singpass details into this app.
- The project repository is public. Never commit CSV backups, transaction records, passwords, or secret/service-role keys.
- The Supabase publishable key is intended for frontend use, but data security depends on correct RLS policies. Do not disable RLS.

## Publish with GitHub Pages

1. Open repository **Settings** → **Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Open **Actions** and confirm the **Deploy Money Tracker to GitHub Pages** workflow finishes successfully.
4. The site is available at https://smadhihahamed.github.io/money-tracker/.

Changes pushed to `main` re-trigger the deployment workflow.

The signed-in/local status badge remains visible on narrow mobile screens so the user can confirm whether cloud mode is active.
