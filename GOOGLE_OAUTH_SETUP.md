# Google OAuth Setup Guide

This guide will help you configure Google OAuth authentication for the StudyFlash application.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Name your project (e.g., "StudyFlash OAuth")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud Console, navigate to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and then click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" (unless you have a G Suite account)
3. Fill in the required fields:
   - **App name**: StudyFlash
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Add test users (your email and any other test emails)
6. Submit for verification (for production use)

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Name it "StudyFlash Web Client"
5. Add authorized redirect URIs:
   - **Development**: `http://localhost:4000/api/auth/google/callback`
   - **Production**: `https://yourdomain.com/api/auth/google/callback`
6. Click "Create"
7. Copy the **Client ID** and **Client Secret**

## Step 5: Configure Environment Variables

### Backend (.env)

Add these variables to your backend `.env` file:

```env
# Google OAuth 2.0
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"

# Frontend URL (for OAuth callbacks)
FRONTEND_URL="http://localhost:3000"

# Session secret for OAuth sessions
SESSION_SECRET="your-session-secret-key-for-oauth"
```

### Frontend (.env.local)

Ensure your frontend `.env.local` file has:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Step 6: Update Database Schema

Run the database migration to support Google OAuth:

```bash
cd backed
npx prisma db push
```

## Step 7: Test the OAuth Flow

1. Start your backend server:

   ```bash
   cd backed
   npm run dev
   ```

2. Start your frontend server:

   ```bash
   cd study-flash-card
   npm run dev
   ```

3. Go to `http://localhost:3000/login`
4. Click "Continue with Google"
5. Complete the OAuth flow
6. You should be redirected to the dashboard

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch" error**
   - Check that your redirect URI in Google Console exactly matches `http://localhost:4000/api/auth/google/callback`
   - Ensure there are no trailing slashes

2. **"invalid_client" error**
   - Verify your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
   - Check for any extra spaces in your environment variables

3. **OAuth callback not working**
   - Ensure your backend is running on port 4000
   - Check that `FRONTEND_URL` is set correctly in your backend `.env`

4. **Database errors**
   - Run `npx prisma db push` to update your database schema
   - Check your `DATABASE_URL` is correctly configured

### Development vs Production Differences

**Development:**

- Redirect URI: `http://localhost:4000/api/auth/google/callback`
- Frontend URL: `http://localhost:3000`

**Production:**

- Redirect URI: `https://yourdomain.com/api/auth/google/callback`
- Frontend URL: `https://yourdomain.com`
- OAuth consent screen must be verified by Google

## Security Notes

- Never commit your `.env` files to version control
- Use strong, random secrets for `JWT_SECRET` and `SESSION_SECRET`
- In production, use HTTPS for all OAuth endpoints
- Regularly rotate your OAuth secrets

## Features Supported

After successful setup, users can:

- Sign up with their Google account
- Log in with Google OAuth
- Link existing accounts to Google
- Access profile information (name, email, avatar)
- Maintain the same permissions and deck access
