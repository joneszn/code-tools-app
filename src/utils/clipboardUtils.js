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
