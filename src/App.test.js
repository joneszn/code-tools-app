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
  const outputTextarea = screen.getByDisplayValue(/json output will be displayed here/i);
  const compressButton = screen.getByText(/compress/i);
  const formatButton = screen.getByText(/format/i);
  expect(inputTextarea).toBeInTheDocument();
  expect(outputTextarea).toBeInTheDocument();
  expect(compressButton).toBeInTheDocument();
  expect(formatButton).toBeInTheDocument();
});

test('switches to XML tab', () => {
  render(<App />);
  const xmlTab = screen.getByText('XML');
  fireEvent.click(xmlTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter xml here/i);
  const outputTextarea = screen.getByDisplayValue(/xml output will be displayed here/i);
  expect(inputTextarea).toBeInTheDocument();
  expect(outputTextarea).toBeInTheDocument();
});

test('switches to CSS tab', () => {
  render(<App />);
  const cssTab = screen.getByText('CSS');
  fireEvent.click(cssTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter css here/i);
  const outputTextarea = screen.getByDisplayValue(/css output will be displayed here/i);
  expect(inputTextarea).toBeInTheDocument();
  expect(outputTextarea).toBeInTheDocument();
});

test('minifies valid JSON correctly', () => {
  render(<App />);
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const outputTextarea = screen.getByDisplayValue(/json output will be displayed here/i);
  const compressButton = screen.getByText(/compress/i);

  // Input valid JSON with spaces and formatting
  const validJSON = `{
    "name": "John",
    "age": 30,
    "city": "New York"
  }`;
  
  fireEvent.change(inputTextarea, { target: { value: validJSON } });
  fireEvent.click(compressButton);
  
  const expectedMinified = '{"name":"John","age":30,"city":"New York"}';
  expect(outputTextarea.value).toBe(expectedMinified);
  expect(outputTextarea).not.toHaveClass('error');
});

test('beautifies valid JSON correctly', () => {
  render(<App />);
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const outputTextarea = screen.getByDisplayValue(/json output will be displayed here/i);
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
  expect(outputTextarea.value).toBe(expectedBeautified);
  expect(outputTextarea).not.toHaveClass('error');
});

test('handles invalid JSON with error message for minify', () => {
  render(<App />);
  const inputTextarea = screen.getByPlaceholderText(/enter json here/i);
  const outputTextarea = screen.getByDisplayValue(/json output will be displayed here/i);
  const compressButton = screen.getByText(/compress/i);

  const invalidJSON = '{"name": "John", "age": 30,}'; // trailing comma
  
  fireEvent.change(inputTextarea, { target: { value: invalidJSON } });
  fireEvent.click(compressButton);
  
  expect(outputTextarea.value).toMatch(/^Error: Invalid JSON format/);
  expect(outputTextarea).toHaveClass('error');
});

test('XML minify removes whitespace', () => {
  render(<App />);
  const xmlTab = screen.getByText('XML');
  fireEvent.click(xmlTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter xml here/i);
  const outputTextarea = screen.getByDisplayValue(/xml output will be displayed here/i);
  const compressButton = screen.getByText(/compress/i);

  const xmlWithSpaces = '<root>\n  <item>value</item>\n</root>';
  
  fireEvent.change(inputTextarea, { target: { value: xmlWithSpaces } });
  fireEvent.click(compressButton);
  
  expect(outputTextarea.value).toBe('<root><item>value</item></root>');
});

test('CSS minify removes unnecessary whitespace', () => {
  render(<App />);
  const cssTab = screen.getByText('CSS');
  fireEvent.click(cssTab);
  
  const inputTextarea = screen.getByPlaceholderText(/enter css here/i);
  const outputTextarea = screen.getByDisplayValue(/css output will be displayed here/i);
  const compressButton = screen.getByText(/compress/i);

  const cssWithSpaces = `.class {
    color: red;
    margin: 10px;
  }`;
  
  fireEvent.change(inputTextarea, { target: { value: cssWithSpaces } });
  fireEvent.click(compressButton);
  
  expect(outputTextarea.value).toBe('.class{color:red;margin:10px}');
});
