import { BeautifyJson, MinifyJson } from '../utils/jsonUtils';

// JSON Components
export function JsonInput() {
  return (<textarea placeholder="Enter JSON here" className="code-input" />);
}

export function JsonOutput() {
  return (<textarea className="code-output" tabIndex="-1" defaultValue="JSON output will be displayed here"></textarea>);
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
      Minify
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
      Beautify
    </button>
  );
}
