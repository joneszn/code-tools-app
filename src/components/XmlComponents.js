import { BeautifyXml, MinifyXml, XmlToJson } from '../utils/xmlUtils';
import { copyToClipboard } from '../utils/clipboardUtils';

// XML Components
export function XmlInput() {
  const handleCopy = (e) => {
    const textarea = e.target.parentElement.querySelector('.code-input');
    copyToClipboard(textarea.value, e.target);
  };

  return (
    <div className="textarea-container">
      <textarea placeholder="Enter XML here" className="code-input" />
      <button className="copy-button" onClick={handleCopy} title="Copy input"></button>
    </div>
  );
}

export function XmlOutput() {
  const handleCopy = (e) => {
    const textarea = e.target.parentElement.querySelector('.code-output');
    copyToClipboard(textarea.value, e.target);
  };

  return (
    <div className="textarea-container">
      <textarea className="code-output" tabIndex="-1" defaultValue="XML output will be displayed here"></textarea>
      <button className="copy-button" onClick={handleCopy} title="Copy output"></button>
    </div>
  );
}

export function BtnMinifyXml() {
  return (
    <button className="btn-minify" onClick={() => {
      const input = document.querySelector('.code-input').value;
      const outputElement = document.querySelector('.code-output');
      if (input){
        const output = MinifyXml(input);
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

export function BtnBeautifyXml() {
  return (
    <button className="btn-beautify" onClick={() => {
      const input = document.querySelector('.code-input').value;
      const outputElement = document.querySelector('.code-output');
      if (input) {
        const output = BeautifyXml(input);
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

export function BtnConvertXml() {
  return (
    <button className="btn-convert" onClick={() => {
      const inputElement = document.querySelector('.code-input');
      const outputElement = document.querySelector('.code-output');
      const input = inputElement.value.trim();
      
      if (input) {
        const output = XmlToJson(input);
        outputElement.value = output;

        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
        } else {
          outputElement.classList.remove('error');
        }
      }
    }}>
      Convert to JSON
    </button>
  );
}
