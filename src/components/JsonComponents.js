import { BeautifyJson, MinifyJson, JsonToXml } from '../utils/jsonUtils';
import { copyToClipboard, getTextContent } from '../utils/clipboardUtils';
import { highlightJson, highlightXml } from '../utils/syntaxHighlighter';

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
          __html: '<span style="color: #999; font-style: italic;">JSON output will be displayed here</span>'
        }}
      ></div>
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
      Convert to XML
    </button>
  );
}
