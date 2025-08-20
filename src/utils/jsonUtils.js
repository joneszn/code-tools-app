// JSON utility functions for minifying and beautifying JSON

export function BeautifyJson(json) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (error) {
    return "Error: Invalid JSON format - " + error.message;
  }
}

export function MinifyJson(json) {
  try {
    return JSON.stringify(JSON.parse(json));
  } catch (error) {
    return "Error: Invalid JSON format - " + error.message;
  }
}

// JSON to XML conversion
export function JsonToXml(input) {
  try {
    const json = JSON.parse(input);
    
    function convertToXml(obj, parentKey = 'root') {
      let xml = '';
      
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const key = parentKey.endsWith('s') ? parentKey.slice(0, -1) : `${parentKey}_item`;
          xml += `<${key}>${convertToXml(item)}</${key}>`;
        });
      } else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          if (typeof value === 'object' && value !== null) {
            xml += `<${key}>${convertToXml(value)}</${key}>`;
          } else {
            xml += `<${key}>${String(value)}</${key}>`;
          }
        });
      } else {
        return String(obj);
      }
      
      return xml;
    }
    
    const xmlContent = convertToXml(json);
    return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${xmlContent}\n</root>`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
