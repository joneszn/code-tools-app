// CSS utility functions for minifying and beautifying CSS

export function BeautifyCss(css) {
  try {
    // Basic CSS formatting
    let formatted = css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/,\s*/g, ',\n')
      .trim();
    return formatted;
  } catch (error) {
    return "Error: Invalid CSS format - " + error.message;
  }
}

export function MinifyCss(css) {
  try {
    // Remove unnecessary whitespace and comments
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*:\s*/g, ':')
      .replace(/;}/g, '}') // Remove trailing semicolon before }
      .trim();
  } catch (error) {
    return "Error: Invalid CSS format - " + error.message;
  }
}
