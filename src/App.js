import './App.css';
import { useState } from 'react';
import { JsonInput, JsonOutput, BtnMinifyJson, BtnBeautifyJson } from './components/JsonComponents';
import { XmlInput, XmlOutput, BtnMinifyXml, BtnBeautifyXml } from './components/XmlComponents';
import { CssInput, CssOutput, BtnMinifyCss, BtnBeautifyCss } from './components/CssComponents';

function App() {
  const [activeTab, setActiveTab] = useState('json');

  const renderContent = () => {
    switch(activeTab) {
      case 'json':
        return (
          <div>
            <div className="IO">
              <JsonInput />
              <JsonOutput />
            </div>
            <div className="Controls">
              <BtnMinifyJson />
              <span> | </span>
              <BtnBeautifyJson />
            </div>
          </div>
        );
      case 'xml':
        return (
          <div>
            <div className="IO">
              <XmlInput />
              <XmlOutput />
            </div>
            <div className="Controls">
              <BtnMinifyXml />
              <span> | </span>
              <BtnBeautifyXml />
            </div>
          </div>
        );
      case 'css':
        return (
          <div>
            <div className="IO">
              <CssInput />
              <CssOutput />
            </div>
            <div className="Controls">
              <BtnMinifyCss />
              <span> | </span>
              <BtnBeautifyCss />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          JSON
        </button>
        <button 
          className={`tab-button ${activeTab === 'xml' ? 'active' : ''}`}
          onClick={() => setActiveTab('xml')}
        >
          XML
        </button>
        <button 
          className={`tab-button ${activeTab === 'css' ? 'active' : ''}`}
          onClick={() => setActiveTab('css')}
        >
          CSS
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
