// XML utility functions for minifying and beautifying XML

export function BeautifyXml(xml) {
  try {
    // Basic XML formatting - add indentation
    let formatted = '';
    let indent = '';
    xml.split(/>\s*</).forEach((node, index) => {
      if (index > 0) {
        formatted += '\n';
      }
      if (node.match(/^\/\w/)) {
        indent = indent.substring(2);
      }
      formatted += indent + '<' + node + '>';
      if (node.match(/^<?\w[^>]*[^/]$/)) {
        indent += '  ';
      }
    });
    return formatted.substring(1, formatted.length - 1);
  } catch (error) {
    return "Error: Invalid XML format - " + error.message;
  }
}

export function MinifyXml(xml) {
  try {
    // Remove whitespace between tags
    return xml.replace(/>\s+</g, '><').trim();
  } catch (error) {
    return "Error: Invalid XML format - " + error.message;
  }
}

// XML to JSON conversion
export function XmlToJson(input) {
  try {
    // Simple XML to JSON converter
    function parseXml(xmlStr) {
      const result = {};
      
      // Remove XML declaration and root tags for simpler parsing
      let cleanXml = xmlStr.replace(/<\?xml[^>]*\?>/g, '').trim();
      
      // Simple regex-based parser for basic XML structures
      const tagRegex = /<([^>\s]+)[^>]*>([^<]*)<\/\1>/g;
      let match;
      
      while ((match = tagRegex.exec(cleanXml)) !== null) {
        const tagName = match[1];
        const tagValue = match[2].trim();
        
        if (result[tagName]) {
          if (!Array.isArray(result[tagName])) {
            result[tagName] = [result[tagName]];
          }
          result[tagName].push(tagValue);
        } else {
          result[tagName] = tagValue;
        }
      }
      
      return result;
    }
    
    const parsed = parseXml(input);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
