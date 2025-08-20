// Utility function for copying text to clipboard
export const copyToClipboard = async (text, buttonElement) => {
  try {
    await navigator.clipboard.writeText(text);
    
    // Visual feedback
    buttonElement.classList.add('copied');
    setTimeout(() => {
      buttonElement.classList.remove('copied');
    }, 1500);
    
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // Visual feedback
      buttonElement.classList.add('copied');
      setTimeout(() => {
        buttonElement.classList.remove('copied');
      }, 1500);
      
      return true;
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr);
      return false;
    }
  }
};

// Utility function to get text content from element (textarea or div)
export const getTextContent = (element) => {
  if (element.tagName.toLowerCase() === 'textarea') {
    return element.value;
  } else {
    // For div elements, get the text content without HTML tags
    return element.textContent || element.innerText || '';
  }
};
