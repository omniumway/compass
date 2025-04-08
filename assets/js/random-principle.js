/**
 * Random Principle Feature - Improved Version
 * 
 * This script handles the selection and display of a random principle
 * for the "Today's Principle" section on the homepage.
 * Using a hybrid approach with static HTML structure and dynamic content.
 */

// Helper function to get initials from a name
function getInitials(name) {
  if (!name) return '';
  const nameParts = name.split(' ');
  let initials = nameParts[0].charAt(0).toUpperCase();
  
  if (nameParts.length > 1) {
    initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  }
  
  return initials;
}

// Helper function to convert category to RGB values for styling
function getColorRgb(category) {
  switch (category) {
    case 'simplicity':
      return '59, 130, 246'; // blue
    case 'patience':
      return '76, 175, 80'; // green
    case 'compassion':
      return '147, 51, 234'; // purple
    default:
      return '107, 114, 128'; // gray
  }
}

// Helper function to render markdown content
function renderMarkdown(text) {
  if (!text) return '';
  if (window.markdownit) {
    return window.markdownit().render(text);
  }
  return text;
}

// Function to get a random principle from our dataset
function getRandomPrinciple() {
  const principles = window.principlesData || [];
  if (principles.length === 0) {
    console.warn("No principles data available yet");
    return null;
  }
  
  // Check if we have a stored principle for today
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const storedPrinciple = localStorage.getItem('todaysPrinciple');
  const storedDate = localStorage.getItem('todaysPrincipleDate');
  
  // If we have a stored principle and it's from today, use it
  if (storedPrinciple && storedDate === today) {
    try {
      const parsedPrinciple = JSON.parse(storedPrinciple);
      console.log("Using stored principle from today:", parsedPrinciple.title);
      return parsedPrinciple;
    } catch (e) {
      console.error('Error parsing stored principle:', e);
    }
  }
  
  // Otherwise, get a new random principle
  const randomIndex = Math.floor(Math.random() * principles.length);
  const principle = principles[randomIndex];
  
  if (principle) {
    console.log("Selected new random principle:", principle.title);
    
    // Store it for today
    localStorage.setItem('todaysPrinciple', JSON.stringify(principle));
    localStorage.setItem('todaysPrincipleDate', today);
    localStorage.setItem('currentPrinciple', JSON.stringify(principle));
  }
  
  return principle;
}

