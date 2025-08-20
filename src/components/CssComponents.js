import { BeautifyCss, MinifyCss } from '../utils/cssUtils';
import { copyToClipboard } from '../utils/clipboardUtils';

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
    const textarea = e.target.parentElement.querySelector('.code-output');
    copyToClipboard(textarea.value, e.target);
  };

  return (
    <div className="textarea-container">
      <textarea className="code-output" tabIndex="-1" defaultValue="CSS output will be displayed here"></textarea>
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

export function BtnBeautifyCss() {
  return (
    <button className="btn-beautify" onClick={() => {
      const input = document.querySelector('.code-input').value;
      const outputElement = document.querySelector('.code-output');
      if (input) {
        const output = BeautifyCss(input);
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
