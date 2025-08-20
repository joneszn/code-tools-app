# Code Tools App

A comprehensive web-based utility application for developers that provides essential code formatting, minification, and conversion tools. Built with React, this app offers a clean, intuitive interface for working with JSON, XML, CSS, and generating GUIDs.

## 🚀 Features

### JSON Tools
- **Minify/Compress**: Remove unnecessary whitespace and formatting from JSON
- **Beautify/Format**: Pretty-print JSON with proper indentation and structure
- **Convert to XML**: Transform JSON data into XML format
- **Syntax Highlighting**: Color-coded JSON display for better readability
- **Copy to Clipboard**: Easy copying of input and output content

### XML Tools
- **Minify/Compress**: Remove whitespace and formatting from XML documents
- **Beautify/Format**: Format XML with proper indentation and structure
- **Convert to JSON**: Transform XML data into JSON format
- **Syntax Highlighting**: Color-coded XML display with tag, attribute, and content highlighting
- **Copy to Clipboard**: Quick copying functionality

### CSS Tools
- **Minify/Compress**: Reduce CSS file size by removing unnecessary whitespace and comments
- **Beautify/Format**: Format CSS with proper indentation and structure
- **Syntax Highlighting**: Color-coded CSS display with selectors, properties, and values
- **Copy to Clipboard**: Easy content copying

### GUID Generator
- **Multiple Format Support**: Generate GUIDs in various formats:
  - Registry format: `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}`
  - Struct format: C-style struct definition
  - Define format: C preprocessor definition
  - Implement format: OLE implementation macro
  - Digits only: Plain hexadecimal string
  - Base64: Base64-encoded format
- **Bulk Generation**: Generate multiple GUIDs at once (1-100)
- **Copy Individual or All**: Copy single GUIDs or all generated GUIDs
- **Clear All**: Reset the generator

## 🖥️ Screenshots

### JSON Tools
![JSON Tools Interface showing minify, beautify, and convert functions with syntax highlighting]

*The JSON tab provides comprehensive JSON manipulation tools with real-time syntax highlighting*

### XML Tools
![XML Tools Interface showing XML formatting and conversion capabilities]

*XML processing with full syntax highlighting and conversion to JSON*

### CSS Tools
![CSS Tools Interface showing CSS minification and beautification]

*CSS formatting tools with syntax highlighting for selectors, properties, and values*

### GUID Generator
![GUID Generator showing multiple format options and bulk generation]

*Professional GUID generation with support for multiple formats and bulk operations*

## 🛠️ Technologies Used

- **React 19.1.1**: Modern React with hooks
- **Create React App 5.0.1**: Development tooling and build system
- **Custom CSS**: Responsive design with syntax highlighting
- **JavaScript ES6+**: Modern JavaScript features
- **Jest & React Testing Library**: Comprehensive testing suite

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joneszn/code-tools-app.git
cd code-tools-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── JsonComponents.js # JSON processing components
│   ├── XmlComponents.js  # XML processing components
│   ├── CssComponents.js  # CSS processing components
│   └── GuidComponents.js # GUID generation component
├── utils/               # Utility functions
│   ├── jsonUtils.js     # JSON processing utilities
│   ├── xmlUtils.js      # XML processing utilities
│   ├── cssUtils.js      # CSS processing utilities
│   ├── clipboardUtils.js # Clipboard operations
│   └── syntaxHighlighter.js # Syntax highlighting
├── App.js              # Main application component
├── App.css             # Application styles
└── index.js            # Application entry point
```

## 🧪 Available Scripts

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.\
Includes comprehensive tests for all utility functions.

### `npm run build`
Builds the app for production to the `build` folder.\
The build is minified and optimized for best performance.

### `npm run eject`
**Note: This is a one-way operation!**\
Ejects from Create React App for full configuration control.

## ✨ Key Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Instant formatting and conversion as you type
- **Error Handling**: Comprehensive error messages for invalid input
- **Syntax Highlighting**: Professional code highlighting for all supported formats
- **Copy Functionality**: One-click copying with visual feedback
- **Tab Navigation**: Clean tabbed interface for easy tool switching
- **Professional UI**: Modern, clean interface with intuitive controls

## 🔧 Development

The app is built with modern React patterns:
- Functional components with hooks
- Modular component structure
- Utility-first approach
- Comprehensive error handling
- Responsive CSS design
- Jest testing suite

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

Jon Jones - [@joneszn](https://github.com/joneszn)

Project Link: [https://github.com/joneszn/code-tools-app](https://github.com/joneszn/code-tools-app)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
