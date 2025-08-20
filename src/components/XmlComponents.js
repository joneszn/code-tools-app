import { BeautifyXml, MinifyXml } from '../utils/xmlUtils';

// XML Components
export function XmlInput() {
  return (<textarea placeholder="Enter XML here" className="code-input" />);
}

export function XmlOutput() {
  return (<textarea className="code-output" tabIndex="-1" defaultValue="XML output will be displayed here"></textarea>);
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
      Minify
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
      Beautify
    </button>
  );
}
