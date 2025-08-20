import { BeautifyXml, MinifyXml, XmlToJson } from '../utils/xmlUtils';
import { copyToClipboard, getTextContent } from '../utils/clipboardUtils';
import { highlightXml, highlightJson } from '../utils/syntaxHighlighter';

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
    const outputDiv = e.target.parentElement.querySelector('.code-output');
    const text = getTextContent(outputDiv);
    copyToClipboard(text, e.target);
  };

  return (
    <div className="textarea-container">
      <div 
        className="code-output" 
        tabIndex="-1"
        dangerouslySetInnerHTML={{
          __html: '<span style="color: #999; font-style: italic;">XML output will be displayed here</span>'
        }}
      ></div>
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
        
        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
          outputElement.classList.remove('highlighted');
          outputElement.innerHTML = output;
        } else {
          outputElement.classList.remove('error');
          outputElement.classList.add('highlighted');
          outputElement.innerHTML = highlightXml(output);
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

        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
          outputElement.classList.remove('highlighted');
          outputElement.innerHTML = output;
        } else {
          outputElement.classList.remove('error');
          outputElement.classList.add('highlighted');
          outputElement.innerHTML = highlightXml(output);
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

        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
          outputElement.classList.remove('highlighted');
          outputElement.innerHTML = output;
        } else {
          outputElement.classList.remove('error');
          outputElement.classList.add('highlighted');
          outputElement.innerHTML = highlightJson(output);
        }
      }
    }}>
      Convert to JSON
    </button>
  );
}
