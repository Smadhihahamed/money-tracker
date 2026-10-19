# Money Tracker

A free, mobile-friendly, installable website for tracking spending and income in Singapore dollars (SGD).

## Features
- Dashboard summaries for day, week, month and year
- Record spending and income with a date, category, payment method and notes
- Track PayNow, online purchases, card, cash, bank transfer and other methods
- Include or exclude an income entry from net gain/loss without deleting it
- Search, edit and delete entries
- Import and export CSV files
- Progressive Web App manifest and offline cache

## Important limits and privacy
- This is a local-first website. Records are saved in the current browser on the current device using browser storage.
- It does not have user accounts, cross-device cloud sync, or a connection to UOB. Add entries manually or import a CSV file you choose.
- It does not request bank passwords, PINs, OTPs or Singpass details.
- Browser data can be lost if browser storage is cleared or the device is lost. Export regular CSV backups and keep the backups private.
- The repository is public because free GitHub Pages hosting requires a public repository on GitHub Free. The app does not upload transaction records, but all source files in this repository are public. Never commit your CSV backup or real financial data.

## Publish with free GitHub Pages
A workflow is included at `.github/workflows/deploy.yml`.

1. Open **Settings** for this repository.
2. Select **Pages** in the sidebar.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy Money Tracker to GitHub Pages** to finish successfully.
5. The site should then be available at https://smadhihahamed.github.io/money-tracker/

The automatic workflow re-deploys the site when new commits are pushed to `main`.

## Install on Android
1. Open the published website in Chrome on your Android device.
2. Use Chrome's menu and choose **Install app** or **Add to Home screen** if offered.

This is an installable website (PWA), not a Google Play Store listing or a native Android APK.