// Function to update the DOM with principle data
function updatePrincipleDOM(principle) {
  if (!principle) {
    console.warn("No principle data to update DOM");
    return;
  }
  
  // Get all elements we need to update
  const title = document.getElementById('principle-title');
  const icon = document.getElementById('principle-icon');
  const iconContainer = document.getElementById('principle-icon-container');
  const categoryBadge = document.getElementById('principle-category-badge');
  const categoryLabel = document.getElementById('principle-category-label');
  
  const quoteContainer = document.getElementById('principle-quote-container');
  const quoteText = document.getElementById('principle-quote-text');
  const quoteAuthor = document.getElementById('principle-quote-author');
  const quoteContext = document.getElementById('principle-quote-context');
  const quoteAvatarContainer = document.getElementById('principle-quote-avatar-container');
  const quoteAvatar = document.getElementById('principle-quote-avatar');
  const quoteInitials = document.getElementById('principle-quote-initials');
  
  const contentContainer = document.getElementById('principle-content-container');
  const content = document.getElementById('principle-content');
  
  const practiceContainer = document.getElementById('principle-practice-container');
  const practice = document.getElementById('principle-practice');
  
  const reflectionContainer = document.getElementById('principle-reflection-container');
  const reflection = document.getElementById('principle-reflection');
  
  // If any element is missing, log a warning
  if (!title || !icon || !iconContainer || !categoryBadge || !categoryLabel || 
      !quoteContainer || !quoteText || !quoteAuthor || !quoteContext || 
      !quoteAvatarContainer || !quoteAvatar || !quoteInitials || 
      !contentContainer || !content || 
      !practiceContainer || !practice || 
      !reflectionContainer || !reflection) {
    console.warn("Some elements not found in the DOM");
  }
  
  // Update basic principle data
  if (title) title.textContent = principle.title;
  if (icon) icon.className = `ph ph-${principle.icon || 'compass'} text-xl`;
  
  if (iconContainer) {
    iconContainer.className = `w-12 h-12 rounded-full bg-${principle.category} flex items-center justify-center text-white mr-4 animate__animated animate__heartBeat animate__delay-200ms`;
  }
  
  // Update category badges
  const categoryText = principle.category.charAt(0).toUpperCase() + principle.category.slice(1);
  
  if (categoryBadge) {
    categoryBadge.textContent = categoryText;
    categoryBadge.className = `px-3 py-1 rounded-full text-xs font-medium bg-${principle.category} text-white`;
  }
  
  if (categoryLabel) {
    categoryLabel.textContent = categoryText;
    categoryLabel.className = `px-3 py-1 rounded-full text-xs font-medium badge-${principle.category}`;
  }
  
  // Update quote section if it exists
  if (principle.quote && principle.quote.text) {
    if (quoteText) quoteText.textContent = `"${principle.quote.text}"`;
    
    if (quoteAuthor && principle.quote.author) {
      quoteAuthor.textContent = `— ${principle.quote.author}`;
      
      // Set up avatar/initials
      if (quoteAvatarContainer) quoteAvatarContainer.style.display = 'block';
      
      if (quoteAvatar) {
        quoteAvatar.className = `w-16 h-16 rounded-full bg-${principle.category}-100 flex items-center justify-center text-${principle.category} border-2 border-${principle.category}`;
      }
      
      if (quoteInitials) {
        quoteInitials.textContent = getInitials(principle.quote.author);
      }
      
      // Try to load player avatar
      loadPlayerAvatar(principle.quote.author, principle.category);
    } else if (quoteAuthor) {
      quoteAuthor.textContent = '';
      if (quoteAvatarContainer) quoteAvatarContainer.style.display = 'none';
    }
    
    // Quote context
    if (quoteContext && principle.quote.context) {
      quoteContext.innerHTML = renderMarkdown(principle.quote.context);
      quoteContext.style.display = 'block';
    } else if (quoteContext) {
      quoteContext.style.display = 'none';
    }
    
    if (quoteContainer) quoteContainer.style.display = 'block';
  } else if (quoteContainer) {
    quoteContainer.style.display = 'none';
  }
  
  // Update principle content
  if (content) {
    content.innerHTML = renderMarkdown(principle.principle);
  }
  
  if (contentContainer) {
    contentContainer.className = `p-6 rounded-lg border-l-4 border-${principle.category} animate__animated animate__pulse animate__delay-100ms`;
    contentContainer.style.backgroundColor = `rgba(${getColorRgb(principle.category)}, 0.1)`;
  }
  
  // Update practice
  if (practice && principle.practice) {
    practice.innerHTML = renderMarkdown(principle.practice);
    if (practiceContainer) practiceContainer.style.display = 'block';
  } else if (practiceContainer) {
    practiceContainer.style.display = 'none';
  }
  
  // Update reflection
  if (reflection && principle.reflection) {
    reflection.innerHTML = renderMarkdown(principle.reflection);
    if (reflectionContainer) reflectionContainer.style.display = 'block';
  } else if (reflectionContainer) {
    reflectionContainer.style.display = 'none';
  }
}

// Function to try loading a player avatar
function loadPlayerAvatar(playerName, category) {
  if (!playerName) return;
  
  const avatar = document.getElementById('principle-quote-avatar');
  const initials = document.getElementById('principle-quote-initials');
  if (!avatar || !initials) return;
  
  const normalizedPlayerName = playerName.toLowerCase().replace(/ /g, '-');
  
  // Check if this image exists
  const checkImage = (path, callback) => {
    const img = new Image();
    img.onload = () => callback(true, path);
    img.onerror = () => callback(false);
    img.src = path;
  };
  
  // Create base URL - get it from a meta tag or use relative path
  const baseURL = document.querySelector('meta[name="base-url"]')?.content || '';
  
  // Check PNG
  const pngPath = `${baseURL}images/avatars/${normalizedPlayerName}.png`;
  checkImage(pngPath, (exists, path) => {
    if (exists) {
      // Replace initials with image
      avatar.innerHTML = `<img src="${path}" alt="${playerName}" class="w-full h-full rounded-full object-cover">`;
      return;
    }
    
    // Try JPG if PNG doesn't exist
    const jpgPath = `${baseURL}images/avatars/${normalizedPlayerName}.jpg`;
    checkImage(jpgPath, (exists, path) => {
      if (exists) {
        avatar.innerHTML = `<img src="${path}" alt="${playerName}" class="w-full h-full rounded-full object-cover">`;
      } else {
        // Keep showing initials
        avatar.innerHTML = '';
        avatar.appendChild(initials);
      }
    });
  });
}

