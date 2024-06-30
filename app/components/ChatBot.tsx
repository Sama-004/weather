"use client";
import { useState } from "react";

function Chatbot_window() {
  return (
    <div className="chatbot-window">
      <iframe
        src="http://localhost:8501?embed=true"
        width="500px"
        height="500px"></iframe>
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
        <button onClick={render_chatbot}></button>
      </div>
      {chatbotDisplay && <Chatbot_window />}
    </>
  );
}

export default Chatbot;
