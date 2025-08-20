// Improved JSON syntax highlighting
export function highlightJson(jsonString) {
  if (!jsonString || jsonString.trim().startsWith('Error:')) {
    return jsonString;
  }

  try {
    // Validate it's JSON by parsing, but preserve original formatting
    JSON.parse(jsonString);
    
    // Escape HTML characters
    const escaped = jsonString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped
      // Highlight string keys (property names)
      .replace(/("(?:[^"\\]|\\.)*")(\s*:\s*)/g, '<span class="json-key">$1</span><span class="json-punctuation">$2</span>')
      // Highlight string values
      .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="json-string">$1</span>')
      // Highlight numbers (including decimals and scientific notation)
      .replace(/:\s*(-?\d+\.?\d*(?:[eE][+-]?\d+)?)/g, ': <span class="json-number">$1</span>')
      // Highlight booleans
      .replace(/:\s*(true|false)\b/g, ': <span class="json-boolean">$1</span>')
      // Highlight null
      .replace(/:\s*(null)\b/g, ': <span class="json-null">$1</span>')
      // Highlight structural punctuation
      .replace(/([{}\[\],])/g, '<span class="json-punctuation">$1</span>')
      // Highlight string values in arrays (not preceded by :)
      .replace(/(?<!:\s)("(?:[^"\\]|\\.)*")(?=\s*[,\]\}])/g, '<span class="json-string">$1</span>')
      // Highlight numbers in arrays
      .replace(/(?<!:\s)(-?\d+\.?\d*(?:[eE][+-]?\d+)?)(?=\s*[,\]\}])/g, '<span class="json-number">$1</span>')
      // Highlight booleans in arrays
      .replace(/(?<!:\s)(true|false)(?=\s*[,\]\}])/g, '<span class="json-boolean">$1</span>')
      // Highlight null in arrays
      .replace(/(?<!:\s)(null)(?=\s*[,\]\}])/g, '<span class="json-null">$1</span>');
  } catch (error) {
    return jsonString;
  }
}

// Improved XML syntax highlighting
export function highlightXml(xmlString) {
  if (!xmlString || xmlString.trim().startsWith('Error:')) {
    return xmlString;
  }

  // Escape HTML characters
  let escaped = xmlString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight XML comments
  escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="xml-comment">$1</span>');

  // Highlight XML processing instructions
  escaped = escaped.replace(/(&lt;\?[\s\S]*?\?&gt;)/g, '<span class="xml-processing">$1</span>');

  // Highlight CDATA sections
  escaped = escaped.replace(/(&lt;!\[CDATA\[[\s\S]*?\]\]&gt;)/g, '<span class="xml-cdata">$1</span>');

  // Highlight opening and closing tags with attributes
  escaped = escaped.replace(/(&lt;\/?)([a-zA-Z][\w:-]*)((?:\s+[a-zA-Z][\w:-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|\w+))?)*)\s*(\/?&gt;)/g, 
    function(match, openBracket, tagName, attributes, closeBracket) {
      // Highlight attributes within the tag
      const highlightedAttributes = attributes.replace(/([a-zA-Z][\w:-]*)(=)("([^"]*)"|'([^']*)'|(\w+))/g, 
        '<span class="xml-attribute-name">$1</span><span class="xml-equals">$2</span><span class="xml-attribute-value">$3</span>');
      
      return `<span class="xml-bracket">${openBracket}</span><span class="xml-tag">${tagName}</span>${highlightedAttributes}<span class="xml-bracket">${closeBracket}</span>`;
    });

  return escaped;
}

// Improved CSS syntax highlighting
export function highlightCss(cssString) {
  if (!cssString || cssString.trim().startsWith('Error:')) {
    return cssString;
  }

  // Escape HTML characters
  let escaped = cssString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight CSS comments
  escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>');

  // Highlight @rules (media queries, imports, etc.)
  escaped = escaped.replace(/(@[\w-]+)/g, '<span class="css-at-rule">$1</span>');

  // Highlight selectors (everything before {, excluding comments and @rules)
  escaped = escaped.replace(/([^{}\/\*@][^{}]*?)(\s*\{)/g, function(match, selector, brace) {
    // Don't highlight if it's inside a comment or @rule
    if (selector.includes('/*') || selector.includes('*/') || selector.includes('@')) {
      return match;
    }
    
    // Highlight different parts of selectors
    const highlightedSelector = selector
      // Highlight IDs
      .replace(/#([\w-]+)/g, '<span class="css-id">#$1</span>')
      // Highlight classes
      .replace(/\.([\w-]+)/g, '<span class="css-class">.$1</span>')
      // Highlight pseudo-classes and pseudo-elements
      .replace(/::([\w-]+)/g, '<span class="css-pseudo">::$1</span>')
      .replace(/:([\w-]+)/g, '<span class="css-pseudo">:$1</span>')
      // Highlight element selectors (remaining words)
      .replace(/\b([a-zA-Z][\w-]*)\b(?![}])/g, function(match, element) {
        // Don't highlight if already highlighted
        if (match.includes('span')) return match;
        return `<span class="css-element">${element}</span>`;
      });
    
    return highlightedSelector + '<span class="css-punctuation">' + brace + '</span>';
  });

  // Highlight CSS properties and values
  escaped = escaped.replace(/([a-zA-Z-]+)(\s*:\s*)([^;{}]+)(;?)/g, function(match, property, colon, value, semicolon) {
    // Don't highlight if it's inside a comment
    if (match.includes('/*') || match.includes('*/')) {
      return match;
    }
    
    // Highlight different types of values
    const highlightedValue = value
      // Highlight strings
      .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="css-string">$1</span>')
      // Highlight numbers with units
      .replace(/(-?\d*\.?\d+(?:px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax|deg|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?)/g, '<span class="css-number">$1</span>')
      // Highlight hex colors
      .replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="css-color">$1</span>')
      // Highlight CSS functions
      .replace(/([a-zA-Z-]+)(\()/g, '<span class="css-function">$1</span><span class="css-punctuation">$2</span>')
      // Highlight important
      .replace(/(!important)/g, '<span class="css-important">$1</span>');
    
    return `<span class="css-property">${property}</span><span class="css-punctuation">${colon}</span>${highlightedValue}<span class="css-punctuation">${semicolon}</span>`;
  });

  // Highlight remaining structural punctuation
  escaped = escaped.replace(/([{}])/g, '<span class="css-punctuation">$1</span>');

  return escaped;
}
