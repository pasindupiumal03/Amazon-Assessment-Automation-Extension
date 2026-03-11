import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function Popup() {
  const [status, setStatus] = useState("");

  const handleStart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "startAssessment" }, (response) => {
        if (chrome.runtime.lastError) {
          setStatus("Error: Content script not loaded. Reload the page and try again.");
          return;
        }
        if (response && response.success) {
          setStatus("Success: Found and clicked 'Begin Assessment'!");
        } else {
          setStatus("Failed: Could not find the 'Begin Assessment' button on this page.");
        }
      });
    });
  };

  return (
    <div className="w-full min-h-[400px] min-w-[320px] bg-[#0f1115] text-white flex flex-col items-center justify-center p-6 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] bg-blue-600 rounded-full opacity-20 blur-[80px]"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] bg-purple-600 rounded-full opacity-20 blur-[80px]"></div>

      <div className="z-10 flex flex-col items-center w-full">
        <h1 className="text-2xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500 drop-shadow-sm text-center">
          Amazon Assessment<br/>Automation
        </h1>
        
        <p className="text-gray-400 text-sm mb-8 text-center leading-relaxed">
          Navigate to the Amazon hiring assessment page and click start to begin automatically.
        </p>

        <button 
          onClick={handleStart}
          className="relative group px-8 py-3.5 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] active:scale-95 focus:outline-none w-full"
        >
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
            </svg>
            START ASSESSMENT
          </span>
        </button>

        {status && (
          <div className={`mt-6 w-full p-4 rounded-xl text-sm font-medium text-center border backdrop-blur-sm transition-all animate-fade-in ${
            status.includes('Error') || status.includes('Failed') 
            ? 'bg-red-500/10 text-red-400 border-red-500/30' 
            : 'bg-green-500/10 text-green-400 border-green-500/30'
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("react-target"));
root.render(<Popup />);