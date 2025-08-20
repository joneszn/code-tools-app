import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders tab navigation', () => {
  render(<App />);
  const jsonTab = screen.getByText('JSON');
  const xmlTab = screen.getByText('XML');
  const cssTab = screen.getByText('CSS');
  expect(jsonTab).toBeInTheDocument();
  expect(xmlTab).toBeInTheDocument();
  expect(cssTab).toBeInTheDocument();
});

test('renders JSON components by default', () => {
  render(<App />);
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const outputDiv = screen.getByText(/json output will be displayed here/i);
  const compressButton = screen.getByText(/compress/i);
  const formatButton = screen.getByText(/format/i);
  expect(inputTextarea).toBeInTheDocument();
  expect(outputDiv).toBeInTheDocument();
  expect(compressButton).toBeInTheDocument();
  expect(formatButton).toBeInTheDocument();
});

test('switches to XML tab', () => {
  render(<App />);
  const xmlTab = screen.getByText('XML');
  fireEvent.click(xmlTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter xml here/i);
  const outputDiv = screen.getByText(/xml output will be displayed here/i);
  expect(inputTextarea).toBeInTheDocument();
  expect(outputDiv).toBeInTheDocument();
});

test('switches to CSS tab', () => {
  render(<App />);
  const cssTab = screen.getByText('CSS');
  fireEvent.click(cssTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter css here/i);
  const outputDiv = screen.getByText(/css output will be displayed here/i);
  expect(inputTextarea).toBeInTheDocument();
  expect(outputDiv).toBeInTheDocument();
});

test('minifies valid JSON correctly', async () => {
  const { container } = render(<App />);
  
  // Make sure we're on the JSON tab
  const jsonTab = screen.getByText('JSON');
  fireEvent.click(jsonTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const compressButton = screen.getByText(/compress/i);

  const beautifiedJSON = `{
    "name": "John",
    "age": 30,
    "city": "New York"
  }`;
  
  fireEvent.change(inputTextarea, { target: { value: beautifiedJSON } });
  
  // Clear any previous output and wait a moment
  const outputDiv = container.querySelector('.code-output');
  outputDiv.innerHTML = '';
  
  fireEvent.click(compressButton);
  
  // Wait for processing to complete
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const outputText = outputDiv.textContent || outputDiv.innerText;
  
  // The output should be the minified JSON
  expect(outputText.trim()).toBe('{"name":"John","age":30,"city":"New York"}');
  expect(outputDiv).not.toHaveClass('error');
  expect(outputDiv).toHaveClass('highlighted');
});

test('beautifies valid JSON correctly', () => {
  render(<App />);
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const formatButton = screen.getByText(/format/i);

  // Input minified JSON
  const minifiedJSON = '{"name":"John","age":30,"city":"New York"}';
  
  fireEvent.change(inputTextarea, { target: { value: minifiedJSON } });
  fireEvent.click(formatButton);
  
  const expectedBeautified = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
  
  const outputDiv = document.querySelector('.code-output');
  expect(outputDiv.textContent.trim()).toBe(expectedBeautified);
  expect(outputDiv).not.toHaveClass('error');
});

test('handles invalid JSON with error message for minify', () => {
  render(<App />);
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const compressButton = screen.getByText(/compress/i);

  const invalidJSON = '{"name": "John", "age": 30,}'; // trailing comma
  
  fireEvent.change(inputTextarea, { target: { value: invalidJSON } });
  fireEvent.click(compressButton);
  
  const outputDiv = document.querySelector('.code-output');
  expect(outputDiv.textContent).toMatch(/^Error: Invalid JSON format/);
  expect(outputDiv).toHaveClass('error');
});

test('XML minify removes whitespace', () => {
  render(<App />);
  const xmlTab = screen.getByText('XML');
  fireEvent.click(xmlTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter xml here/i);
  const compressButton = screen.getByText(/compress/i);

  const xmlWithSpaces = '<root>\n  <item>value</item>\n</root>';
  
  fireEvent.change(inputTextarea, { target: { value: xmlWithSpaces } });
  fireEvent.click(compressButton);
  
  const outputDiv = document.querySelector('.code-output');
  expect(outputDiv.textContent.trim()).toBe('<root><item>value</item></root>');
});

test('CSS minify removes unnecessary whitespace', () => {
  render(<App />);
  const cssTab = screen.getByText('CSS');
  fireEvent.click(cssTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter css here/i);
  const compressButton = screen.getByText(/compress/i);

  const cssWithSpaces = `.class {
    color: red;
    margin: 10px;
  }`;
  
  fireEvent.change(inputTextarea, { target: { value: cssWithSpaces } });
  fireEvent.click(compressButton);
  
  const outputDiv = document.querySelector('.code-output');
  // Check if the content contains the expected minified CSS, allowing for syntax highlighting
  expect(outputDiv.textContent).toMatch(/\.class\{color:red;margin:10px\}/);
});

test('converts JSON to XML correctly', async () => {
  const { container } = render(<App />);
  
  // Make sure we're on the JSON tab
  const jsonTab = screen.getByText('JSON');
  fireEvent.click(jsonTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const convertButton = screen.getByText(/convert to xml/i);

  const testJson = '{"name": "John", "age": 30}';
  
  fireEvent.change(inputTextarea, { target: { value: testJson } });
  
  // Clear any previous output
  const outputDiv = container.querySelector('.code-output');
  outputDiv.innerHTML = '';
  
  fireEvent.click(convertButton);
  
  // Wait for processing to complete
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const outputText = outputDiv.textContent || outputDiv.innerText;
  
  // The output should contain XML elements
  expect(outputText).toMatch(/<name>John<\/name>/);
  expect(outputText).toMatch(/<age>30<\/age>/);
  expect(outputText).toMatch(/<?xml version="1.0"/);
  expect(outputDiv).not.toHaveClass('error');
  expect(outputDiv).toHaveClass('highlighted');
});

test('converts XML to JSON correctly', async () => {
  const { container } = render(<App />);
  
  // Switch to XML tab
  const xmlTab = screen.getByText('XML');
  fireEvent.click(xmlTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter xml here/i);
  const convertButton = screen.getByText(/convert to json/i);

  const testXml = '<root><name>John</name><age>30</age></root>';
  
  fireEvent.change(inputTextarea, { target: { value: testXml } });
  
  // Clear any previous output
  const outputDiv = container.querySelector('.code-output');
  outputDiv.innerHTML = '';
  
  fireEvent.click(convertButton);
  
  // Wait for processing to complete
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const outputText = outputDiv.textContent || outputDiv.innerText;
  
  // The output should contain JSON elements
  expect(outputText).toMatch(/"name":\s*"John"/);
  expect(outputText).toMatch(/"age":\s*"30"/);
  expect(outputText).toMatch(/\{[\s\S]*\}/); // Should contain JSON object structure
  expect(outputDiv).not.toHaveClass('error');
  expect(outputDiv).toHaveClass('highlighted');
});