// Function to navigate between principles
function navigatePrinciple(direction) {
  // Get all available principles
  const principles = window.principlesData || [];
  if (principles.length <= 1) return;
  
  // Get current principle
  const currentPrinciple = JSON.parse(localStorage.getItem('currentPrinciple') || localStorage.getItem('todaysPrinciple') || 'null');
  if (!currentPrinciple) return;
  
  const currentIndex = currentPrinciple ? principles.findIndex(p => p.slug === currentPrinciple.slug) : -1;
  
  // Calculate new index
  let newIndex;
  if (currentIndex === -1) {
    newIndex = direction === 'next' ? 0 : principles.length - 1;
  } else {
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % principles.length;
    } else {
      newIndex = (currentIndex - 1 + principles.length) % principles.length;
    }
  }
  
  // Set the new principle
  const newPrinciple = principles[newIndex];
  localStorage.setItem('currentPrinciple', JSON.stringify(newPrinciple));
  
  // Update the DOM
  updatePrincipleDOM(newPrinciple);
  
  // Add animation to the container
  const container = document.getElementById('todays-principle');
  if (container) {
    const principleCard = container.querySelector('.principle-card');
    if (principleCard) {
      principleCard.classList.add('animate__animated', direction === 'next' ? 'animate__slideInRight' : 'animate__slideInLeft');
      setTimeout(() => {
        principleCard.classList.remove('animate__animated', 'animate__slideInRight', 'animate__slideInLeft');
      }, 1000);
    }
  }
}

// Function to initialize our random principle
function initRandomPrinciple() {
  // Define a function to refresh the principle
  window.refreshPrinciple = function(forceNew = true) {
    if (forceNew) {
      // Clear the stored principle to force a new one
      localStorage.removeItem('todaysPrinciple');
      localStorage.removeItem('todaysPrincipleDate');
      localStorage.removeItem('currentPrinciple');
    }
    
    const principle = getRandomPrinciple();
    if (principle) {
      updatePrincipleDOM(principle);
    }
    
    // Animation for the refresh button
    const refreshBtn = document.getElementById('refresh-principle');
    if (refreshBtn) {
      refreshBtn.classList.add('animate__animated', 'animate__rotateIn');
      setTimeout(() => {
        refreshBtn.classList.remove('animate__animated', 'animate__rotateIn');
      }, 1000);
    }
  };
  
  // Set up the refresh button
  const refreshBtn = document.getElementById('refresh-principle');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
      window.refreshPrinciple(true);
    });
  }
  
  // Set up navigation buttons
  const prevButton = document.getElementById('prev-principle');
  const nextButton = document.getElementById('next-principle');
  
  if (prevButton) {
    prevButton.addEventListener('click', () => navigatePrinciple('prev'));
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => navigatePrinciple('next'));
  }
  
  // Initialize with a principle
  const principle = getRandomPrinciple();
  if (principle) {
    updatePrincipleDOM(principle);
  }
  
  // If principles data isn't available yet, set up a retry mechanism
  if (!window.principlesData || window.principlesData.length === 0) {
    console.log("No principles data yet, setting up retry...");
    
    // Try loading data from the server
    fetch('/data/principles.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.principles) {
          console.log("Loaded principles data:", data.principles.length, "principles");
          window.principlesData = data.principles;
          
          const principle = getRandomPrinciple();
          if (principle) {
            updatePrincipleDOM(principle);
          }
        }
      })
      .catch(error => {
        console.error('Error loading principles data:', error);
        
        // Retry a few times
        let retryCount = 0;
        const maxRetries = 3;
        const retryInterval = setInterval(() => {
          retryCount++;
          console.log(`Retry ${retryCount}/${maxRetries} loading principles data...`);
          
          if (window.principlesData && window.principlesData.length > 0) {
            console.log("Principles data now available, rendering...");
            clearInterval(retryInterval);
            
            const principle = getRandomPrinciple();
            if (principle) {
              updatePrincipleDOM(principle);
            }
            return;
          }
          
          if (retryCount >= maxRetries) {
            clearInterval(retryInterval);
            console.error("Failed to load principles data after retries");
            
            // Show error message
            const title = document.getElementById('principle-title');
            const content = document.getElementById('principle-content');
            
            if (title) title.textContent = 'Error Loading Principle';
            if (content) {
              content.innerHTML = `
                <div class="text-center">
                  <p class="text-red-500 mb-3">Unable to load principles data.</p>
                  <button id="retry-load" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Retry
                  </button>
                </div>
              `;
              
              // Add retry button functionality
              const retryBtn = document.getElementById('retry-load');
              if (retryBtn) {
                retryBtn.addEventListener('click', () => {
                  location.reload();
                });
              }
            }
          }
        }, 2000);
      });
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initRandomPrinciple();
});
