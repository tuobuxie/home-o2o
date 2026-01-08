<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1vmw38pplbeBpBnFlx1DB3fAaQvO7PGyn

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Optional) Set the `VITE_API_BASE_URL` in [.env.local](.env.local) to your API base URL (copy from [.env.local.example](.env.local.example))
   - If not set, it will use the default value from `.env.development`
3. Run the app:
   `npm run dev`
