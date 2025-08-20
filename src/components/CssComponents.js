import { BeautifyCss, MinifyCss } from '../utils/cssUtils';
import { copyToClipboard, getTextContent } from '../utils/clipboardUtils';
import { highlightCss } from '../utils/syntaxHighlighter';

// CSS Components
export function CssInput() {
  const handleCopy = (e) => {
    const textarea = e.target.parentElement.querySelector('.code-input');
    copyToClipboard(textarea.value, e.target);
  };

  return (
    <div className="textarea-container">
      <textarea placeholder="Enter CSS here" className="code-input" />
      <button className="copy-button" onClick={handleCopy} title="Copy input"></button>
    </div>
  );
}

export function CssOutput() {
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
          __html: '<span style="color: #999; font-style: italic;">CSS output will be displayed here</span>'
        }}
      ></div>
      <button className="copy-button" onClick={handleCopy} title="Copy output"></button>
    </div>
  );
}

export function BtnMinifyCss() {
  return (
    <button className="btn-minify" onClick={() => {
      const input = document.querySelector('.code-input').value;
      const outputElement = document.querySelector('.code-output');
      if (input){
        const output = MinifyCss(input);
        
        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
          outputElement.classList.remove('highlighted');
          outputElement.innerHTML = output;
        } else {
          outputElement.classList.remove('error');
          outputElement.classList.add('highlighted');
          outputElement.innerHTML = highlightCss(output);
        }
      }
    }}>
      Compress
    </button>
  );
}

export function BtnBeautifyCss() {
  return (
    <button className="btn-beautify" onClick={() => {
      const input = document.querySelector('.code-input').value;
      const outputElement = document.querySelector('.code-output');
      if (input) {
        const output = BeautifyCss(input);

        // Add error class if output is an error message
        if (output.startsWith("Error:")) {
          outputElement.classList.add('error');
          outputElement.classList.remove('highlighted');
          outputElement.innerHTML = output;
        } else {
          outputElement.classList.remove('error');
          outputElement.classList.add('highlighted');
          outputElement.innerHTML = highlightCss(output);
        }
      }
    }}>
      Format
    </button>
  );
}
