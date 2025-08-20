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
      if (node.match(/^<?\w[^>]*[^\/]$/)) {
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
