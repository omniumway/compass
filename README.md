# Athlete's Compass

A Progressive Web App (PWA) providing mindfulness principles for young football players.

[![Deploy to Vercel](https://github.com/vercel/vercel/blob/main/packages/style-guide/vercel.svg)](https://vercel.com/import/project?template=https://github.com/yourusername/omnium-compass)

## Features

- **21 Mindfulness Principles**: Organized into three categories - Simplicity, Patience, and Compassion
- **Random Daily Principle**: A new principle is shown each day on the homepage
- **Offline Support**: Works without an internet connection
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Animations**: Engaging animations for young users
- **Quotes from Pro Players**: Authentic quotes from professional footballers
- **Light/Dark Themes**: Nord (light) and Sunset (dark) themes with system preference detection

## Development

### Prerequisites

- Node.js (v14 or later)
- Hugo (v0.80.0 or later)
- pnpm

### Quick Start

```bash
# Clone the repository
git clone [your-repo-url]
cd omnium-compass

# Make the build script executable
chmod +x build-and-run.sh

# Run the build script to install dependencies and start the dev server
./build-and-run.sh
```

Or manually:

```bash
# Install dependencies
pnpm install

# Generate principles.json from content files
pnpm run generate-principles

# Start the development server
pnpm run dev
```

### Build for Production

```bash
pnpm run build
```

### Project Structure

- `/content/principles/`: Markdown files for each principle
- `/layouts/`: HTML templates
- `/assets/`: CSS, JS, and other assets
- `/static/`: Static files like images and icons
- `/data/`: Generated JSON data
- `/scripts/`: Build scripts

## Random Principle Feature

The app shows a "Today's Principle" on the homepage that changes daily. This is implemented with:

1. A build-time process that generates a `principles.json` file from all principle content files
2. A JavaScript feature that selects a random principle each day
3. LocalStorage to persist the selected principle throughout the day

### How It Works

- When the site is built, `generate-principles.js` reads all principle files and creates `data/principles.json`
- On page load, `random-principle.js` checks if there's a principle saved for today in localStorage
- If not, it selects a random principle and saves it to localStorage
- Users can manually refresh the principle by clicking the refresh button

### Adding New Principles

1. Create a new markdown file in the appropriate category directory under `/content/principles/`
2. Include all required frontmatter (title, category, icon, etc.)
3. Run `pnpm run generate-principles` to update the JSON data

## PWA Features

The application is a fully-featured Progressive Web App with:

- Offline support via Service Worker
- Home screen installation
- Responsive design for all devices
- Fast performance

## Deployment

### Vercel Deployment

This project is configured for seamless deployment to Vercel, with GitHub Actions integration for CI/CD.

1. Fork this repository
2. Set up a new project in Vercel
3. Link your GitHub repository
4. Add the following secrets to your GitHub repository:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

The included GitHub Actions workflow will:
1. Test your changes
2. Run Playwright tests
3. Deploy to Vercel on pushes to main branch

### Manual Deployment

To deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```
