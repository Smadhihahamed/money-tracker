# Money Tracker

A free, mobile-friendly spending and income tracker for Singapore dollars (SGD), published with GitHub Pages.

## Features

- Dashboard summaries for day, week, month and year
- Record spending and income with date, category, payment method and notes
- Include or exclude an income entry from net gain/loss without deleting it
- Search, edit and delete transactions
- Import and export CSV backups
- Import compatible bank-statement CSVs with a preview, date interpretation and duplicate skipping (manual import only)
- Download a demo-only bank-statement CSV to test import without real financial data
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


## UOB bank integration status

The repository now includes a **status-only Supabase Edge Function scaffold** at `supabase/functions/uob-connection-status/index.ts`. It checks that the caller has a valid Money Tracker Supabase session, then reports `not_configured`. It does **not** contact UOB, return balances, or retrieve transactions. GitHub Pages does not deploy Supabase Edge Functions automatically; this scaffold must be reviewed and deployed separately before the app can call it.

### Before any live bank connection

1. Confirm with UOB that the account and personal-app use case are eligible. UOB's Singapore API page says API services are for corporate (non-individual) clients, so a personal account may not qualify.
2. Register through the official [UOB API Developer Portal](https://developers.uobgroup.com/en/get-started), test only with the official sandbox, and request production access if UOB confirms eligibility.
3. Do not add UOB client secrets, API keys, certificates, bank passwords, PINs, OTPs or Singpass details to `index.html`, GitHub, or browser storage.
4. Only after UOB approval, implement the exact documented authorization and Accounts API flow in a server-side function. Store provider secrets as server-side secrets, enforce user ownership, request only necessary permissions, protect tokens, and handle revocation and errors.
5. Deploy and test the backend independently. Until then, the app must continue to say that live UOB bank sync is **not connected**; use manual entries or statement CSV import.

Official references: [UOB API Services (Singapore)](https://www.uob.com.sg/business/digital/uob-api-services.page), [UOB API documentation](https://developers.uobgroup.com/en/apis-documentation), and [UOB developer terms](https://developers.uobgroup.com/en/?format=raw&option=com_apiportal&view=terms).

## Publish with GitHub Pages

1. Open repository **Settings** → **Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Open **Actions** and confirm the **Deploy Money Tracker to GitHub Pages** workflow finishes successfully.
4. The site is available at https://smadhihahamed.github.io/money-tracker/.

Changes pushed to `main` re-trigger the deployment workflow.

The signed-in/local status badge remains visible on narrow mobile screens so the user can confirm whether cloud mode is active.
