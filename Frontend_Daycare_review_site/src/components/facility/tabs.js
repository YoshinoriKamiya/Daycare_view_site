import React, { useState } from 'react';
import '../../scss/facility/tabs.scss';
const Tab = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`tab-button ${isActive ? 'active' : ''}`}
  >
    {label}
  </button>
);

const TabContent = ({ children }) => (
  <div className="tab-content">
    {children}
  </div>
);

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div>
      <div className="tabs">
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            onClick={() => setActiveTab(tab.label)}
            isActive={activeTab === tab.label}
          />
        ))}
      </div>
      {tabs.map((tab) => (
        activeTab === tab.label && (
          <TabContent key={tab.label}>
            {tab.content}
          </TabContent>
        )
      ))}
    </div>
  );
};

export default Tabs;
