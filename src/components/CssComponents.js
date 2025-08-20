import { BeautifyCss, MinifyCss } from '../utils/cssUtils';

// CSS Components
export function CssInput() {
  return (<textarea placeholder="Enter CSS here" className="code-input" />);
}

export function CssOutput() {
  return (<textarea className="code-output" tabIndex="-1" defaultValue="CSS output will be displayed here"></textarea>);
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
      Minify
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
      Beautify
    </button>
  );
}
