// Function to update CSS variables
function updateCSSVariables(tokens) {
    const root = document.documentElement;
  
    // Helper function to flatten nested objects
    function flattenObject(obj, prefix = '') {
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? `${prefix}-` : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
          Object.assign(acc, flattenObject(obj[k], `${pre}${k}`));
        } else {
          acc[`${pre}${k}`] = obj[k];
        }
        return acc;
      }, {});
    }
  
    // Update variables for each breakpoint
    ['breakpoint01', 'breakpoint02'].forEach(breakpoint => {
      const breakpointTokens = tokens[breakpoint];
      const flatTokens = flattenObject(breakpointTokens);
  
      Object.entries(flatTokens).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          root.style.setProperty(`--${key}`, value);
        }
      });
    });
  
    // Update global typography variables
    ['display', 'heading', 'bodycopy'].forEach(category => {
      const categoryTokens = tokens[category];
      const flatTokens = flattenObject(categoryTokens);
  
      Object.entries(flatTokens).forEach(([key, value]) => {
        root.style.setProperty(`--${category}-${key}`, value);
      });
    });
  }
  
  // Function to fetch JSON and update CSS
  async function updateTypography() {
    try {
      const response = await fetch('tokens/typography.tokens.json');
      const tokens = await response.json();
      updateCSSVariables(tokens);
      console.log('Typography updated successfully');
    } catch (error) {
      console.error('Error updating typography:', error);
    }
  }
  
  // Call the function to update typography
  updateTypography();
  
  // Optionally, you could set this to run periodically or on specific events
  // setInterval(updateTypography, 3600000); // Update every hour