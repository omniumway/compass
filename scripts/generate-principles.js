#!/usr/bin/env node

/**
 * This script scans all principle markdown files in the content directory
 * and generates a principles.json file in the data directory for use
 * in the random principle feature.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const CONTENT_DIR = path.join(__dirname, '../content/principles');
const DATA_DIR = path.join(__dirname, '../data');
const STATIC_DATA_DIR = path.join(__dirname, '../static/data');
const OUTPUT_FILE = path.join(DATA_DIR, 'principles.json');
const STATIC_OUTPUT_FILE = path.join(STATIC_DATA_DIR, 'principles.json');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(STATIC_DATA_DIR)) {
  fs.mkdirSync(STATIC_DATA_DIR, { recursive: true });
}

// Categories
const categories = ['simplicity', 'patience', 'compassion'];

/**
 * Get all principles from the content directory
 */
function getAllPrinciples() {
  const principles = [];

  // Iterate through each category
  categories.forEach(category => {
    const categoryDir = path.join(CONTENT_DIR, category);
    
    if (!fs.existsSync(categoryDir)) {
      console.warn(`Category directory not found: ${categoryDir}`);
      return;
    }

    // Get all markdown files in the category directory
    const files = fs.readdirSync(categoryDir)
      .filter(file => file.endsWith('.md') && !file.startsWith('_'));
    
    // Process each file
    files.forEach(file => {
      const filePath = path.join(categoryDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      try {
        // Parse frontmatter
        const { data } = matter(content);
        
        // Skip draft principles
        if (data.draft === true) {
          return;
        }
        
        // Create principle object
        const principle = {
          title: data.title,
          category: data.category,
          icon: data.icon,
          slug: file.replace('.md', ''),
          principle: data.principle,
          practice: data.practice,
          reflection: data.reflection,
          quote: {
            author: data.quoteAuthor,
            text: data.quote,
            context: data.quoteContext || ''
          },
          situations: data.situations || [],
          weight: data.weight || 999
        };
        
        principles.push(principle);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    });
  });

  // Sort principles by weight
  return principles.sort((a, b) => a.weight - b.weight);
}

/**
 * Generate the principles.json file
 */
function generatePrinciplesJson() {
  const principles = getAllPrinciples();
  
  if (principles.length === 0) {
    console.warn('No principles found. Make sure the content structure is correct.');
    return;
  }
  
  const output = {
    principles,
    generatedAt: new Date().toISOString(),
    count: principles.length
  };
  
  // Generate JSON for Hugo data directory
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Generated ${OUTPUT_FILE} with ${principles.length} principles`);

  // Copy to static directory for client-side loading
  fs.writeFileSync(STATIC_OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Copied to ${STATIC_OUTPUT_FILE} for client-side loading`);

  // Generate a categorized version for easier lookup
  const categorized = {};
  categories.forEach(category => {
    categorized[category] = principles.filter(p => p.category === category);
  });

  const categorizedOutput = {
    categories: categorized,
    generatedAt: new Date().toISOString(),
    count: principles.length
  };

  const categorizedFile = path.join(DATA_DIR, 'principles-by-category.json');
  fs.writeFileSync(categorizedFile, JSON.stringify(categorizedOutput, null, 2), 'utf8');
  console.log(`Generated ${categorizedFile}`);
}

// Run the generation function
generatePrinciplesJson();
