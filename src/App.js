import './App.css';
import { useState } from 'react';
import { JsonInput, JsonOutput, BtnMinifyJson, BtnBeautifyJson, BtnConvertJson } from './components/JsonComponents';
import { XmlInput, XmlOutput, BtnMinifyXml, BtnBeautifyXml, BtnConvertXml } from './components/XmlComponents';
import { CssInput, CssOutput, BtnMinifyCss, BtnBeautifyCss } from './components/CssComponents';
import GuidComponents from './components/GuidComponents';

function App() {
  const [activeTab, setActiveTab] = useState('json');

  const renderContent = () => {
    switch(activeTab) {
      case 'json':
        return (
          <div>
            <div className="Controls">
              <BtnMinifyJson />
              <div className="ribbon-separator"></div>
              <BtnBeautifyJson />
              <div className="ribbon-separator"></div>
              <BtnConvertJson />
            </div>
            <div className="IO">
              <JsonInput />
              <JsonOutput />
            </div>
          </div>
        );
      case 'xml':
        return (
          <div>
            <div className="Controls">
              <BtnMinifyXml />
              <div className="ribbon-separator"></div>
              <BtnBeautifyXml />
              <div className="ribbon-separator"></div>
              <BtnConvertXml />
            </div>
            <div className="IO">
              <XmlInput />
              <XmlOutput />
            </div>
          </div>
        );
      case 'css':
        return (
          <div>
            <div className="Controls">
              <BtnMinifyCss />
              <div className="ribbon-separator"></div>
              <BtnBeautifyCss />
            </div>
            <div className="IO">
              <CssInput />
              <CssOutput />
            </div>
          </div>
        );
      case 'guid':
        return <GuidComponents />;
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
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
        <button 
          className={`tab-button ${activeTab === 'guid' ? 'active' : ''}`}
          onClick={() => setActiveTab('guid')}
        >
          GUID
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
