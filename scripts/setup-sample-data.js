#!/usr/bin/env node

/**
 * This script creates a sample principles.json file in both the data
 * and static/data directories to ensure the app can start correctly.
 */

const fs = require('fs');
const path = require('path');

// Paths
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

// Sample data - based on the true-north principle
const sampleData = {
  principles: [
    {
      title: "True North",
      category: "simplicity",
      icon: "compass-rose",
      slug: "true-north",
      principle: "**True North**: When the game feels too complicated, return to your center. Focus on one simple truth—your position, the ball, your breath—and let everything else organize around that point.",
      practice: "Before your next match, choose your \"True North\"—one simple focus point when things get confusing. It might be feeling your feet on the ground, tracking the ball, or remembering your positioning. When overwhelmed, return to this one point.",
      reflection: "What single focus point helps you feel centered when football seems too complicated?",
      quote: {
        author: "Johan Cruyff",
        text: "Playing football is very simple, but playing simple football is the hardest thing there is.",
        context: "When Cruyff speaks about simplicity in football, he's describing what we call True North - the understanding that beneath all the complexity of the game lies a simple core. Finding that simplicity gives you a reference point to return to when the game feels overwhelming."
      },
      situations: ["game-pressure", "overwhelm"],
      weight: 1
    }
  ],
  generatedAt: new Date().toISOString(),
  count: 1
};

// Write the sample data
try {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleData, null, 2), 'utf8');
  console.log(`Created sample data at ${OUTPUT_FILE}`);
  
  fs.writeFileSync(STATIC_OUTPUT_FILE, JSON.stringify(sampleData, null, 2), 'utf8');
  console.log(`Created sample data at ${STATIC_OUTPUT_FILE}`);
} catch (error) {
  console.error('Error creating sample data:', error);
}
