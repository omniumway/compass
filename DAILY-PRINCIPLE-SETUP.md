# Daily Principle Setup

This document explains the implementation of the "Today's Principle" feature and the daily rebuild setup.

## Static Principle Generation

The "Today's Principle" section on the homepage is now implemented using Hugo's static site generation capabilities:

1. The principle is randomly selected at build time using Hugo's template functions
2. The HTML is generated statically and served to all users
3. The principle changes when the site is rebuilt (once per day via GitHub Actions)

### How It Works

In `layouts/index.html`, we use Hugo's built-in functions to select a random principle:

```go
{{ $principlesData := resources.Get "data/principles.json" | transform.Unmarshal }}
{{ $randomIndex := mod now.Unix (len $principlesData.principles) }}
{{ $principle := index $principlesData.principles $randomIndex }}
```

This approach:
- Eliminates the need for client-side JavaScript to load and display principles
- Improves performance and reduces complexity
- Provides a consistent "principle of the day" for all users

## Daily Rebuild Setup

To change the principle daily, we've set up an automated rebuild process using GitHub Actions:

### GitHub Actions Workflow

The workflow file at `.github/workflows/daily-rebuild.yml` triggers a Vercel deployment every day at midnight UTC:

```yaml
name: Daily Rebuild

on:
  schedule:
    - cron: '0 0 * * *'  # Midnight UTC
  workflow_dispatch:     # Manual trigger

jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy
        run: |
          curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK_URL }}
```

### Setup Instructions

To complete the setup:

1. In your Vercel dashboard:
   - Go to your project
   - Navigate to Settings → Git → Deploy Hooks
   - Create a new deploy hook named "Daily Rebuild"
   - Copy the generated URL

2. In your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Add a new repository secret:
     - Name: `VERCEL_DEPLOY_HOOK_URL`
     - Value: [paste the URL from Vercel]

Once configured, the site will automatically rebuild once a day, generating a new random principle for all users.

## Benefits of This Approach

- **Simplified Architecture**: No client-side JavaScript needed for principle selection
- **Improved Performance**: Faster page load with pre-rendered content
- **Consistent Experience**: All users see the same principle on a given day
- **Reduced Complexity**: Fewer moving parts and dependencies

## Testing the Setup

You can manually trigger a rebuild to test the setup:
1. Go to Actions → Daily Rebuild → Run workflow
2. Refresh your site after the deployment completes to see a new random principle
