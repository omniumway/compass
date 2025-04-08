# Deployment Guide

This document explains how to deploy the Athlete's Compass application using the CI/CD pipeline with GitHub Actions and Vercel.

## Prerequisites

Before setting up the deployment pipeline, you will need:

1. A GitHub account
2. A Vercel account
3. Fork or clone of this repository

## Setting Up Vercel

1. **Create a New Project in Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project with the following settings:
     - Framework Preset: Other
     - Build Command: `npm run vercel-build`
     - Output Directory: `public`
     - Install Command: `pnpm install`

2. **Obtain Vercel API Credentials**
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token with a descriptive name (e.g., "GitHub Actions")
   - Copy the token value (you'll need it for GitHub)
   - Note your Vercel Organization ID and Project ID (found in project settings)

## Setting Up GitHub Actions

1. **Add Repository Secrets**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID

2. **Enable GitHub Actions**
   - Make sure GitHub Actions is enabled for your repository
   - The workflow file is already included at `.github/workflows/deploy.yml`

## How the CI/CD Pipeline Works

The CI/CD pipeline is defined in `.github/workflows/deploy.yml` and consists of two main jobs:

### Test Job

This job runs on every push to any branch and pull request to the main branch:

1. Checkout the repository
2. Set up Node.js and pnpm
3. Install Hugo
4. Install dependencies
5. Set up sample data
6. Generate principles JSON
7. Run Hugo checks
8. Build the site
9. Run Playwright tests

### Deploy Job

This job only runs on pushes to the main branch:

1. Checkout the repository
2. Install Vercel CLI
3. Deploy to Vercel production environment

## Manual Deployment

If you need to deploy manually, you can use:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
npm run deploy
```

## Environment Variables

The project uses the following environment variables:

- `HUGO_BASEURL`: The base URL for the Hugo site (defaults to the Vercel deployment URL)
- `HUGO_ENVIRONMENT`: The environment name (development/production)

These can be set in your Vercel project settings or in a `.env` file locally.

## Troubleshooting

### Common Issues

1. **Build Failures**: Check the GitHub Actions logs for specific errors
2. **Deployment Failures**: Verify your Vercel credentials and project configuration
3. **Missing Content**: Ensure that the data generation scripts are running correctly

For more help, please open an issue on GitHub.