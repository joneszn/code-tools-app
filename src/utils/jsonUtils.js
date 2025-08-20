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
