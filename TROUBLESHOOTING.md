# Troubleshooting Athlete's Compass

If you're encountering issues with the Athlete's Compass application, here are some common problems and their solutions.

## Today's Principle Not Rendering

If the "Today's Principle" section on the homepage is not rendering correctly:

1. **Check the console for errors** - Look for any JavaScript errors that might be preventing the principle from loading.

2. **Ensure principles.json exists** - Make sure the principles.json file exists in both locations:
   - `/data/principles.json` (for Hugo)
   - `/static/data/principles.json` (for client-side loading)

   You can run `node scripts/setup-sample-data.js` to create these files.

3. **Clear browser cache** - Sometimes the browser cache can cause issues. Try clearing your browser cache or using incognito mode.

4. **Regenerate principles data** - Run `pnpm run generate-principles` to regenerate the principles.json file from your content.

## Service Worker Errors

If you're seeing service worker related errors:

1. **Unregister existing service worker** - In Chrome DevTools, go to Application > Service Workers and click "Unregister" for any Athlete's Compass service workers.

2. **Update service worker code** - Make sure your service worker properly handles failed asset loads.

3. **Disable service worker during development** - You can comment out the service worker registration during development to avoid caching issues.

## Missing Icons

If you're seeing 404 errors for icons:

1. **Create placeholder icons** - Make sure the following files exist:
   - `/static/icons/icon-192x192.png`
   - `/static/icons/icon-512x512.png`
   - `/static/icons/apple-touch-icon.png`
   - `/static/icons/placeholder.png`

   Even if they're just empty files or text files with `.png` extensions for development.

2. **Update manifest.json** - Ensure your manifest.json isn't pointing to non-existent files.

## Quick Fix Script

For a quick fix that addresses all common issues at once, run:

```bash
# Make the script executable
chmod +x fix-and-reload.sh

# Run the fix script
./fix-and-reload.sh
```

This script will:
1. Install missing dependencies
2. Create necessary directories
3. Generate sample principles data
4. Generate principles from content
5. Clear Hugo cache
6. Restart the Hugo server

## Common Hugo Errors

### getJSON Deprecated

If you see an error about `getJSON` being deprecated:

```
ERROR deprecated: data.GetJSON was deprecated in Hugo v0.123.0 and subsequently removed.
```

This is because newer versions of Hugo have removed the `getJSON` function. We've updated the code to use `resources.Get` with `transform.Unmarshal` instead.

### Empty Principles Data

If principles are loading but the data is empty, check:

1. That your principles markdown files have the correct frontmatter format
2. That the paths in `generate-principles.js` point to the correct locations
3. That the generated JSON files have the expected structure

Run `cat data/principles.json` to inspect the data structure.

## Still Having Issues?

If you're still experiencing problems after trying the above solutions:

1. Delete the `public`, `resources`, and `node_modules` directories
2. Run `pnpm install` to reinstall dependencies
3. Run `./fix-and-reload.sh` to completely refresh the application
