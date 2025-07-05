import React, { useState } from "react";

const Chatbot = ({ farmerId, weatherData, forecast, crop }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "👩‍🌾 Hi! I'm your Assam Agri Assistant. Ask me anything about your weather or farming situation!" }
  ]);
  const [loading, setLoading] = useState(false);

  // Function to format AI responses with proper spacing and bold headings
  const formatResponse = (text) => {
    if (!text) return text;
    
    // Split the text into sections
    const sections = text.split(/(?=Summary:|Actionable Advice:|General Tips for Assam Farmers:|Disaster Recovery:)/);
    
    return sections.map((section, index) => {
      if (section.trim() === '') return null;
      
      // Check if this section has a heading
      const headingMatch = section.match(/^(Summary|Actionable Advice|General Tips for Assam Farmers|Disaster Recovery):/);
      
      if (headingMatch) {
        const heading = headingMatch[0];
        const content = section.replace(heading, '').trim();
        
        return (
          <div key={index} className="mb-4">
            <h4 className="font-bold text-green-800 text-lg mb-2">{heading}</h4>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </div>
        );
      } else {
        // Regular content without heading
        return (
          <div key={index} className="text-gray-700 leading-relaxed whitespace-pre-line mb-2">
            {section.trim()}
          </div>
        );
      }
    }).filter(Boolean);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((msgs) => [...msgs, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmerId,
          weatherData,
          forecast,
          userMessage: userMsg,
          crop
        })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: data.reply || "Sorry, I couldn't get a response." }
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Error contacting AI service." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-green-700 transition-all duration-200"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chatbot"
      >
        <span className="text-2xl">💬</span>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-96 max-w-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-fade-in">
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-green-500 to-green-700 text-white rounded-t-2xl">
            <div className="flex items-center gap-2 font-bold text-lg">
              <span className="text-2xl">👩‍🌾</span> Assam Agri Chatbot
            </div>
            <button onClick={() => setOpen(false)} className="ml-2 text-white text-xl font-bold hover:text-gray-200">✕</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: 350 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-[80%] text-base shadow-sm transition-all duration-200 ${
                    msg.from === "user"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-900 border border-green-200"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  {msg.from === "bot" ? formatResponse(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-sm">Thinking...</div>
            )}
          </div>
          <div className="p-3 border-t flex gap-2 bg-white rounded-b-2xl">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-100"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              disabled={loading}
            />
            <button
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-800 text-base font-semibold shadow-md transition-all duration-200"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease; }
      `}</style>
    </div>
  );
};

export default Chatbot;