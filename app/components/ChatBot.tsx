"use client";

import { useState } from "react";

function Chatbot_window() {
  return (
    <div className="z-10">
      <div className="chatbot-window">
      <iframe
        src="http://localhost:8501?embed=true"
        width="500px"
        height="500px"></iframe>
    </div>
    </div>
    
  );
}

function Chatbot() {
  const [chatbotDisplay, setchatbotDisplay] = useState(false);

  const render_chatbot = () => {
    setchatbotDisplay(!chatbotDisplay);
  };

  return (
    <>
      <div className="chatbot-button">
        <button onClick={render_chatbot} className="bg-white"></button>
      </div>
      {chatbotDisplay && <Chatbot_window />}
    </>
  );
}

export default Chatbot;
