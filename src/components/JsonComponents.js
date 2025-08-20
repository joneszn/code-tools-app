import { BeautifyJson, MinifyJson, JsonToXml } from '../utils/jsonUtils';
import { copyToClipboard } from '../utils/clipboardUtils';

// JSON Components
export function JsonInput() {
  const handleCopy = (e) => {
    const textarea = e.target.parentElement.querySelector('.code-input');
    copyToClipboard(textarea.value, e.target);
  };

  return (
    <div className="textarea-container">
      <textarea placeholder="Enter JSON here" className="code-input" />
      <button className="copy-button" onClick={handleCopy} title="Copy input"></button>
    </div>
  );
}

export function JsonOutput() {
  const handleCopy = (e) => {
    const textarea = e.target.parentElement.querySelector('.code-output');
    copyToClipboard(textarea.value, e.target);
  };

  return (
    <div className="textarea-container">
      <textarea className="code-output" tabIndex="-1" defaultValue="JSON output will be displayed here"></textarea>
      <button className="copy-button" onClick={handleCopy} title="Copy output"></button>
    </div>
  );
}

export function BtnMinifyJson() {
  return (
    <button className="btn-minify" onClick={() => {
      const input = document.querySelector('.code-input').value;
      const outputElement = document.querySelector('.code-output');
      if (input){
        const output = MinifyJson(input);
        outputElement.value = output;
        
        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
        } else {
          outputElement.classList.remove('error');
        }
      }
    }}>
      Compress
    </button>
  );
}

export function BtnBeautifyJson() {
  return (
    <button className="btn-beautify" onClick={() => {
      const input = document.querySelector('.code-input').value;
      const outputElement = document.querySelector('.code-output');
      if (input) {
        const output = BeautifyJson(input);
        outputElement.value = output;

        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
        } else {
          outputElement.classList.remove('error');
        }
      }
    }}>
      Format
    </button>
  );
}

export function BtnConvertJson() {
  return (
    <button className="btn-convert" onClick={() => {
      const inputElement = document.querySelector('.code-input');
      const outputElement = document.querySelector('.code-output');
      const input = inputElement.value.trim();
      
      if (input) {
        const output = JsonToXml(input);
        outputElement.value = output;

        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
        } else {
          outputElement.classList.remove('error');
        }
      }
    }}>
      Convert to XML
    </button>
  );
}
