import React, { useState } from 'react';
import { copyToClipboard } from '../utils/clipboardUtils';

const GuidComponents = () => {
  const [generatedGuids, setGeneratedGuids] = useState([]);
  const [guidCount, setGuidCount] = useState(1);
  const [guidFormat, setGuidFormat] = useState('registry');

  // Generate a single GUID
  const generateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  };

  // Format GUID according to selected format
  const formatGuid = (guid, format) => {
    const cleanGuid = guid.replace(/-/g, '');
    
    switch (format) {
      case 'registry':
        return `{${guid.toUpperCase()}}`;
      case 'struct':
        return `static const GUID <<name>> = \n{ 0x${cleanGuid.substr(0, 8)}, 0x${cleanGuid.substr(8, 4)}, 0x${cleanGuid.substr(12, 4)}, { 0x${cleanGuid.substr(16, 2)}, 0x${cleanGuid.substr(18, 2)}, 0x${cleanGuid.substr(20, 2)}, 0x${cleanGuid.substr(22, 2)}, 0x${cleanGuid.substr(24, 2)}, 0x${cleanGuid.substr(26, 2)}, 0x${cleanGuid.substr(28, 2)}, 0x${cleanGuid.substr(30, 2)} } };`;
      case 'define':
        return `#define <<name>> "{${guid.toUpperCase()}}"`;
      case 'implement':
        return `IMPLEMENT_OLECREATE(<<class>>, <<external_name>>, \n0x${cleanGuid.substr(0, 8)}, 0x${cleanGuid.substr(8, 4)}, 0x${cleanGuid.substr(12, 4)}, 0x${cleanGuid.substr(16, 2)}, 0x${cleanGuid.substr(18, 2)}, 0x${cleanGuid.substr(20, 2)}, 0x${cleanGuid.substr(22, 2)}, 0x${cleanGuid.substr(24, 2)}, 0x${cleanGuid.substr(26, 2)}, 0x${cleanGuid.substr(28, 2)}, 0x${cleanGuid.substr(30, 2)});`;
      case 'digits':
        return cleanGuid.toUpperCase();
      case 'base64':
        // Convert hex to base64
        const hex = cleanGuid.replace(/-/g, '');
        const bytes = hex.match(/.{2}/g).map(byte => parseInt(byte, 16));
        return btoa(String.fromCharCode.apply(null, bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      default:
        return guid.toUpperCase();
    }
  };

  // Generate multiple GUIDs
  const handleGenerateGuids = () => {
    const newGuids = [];
    for (let i = 0; i < guidCount; i++) {
      const guid = generateGuid();
      const formatted = formatGuid(guid, guidFormat);
      newGuids.push({
        id: Date.now() + i,
        raw: guid,
        formatted: formatted
      });
    }
    setGeneratedGuids(newGuids);
  };

  // Copy single GUID
  const copyGuid = async (guid) => {
    try {
      await copyToClipboard(guid.formatted);
    } catch (error) {
      console.error('Failed to copy GUID:', error);
    }
  };

  // Copy all GUIDs
  const copyAllGuids = async () => {
    try {
      const allGuids = generatedGuids.map(g => g.formatted).join('\n');
      await copyToClipboard(allGuids);
    } catch (error) {
      console.error('Failed to copy GUIDs:', error);
    }
  };

  // Clear all GUIDs
  const clearGuids = () => {
    setGeneratedGuids([]);
  };

  return (
    <div className="guid-container">
      <div className="guid-controls">
        <div className="control-group">
          <label htmlFor="guidCount">Number of GUIDs:</label>
          <input
            id="guidCount"
            type="number"
            min="1"
            max="100"
            value={guidCount}
            onChange={(e) => setGuidCount(parseInt(e.target.value) || 1)}
            className="guid-count-input"
          />
        </div>

        <div className="control-group">
          <label htmlFor="guidFormat">GUID Format:</label>
          <select
            id="guidFormat"
            value={guidFormat}
            onChange={(e) => setGuidFormat(e.target.value)}
            className="guid-format-select"
          >
            <option value="registry">Registry Format</option>
            <option value="struct">C++ Struct</option>
            <option value="define">C++ #define</option>
            <option value="implement">IMPLEMENT_OLECREATE</option>
            <option value="digits">Digits Only</option>
            <option value="base64">Base64 String</option>
            <option value="standard">Standard</option>
          </select>
        </div>

        <div className="guid-buttons">
          <button onClick={handleGenerateGuids} className="generate-btn">
            <i className="icon-refresh"></i>
            Generate
          </button>
          {generatedGuids.length > 0 && (
            <>
              <button onClick={copyAllGuids} className="copy-btn">
                <i className="icon-copy"></i>
                Copy All
              </button>
              <button onClick={clearGuids} className="clear-btn">
                <i className="icon-trash"></i>
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {generatedGuids.length > 0 && (
        <div className="guid-output">
          <div className="output-header">
            <h3>Generated GUIDs ({generatedGuids.length})</h3>
          </div>
          <div className="guid-list">
            {generatedGuids.map((guid) => (
              <div key={guid.id} className="guid-item">
                <pre className="guid-text">{guid.formatted}</pre>
                <button
                  onClick={() => copyGuid(guid)}
                  className="copy-single-btn"
                  title="Copy GUID"
                >
                  <i className="icon-copy"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedGuids.length === 0 && (
        <div className="guid-placeholder">
          <div className="placeholder-content">
            <h3>Generate GUIDs</h3>
            <p>Select format and count, then click Generate to create GUIDs in Visual Studio style formats.</p>
            <div className="format-examples">
              <h4>Format Examples:</h4>
              <ul>
                <li><strong>Registry:</strong> {"{12345678-1234-5678-9ABC-DEF012345678}"}</li>
                <li><strong>C++ Struct:</strong> Static const GUID structure</li>
                <li><strong>Digits Only:</strong> 123456781234567890ABCDEF012345678</li>
                <li><strong>Base64:</strong> URL-safe base64 encoded</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidComponents;
