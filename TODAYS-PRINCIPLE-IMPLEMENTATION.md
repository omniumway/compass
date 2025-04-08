# Today's Principle Implementation

This document explains the improved implementation of the "Today's Principle" feature on the homepage.

## Overview

The "Today's Principle" section has been reimplemented using a hybrid approach that combines:

1. **Static HTML Template**: The HTML structure is defined in the Hugo template (`layouts/index.html`)
2. **Dynamic Content**: JavaScript is used only to populate the content, not to generate the entire HTML

This approach provides several benefits:
- Better performance (initial page structure loads immediately)
- Progressive enhancement (basic structure visible even if JavaScript fails to load)
- Simplified code separation (HTML structure in templates, behavior in JavaScript)
- Better maintainability (template changes can be made directly in HTML)

## How It Works

### 1. Static Template Structure

The static HTML structure in `layouts/index.html` defines all elements with unique IDs:

```html
<div id="todays-principle">
  <div class="principle-card">
    <!-- Header with title and icon -->
    <div id="principle-title">Loading principle...</div>
    <div id="principle-icon-container">
      <i id="principle-icon" class="ph ph-spinner"></i>
    </div>
    
    <!-- Content sections -->
    <div id="principle-quote-container">...</div>
    <div id="principle-content-container">...</div>
    <div id="principle-practice-container">...</div>
    <div id="principle-reflection-container">...</div>
    
    <!-- Navigation controls -->
    <button id="prev-principle">...</button>
    <button id="next-principle">...</button>
  </div>
</div>
```

### 2. JavaScript for Data Management

The JavaScript file (`assets/js/random-principle.js`) is responsible for:

1. **Loading data**: Fetching the principles from `principles.json`
2. **Selection logic**: Picking a random principle or retrieving the stored one
3. **Content updates**: Updating the DOM elements with the principle data
4. **Navigation**: Handling next/previous buttons
5. **Persistence**: Storing the principle in localStorage with date tracking

Key functions:

- `getRandomPrinciple()`: Selects a random principle or retrieves the stored one
- `updatePrincipleDOM(principle)`: Updates all DOM elements with principle data
- `navigatePrinciple(direction)`: Handles navigation between principles
- `initRandomPrinciple()`: Sets up event listeners and initializes the feature

### 3. User Experience

The user experience is preserved:

- Each user sees a random principle that persists for the day
- The refresh button allows for getting a new random principle
- Next/previous buttons allow browsing through all principles
- All styling and animations are maintained

## Maintenance Notes

When making changes:

1. **UI Structure Changes**: Edit the HTML in `layouts/index.html`
2. **Data/Behavior Changes**: Edit the JavaScript in `assets/js/random-principle.js`

If adding new fields to a principle:
1. Add appropriate HTML containers in the template with unique IDs
2. Update the `updatePrincipleDOM()` function to populate these new fields

## Performance Benefits

- Initial page rendering is faster (no waiting for JavaScript to generate HTML)
- Progressive enhancement (basic structure is visible even before JavaScript loads)
- Reduced JavaScript execution time (DOM manipulation instead of HTML generation)
- Better caching (HTML structure cached by Hugo, only data loaded dynamically)
